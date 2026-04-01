import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";
import { changelogCreateSchema, changelogDeleteSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const role = (session.user as { role?: string }).role;
  if (!["owner", "admin"].includes(role ?? "")) return null;
  return session;
}

// GET /api/admin/changelog — list all changelog entries
export async function GET() {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  const { data: entries, error } = await supabase
    .from("changelog")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries: entries ?? [] });
}

// POST /api/admin/changelog — add a new entry
export async function POST(request: Request) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = changelogCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Version and title required" }, { status: 400 });
  }
  const { version, title, description, type } = parsed.data;

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("changelog")
    .insert({ version, title, description: description || null, type: type || "feature" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/admin/changelog — delete an entry
export async function DELETE(request: Request) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = changelogDeleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Entry ID required" }, { status: 400 });
  }
  const { id } = parsed.data;

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("changelog").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
