import { NextResponse } from "next/server";
import { verifyConferenceRole } from "@/lib/conference-auth";
import { getServiceSupabase } from "@/lib/supabase";
import { questionUpdateSchema } from "@/lib/validation";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyConferenceRole(["admin", "moderator"]);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = questionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const validatedBody = parsed.data;
  const supabase = getServiceSupabase();

  const updates: Record<string, unknown> = {};
  if (typeof validatedBody.is_answered === "boolean") updates.is_answered = validatedBody.is_answered;
  if (typeof validatedBody.is_hidden === "boolean") updates.is_hidden = validatedBody.is_hidden;
  if (typeof validatedBody.released === "boolean") updates.released = validatedBody.released;

  // Soft-delete (archive)
  if (validatedBody.archive === true) {
    updates.archived_at = new Date().toISOString();
    updates.archived_by = auth.userId;
  }

  // Restore from archive
  if (validatedBody.archive === false) {
    updates.archived_at = null;
    updates.archived_by = null;
  }

  const { data, error } = await supabase
    .from("conference_questions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Hard delete is admin-only (moderators can only archive via PUT)
  const auth = await verifyConferenceRole(["admin"]);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized — admin only" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from("conference_questions")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
