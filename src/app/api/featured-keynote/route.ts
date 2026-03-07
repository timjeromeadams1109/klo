import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getServiceSupabase();

  // Use Central Time (America/Chicago) since events are in that timezone
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const today = `${central.getFullYear()}-${String(central.getMonth() + 1).padStart(2, "0")}-${String(central.getDate()).padStart(2, "0")}`;
  const nowMinutes = central.getHours() * 60 + central.getMinutes();

  // Fetch all upcoming published events (today and future)
  const { data: events, error } = await supabase
    .from("event_presentations")
    .select("id, title, conference_name, conference_location, event_date, event_time, description, slug")
    .eq("is_published", true)
    .or(`event_date.gte.${today},event_date.eq.SAVE THE DATE`)
    .order("event_date", { ascending: true })
    .order("event_time", { ascending: true, nullsFirst: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!events || events.length === 0) {
    return NextResponse.json(null);
  }

  // Get today's events that have times set, sorted by time ascending
  const todayEvents = events.filter(
    (e) => e.event_date === today && e.event_time
  );

  if (todayEvents.length > 0) {
    const parseTime = (t: string): number => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + (m || 0);
    };

    // Rotation logic:
    // - Start with the earliest event as featured
    // - 60 minutes after an event starts, the NEXT event takes over
    // - This means event N is featured from its start time until (start + 60min),
    //   then event N+1 takes over
    for (let i = todayEvents.length - 1; i >= 0; i--) {
      const eventStart = parseTime(todayEvents[i].event_time!);
      if (i === 0) {
        // First event: featured until 60 min after it starts (then #2 takes over)
        // But if we haven't reached its start time yet, still show it (it's next up)
        return NextResponse.json(todayEvents[0]);
      }
      // For event i (not the first): it takes over 60 min after event i-1 started
      const prevStart = parseTime(todayEvents[i - 1].event_time!);
      if (nowMinutes >= prevStart + 60) {
        return NextResponse.json(todayEvents[i]);
      }
    }

    // Fallback: show earliest
    return NextResponse.json(todayEvents[0]);
  }

  // No timed events today — return the nearest upcoming event (skip SAVE THE DATE)
  const upcoming = events.find((e) => e.event_date !== "SAVE THE DATE");
  return NextResponse.json(upcoming ?? events[0]);
}
