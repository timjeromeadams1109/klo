import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { z } from "zod";

const respondSchema = z.object({
  fingerprint: z.string().min(8).max(128),
  answers: z.array(
    z.object({
      question_id: z.string().uuid(),
      answer_value: z.string().optional(),
      answer_values: z.array(z.string()).optional(),
    })
  ),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getServiceSupabase();

  // Validate body
  const body = await request.json().catch(() => null);
  const parsed = respondSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Look up survey
  const { data: survey } = await supabase
    .from("surveys")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!survey) {
    return NextResponse.json({ error: "Survey not found or closed" }, { status: 404 });
  }

  const { fingerprint, answers } = parsed.data;

  // Check for duplicate submission
  const { data: existing } = await supabase
    .from("survey_respondents")
    .select("id")
    .eq("survey_id", survey.id)
    .eq("fingerprint", fingerprint)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "You have already completed this survey" },
      { status: 409 }
    );
  }

  // Create respondent
  const { data: respondent, error: respErr } = await supabase
    .from("survey_respondents")
    .insert({
      survey_id: survey.id,
      fingerprint,
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (respErr || !respondent) {
    return NextResponse.json(
      { error: "Failed to record response" },
      { status: 500 }
    );
  }

  // Insert all answers
  const rows = answers.map((a) => ({
    survey_id: survey.id,
    respondent_id: respondent.id,
    question_id: a.question_id,
    answer_value: a.answer_value ?? null,
    answer_values: a.answer_values ?? [],
  }));

  const { error: ansErr } = await supabase.from("survey_answers").insert(rows);

  if (ansErr) {
    console.error("[POST /api/surveys/respond]", ansErr);
    return NextResponse.json(
      { error: "Failed to save answers" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
