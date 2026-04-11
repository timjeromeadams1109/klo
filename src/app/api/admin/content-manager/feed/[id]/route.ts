import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { verifyCreativeStudioAdmin } from "@/lib/creative-studio-auth";
import { feedPostUpdateSchema } from "@/lib/validation";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyCreativeStudioAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const parsed = feedPostUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("feed_posts")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[PATCH /api/admin/content-manager/feed/[id]]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const email = session.user?.email ?? "unknown";
  await supabase.from("admin_activity_log").insert({
    admin_user_id: (session.user as { id?: string }).id ?? null,
    admin_email: email,
    action: "UPDATE",
    entity_type: "feed_post",
    entity_id: id,
    details: `Updated feed post: ${data.title ?? id}`,
    metadata: { fields: Object.keys(parsed.data) },
  });

  return NextResponse.json({ data });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyCreativeStudioAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = getServiceSupabase();

  const { data: existing } = await supabase
    .from("feed_posts")
    .select("title")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("feed_posts").delete().eq("id", id);
  if (error) {
    console.error("[DELETE /api/admin/content-manager/feed/[id]]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const email = session.user?.email ?? "unknown";
  await supabase.from("admin_activity_log").insert({
    admin_user_id: (session.user as { id?: string }).id ?? null,
    admin_email: email,
    action: "DELETE",
    entity_type: "feed_post",
    entity_id: id,
    details: `Deleted feed post: ${existing?.title ?? id}`,
  });

  return NextResponse.json({ success: true });
}
