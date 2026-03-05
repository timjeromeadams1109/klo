import { NextResponse } from "next/server";
import { verifyConferenceRole } from "@/lib/conference-auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "seminar_mode")
    .single();

  if (error) {
    return NextResponse.json({ active: false });
  }

  // Also fetch active session settings if one exists
  const { data: activeSession } = await supabase
    .from("conference_sessions")
    .select("id, title, qa_enabled, release_mode")
    .eq("is_active", true)
    .maybeSingle();

  return NextResponse.json({
    ...data.value,
    activeSession: activeSession || null,
  });
}

export async function PUT(request: Request) {
  const auth = await verifyConferenceRole(["admin", "moderator"]);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = getServiceSupabase();

  // Update seminar mode
  if (typeof body.active === "boolean") {
    const { error } = await supabase
      .from("app_settings")
      .update({ value: { active: body.active }, updated_at: new Date().toISOString() })
      .eq("key", "seminar_mode");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // Update active session settings (qa_enabled, release_mode)
  if (body.session_id) {
    const sessionUpdates: Record<string, unknown> = {};
    if (typeof body.qa_enabled === "boolean") sessionUpdates.qa_enabled = body.qa_enabled;
    if (typeof body.release_mode === "string") sessionUpdates.release_mode = body.release_mode;

    if (Object.keys(sessionUpdates).length > 0) {
      const { error } = await supabase
        .from("conference_sessions")
        .update(sessionUpdates)
        .eq("id", body.session_id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true });
}
