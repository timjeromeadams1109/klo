import { NextRequest, NextResponse } from "next/server";
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

export async function GET(request: NextRequest) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const type = searchParams.get("type") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const offset = (page - 1) * limit;

  const supabase = getServiceSupabase();

  let query = supabase
    .from("assessment_results")
    .select(
      "id, user_id, assessment_type, score, created_at, profiles!inner(full_name, email)",
      { count: "exact" }
    );

  if (type && type !== "all") {
    query = query.eq("assessment_type", type);
  }

  if (search) {
    query = query.ilike("profiles.full_name", `%${search}%`);
  }

  query = query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = (data ?? []).map((row: Record<string, unknown>) => {
    const profile = row.profiles as { full_name: string | null; email: string | null } | null;
    return {
      id: row.id,
      user_id: row.user_id,
      user_name: profile?.full_name ?? null,
      user_email: profile?.email ?? null,
      assessment_type: row.assessment_type,
      score: row.score,
      created_at: row.created_at,
    };
  });

  return NextResponse.json({
    results,
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}

export async function DELETE(request: NextRequest) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const ids = Array.isArray(body.ids) ? body.ids : null;

  const supabase = getServiceSupabase();

  let query = supabase.from("assessment_results").delete();

  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  } else {
    // Delete all — Supabase requires a filter, use gte on created_at to match everything
    query = query.gte("created_at", "1970-01-01");
  }

  const { data, error } = await query.select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: data?.length ?? 0 });
}
