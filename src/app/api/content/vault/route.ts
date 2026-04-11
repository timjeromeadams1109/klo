import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// GET /api/content/vault — public endpoint returning published vault items
// Uses anon client; RLS policy allows SELECT where visibility='published'
export async function GET() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("vault_content")
    .select("*")
    .eq("visibility", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/content/vault]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map DB rows to the VaultItem shape expected by the UI
  const items = (data ?? []).map((row) => {
    const meta = (row.metadata ?? {}) as Record<string, unknown>;
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category,
      level: (meta.level as string) ?? "Beginner",
      type: row.content_type,
      isPremium: row.tier_required !== "free",
      thumbnailGradient: (meta.thumbnail_gradient as string) ?? "from-blue-600 to-indigo-900",
      description: row.excerpt ?? row.body ?? "",
      duration: (meta.duration as string) ?? "",
      publishedAt: row.published_at ?? row.created_at,
      author: row.author_name ?? "Keith L. Odom",
      conferenceName: (meta.conference_name as string) ?? undefined,
      conferenceLocation: (meta.conference_location as string) ?? undefined,
      files: (meta.files as unknown[]) ?? [],
    };
  });

  return NextResponse.json({ data: items });
}
