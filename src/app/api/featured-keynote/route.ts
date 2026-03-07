import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getServiceSupabase();

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

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

  // Get today's events that have times set
  const todayEvents = events.filter(
    (e) => e.event_date === today && e.event_time
  );

  if (todayEvents.length > 0) {
    // Parse current time in minutes since midnight
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    // Parse event time (HH:MM 24h format) to minutes
    const parseTime = (t: string): number => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + (m || 0);
    };

    // Find the current or most recent event:
    // An event "takes over" as featured 60 minutes after the previous one started
    // So we pick the latest event whose start time is <= now
    // If no event has started yet, pick the earliest one (next up)
    const started = todayEvents.filter(
      (e) => parseTime(e.event_time!) <= nowMinutes
    );

    if (started.length > 0) {
      // Return the most recently started event
      return NextResponse.json(started[started.length - 1]);
    }

    // No event started yet today — show the first upcoming one
    return NextResponse.json(todayEvents[0]);
  }

  // No timed events today — return the nearest upcoming event (skip SAVE THE DATE)
  const upcoming = events.find((e) => e.event_date !== "SAVE THE DATE");
  return NextResponse.json(upcoming ?? events[0]);
}
