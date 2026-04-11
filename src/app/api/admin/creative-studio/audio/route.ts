import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { verifyCreativeStudioAdmin } from "@/lib/creative-studio-auth";
import { audioAssetCreateSchema } from "@/lib/validation";

export async function GET() {
  const session = await verifyCreativeStudioAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("audio_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/admin/creative-studio/audio]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const session = await verifyCreativeStudioAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = audioAssetCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const email = session.user?.email ?? "unknown";

  const { data, error } = await supabase
    .from("audio_assets")
    .insert({ ...parsed.data, uploaded_by: email })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/admin/creative-studio/audio]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("admin_activity_log").insert({
    admin_user_id: (session.user as { id?: string }).id ?? null,
    admin_email: email,
    action: "CREATE",
    entity_type: "audio_asset",
    entity_id: data.id,
    details: `Uploaded audio: ${data.name}`,
  });

  return NextResponse.json({ data }, { status: 201 });
}
