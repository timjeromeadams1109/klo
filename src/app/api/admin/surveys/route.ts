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

// List all surveys with response counts
export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  const { data: surveys, error } = await supabase
    .from("surveys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get response counts per survey
  const counts: Record<string, number> = {};
  if (surveys && surveys.length > 0) {
    const { data: respondents } = await supabase
      .from("survey_respondents")
      .select("survey_id")
      .not("completed_at", "is", null);

    for (const r of respondents ?? []) {
      counts[r.survey_id] = (counts[r.survey_id] || 0) + 1;
    }
  }

  const enriched = (surveys ?? []).map((s) => ({
    ...s,
    response_count: counts[s.id] || 0,
  }));

  return NextResponse.json(enriched);
}

// Create a new survey
export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.slug) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 }
    );
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("surveys")
    .insert({
      title: body.title,
      slug: body.slug,
      description: body.description ?? null,
      intro_text: body.intro_text ?? null,
      is_active: body.is_active ?? false,
      show_on_homepage: body.show_on_homepage ?? false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
