import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// GET /api/content/feed — public endpoint returning published feed posts
export async function GET() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("feed_posts")
    .select("*")
    .eq("visibility", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/content/feed]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map DB rows to the FeedPost shape expected by the UI
  const items = (data ?? []).map((row) => {
    const meta = (row.metadata ?? {}) as Record<string, unknown>;
    return {
      id: row.id,
      title: row.title,
      category: (meta.category as string) ?? (row.tags?.[0] ?? "Insight"),
      content: row.body,
      publishedAt: row.published_at ?? row.created_at,
      readTime: (meta.read_time as string) ?? "5 min read",
      isPremium: (meta.is_premium as boolean) ?? false,
    };
  });

  return NextResponse.json({ data: items });
}
