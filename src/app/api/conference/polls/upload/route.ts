import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const role = (session.user as { role?: string }).role;
  if (!["owner", "admin"].includes(role ?? "")) return null;
  return session;
}

function parseTextToQuestions(text: string): { question: string; options: string[] }[] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return lines
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
      if (parts.length < 3) return null; // need question + at least 2 options
      return { question: parts[0], options: parts.slice(1) };
    })
    .filter(Boolean) as { question: string; options: string[] }[];
}

export async function POST(request: Request) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const name = file.name.toLowerCase();
  let questions: { question: string; options: string[] }[] = [];

  try {
    if (name.endsWith(".txt")) {
      const text = await file.text();
      questions = parseTextToQuestions(text);
    } else if (name.endsWith(".pdf")) {
      const { PDFParse } = await import("pdf-parse");
      const buffer = Buffer.from(await file.arrayBuffer());
      const parser = new PDFParse({ data: new Uint8Array(buffer) });
      const result = await parser.getText();
      await parser.destroy();
      questions = parseTextToQuestions(result.text);
    } else if (name.endsWith(".doc") || name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await mammoth.extractRawText({ buffer });
      questions = parseTextToQuestions(result.value);
    } else if (name.endsWith(".xls") || name.endsWith(".xlsx")) {
      const XLSX = await import("xlsx");
      const buffer = Buffer.from(await file.arrayBuffer());
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
      questions = rows
        .filter((row) => row.length >= 3 && row[0])
        .map((row) => ({
          question: String(row[0]).trim(),
          options: row.slice(1).map((c) => String(c).trim()).filter(Boolean),
        }));
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use .txt, .pdf, .doc, .docx, .xls, or .xlsx" },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to parse file: ${err instanceof Error ? err.message : "Unknown error"}` },
      { status: 400 }
    );
  }

  if (questions.length === 0) {
    return NextResponse.json(
      { error: "No valid questions found in file. Format: Question | Option1 | Option2 | ..." },
      { status: 400 }
    );
  }

  if (questions.length > 20) {
    questions = questions.slice(0, 20);
  }

  const supabase = getServiceSupabase();
  const rows = questions.map((q) => ({
    question: q.question,
    options: q.options,
    is_active: false,
    is_deployed: false,
  }));

  const { data, error } = await supabase
    .from("conference_polls")
    .insert(rows)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
