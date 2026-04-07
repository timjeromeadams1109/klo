import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

// Public: get full survey by slug (questions + sections)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getServiceSupabase();

  const { data: survey, error } = await supabase
    .from("surveys")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !survey) {
    return NextResponse.json({ error: "Survey not found" }, { status: 404 });
  }

  const [sectionsRes, questionsRes] = await Promise.all([
    supabase
      .from("survey_sections")
      .select("*")
      .eq("survey_id", survey.id)
      .order("sort_order"),
    supabase
      .from("survey_questions")
      .select("*")
      .eq("survey_id", survey.id)
      .order("sort_order"),
  ]);

  return NextResponse.json({
    survey,
    sections: sectionsRes.data ?? [],
    questions: questionsRes.data ?? [],
  });
}
