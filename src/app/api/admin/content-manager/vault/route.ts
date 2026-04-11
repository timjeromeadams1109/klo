import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { verifyCreativeStudioAdmin } from "@/lib/creative-studio-auth";
import { vaultContentUpsertSchema, contentListQuerySchema } from "@/lib/validation";

// GET /api/admin/content-manager/vault — list vault items (admin sees all)
export async function GET(req: NextRequest) {
  const session = await verifyCreativeStudioAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const parsed = contentListQuerySchema.safeParse({
    visibility: url.searchParams.get("visibility") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
    offset: url.searchParams.get("offset") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query", details: parsed.error.flatten() }, { status: 400 });
  }

  const { visibility, search, limit = 100, offset = 0 } = parsed.data;
  const supabase = getServiceSupabase();

  let query = supabase
    .from("vault_content")
    .select("*", { count: "exact" })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (visibility) query = query.eq("visibility", visibility);
  if (search) query = query.or(`title.ilike.%${search}%,category.ilike.%${search}%,excerpt.ilike.%${search}%`);

  const { data, error, count } = await query;

  if (error) {
    console.error("[GET /api/admin/content-manager/vault]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}

// POST /api/admin/content-manager/vault — create new vault item
export async function POST(req: NextRequest) {
  const session = await verifyCreativeStudioAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = vaultContentUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("vault_content")
    .insert({ ...parsed.data, published: true })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/admin/content-manager/vault]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const email = session.user?.email ?? "unknown";
  await supabase.from("admin_activity_log").insert({
    admin_user_id: (session.user as { id?: string }).id ?? null,
    admin_email: email,
    action: "CREATE",
    entity_type: "vault_content",
    entity_id: data.id,
    details: `Created vault item: ${data.title}`,
  });

  return NextResponse.json({ data }, { status: 201 });
}
