import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { verifyCreativeStudioAdmin } from "@/lib/creative-studio-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await verifyCreativeStudioAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();

  // Get subscriptions joined with profile names
  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("id, user_id, platform, user_agent, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get user names + emails for each unique user_id
  const userIds = [...new Set((subs || []).map((s) => s.user_id))];
  let profileMap: Record<string, { full_name: string | null; email: string | null }> = {};

  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);

    if (profiles) {
      profileMap = Object.fromEntries(
        profiles.map((p) => [p.id, { full_name: p.full_name, email: p.email ?? null }])
      );
    }
  }

  const subscribers = (subs || []).map((s) => ({
    ...s,
    user_name: profileMap[s.user_id]?.full_name || null,
    user_email: profileMap[s.user_id]?.email || null,
  }));

  // Unique users list for the admin dropdown (dedup by user_id)
  const uniqueUsersMap = new Map<
    string,
    { id: string; name: string | null; email: string | null; platforms: string[] }
  >();
  for (const s of subscribers) {
    const existing = uniqueUsersMap.get(s.user_id);
    if (existing) {
      if (!existing.platforms.includes(s.platform)) existing.platforms.push(s.platform);
    } else {
      uniqueUsersMap.set(s.user_id, {
        id: s.user_id,
        name: s.user_name,
        email: s.user_email,
        platforms: [s.platform],
      });
    }
  }
  const users = Array.from(uniqueUsersMap.values()).sort((a, b) =>
    (a.name ?? a.email ?? a.id).localeCompare(b.name ?? b.email ?? b.id),
  );

  // Stats
  const stats = {
    total: subscribers.length,
    web: subscribers.filter((s) => s.platform === "web").length,
    ios: subscribers.filter((s) => s.platform === "ios").length,
    android: subscribers.filter((s) => s.platform === "android").length,
  };

  return NextResponse.json({ subscribers, users, stats });
}
