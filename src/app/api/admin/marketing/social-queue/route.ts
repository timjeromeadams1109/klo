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

export async function GET(req: NextRequest) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const eventId = searchParams.get("event_id");

  const supabase = getServiceSupabase();
  let query = supabase
    .from("marketing_social_queue")
    .select("*")
    .order("scheduled_for", { ascending: true });

  if (status) {
    query = query.eq("status", status);
  }
  if (eventId) {
    query = query.eq("event_id", eventId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const session = await verifyAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { event_id, platform, content, hashtags, scheduled_for, auto_generate } = body;

  const supabase = getServiceSupabase();

  // --- Auto-generate drafts from poll results ---
  if (auto_generate) {
    if (!event_id) {
      return NextResponse.json(
        { error: "event_id is required for auto-generation" },
        { status: 400 }
      );
    }

    // Fetch the event
    const { data: event, error: eventError } = await supabase
      .from("event_presentations")
      .select("id, title, conference_name")
      .eq("id", event_id)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 400 }
      );
    }

    // Fetch polls for this event
    const { data: polls, error: pollsError } = await supabase
      .from("conference_polls")
      .select("*")
      .eq("event_id", event_id)
      .order("created_at", { ascending: false });

    if (pollsError) {
      return NextResponse.json({ error: pollsError.message }, { status: 500 });
    }

    if (!polls || polls.length === 0) {
      return NextResponse.json(
        { error: "No polls found for this event" },
        { status: 400 }
      );
    }

    // Use the first poll with results
    const poll = polls[0];
    const question = poll.question || "a key question";
    const options = (poll.options ?? []) as { text: string; votes: number }[];

    // Find top answer
    let topAnswer = "the leading choice";
    let topPercent = 0;
    const totalVotes = options.reduce(
      (sum: number, o: { votes: number }) => sum + (o.votes || 0),
      0
    );
    if (totalVotes > 0) {
      const sorted = [...options].sort((a, b) => (b.votes || 0) - (a.votes || 0));
      topAnswer = sorted[0]?.text || topAnswer;
      topPercent = Math.round(((sorted[0]?.votes || 0) / totalVotes) * 100);
    }

    const conferenceName = event.conference_name || "our recent event";
    const topic = event.title || "leadership";

    // Generate template-based drafts for each platform
    const drafts = [
      {
        platform: "linkedin" as const,
        content: `At ${conferenceName}, we asked "${question}." ${topPercent}% said "${topAnswer}." Here's what that means for ${topic} \u2014 the conversation is shifting, and leaders need to pay attention.\n\n#Leadership #AI #ChurchTech #Innovation`,
        hashtags: ["Leadership", "AI", "ChurchTech", "Innovation"],
      },
      {
        platform: "instagram" as const,
        content: `Poll results are in! \u201C${topAnswer}\u201D wins with ${topPercent}% at ${conferenceName}. Download the app to join the conversation and see all the insights. Link in bio.\n\n#PollResults #${conferenceName.replace(/\s+/g, "")} #Leadership #AI`,
        hashtags: [
          "PollResults",
          conferenceName.replace(/\s+/g, ""),
          "Leadership",
          "AI",
        ],
      },
      {
        platform: "twitter" as const,
        content:
          `${topPercent}% of ${conferenceName} attendees chose "${topAnswer}" when asked: ${question} What would you pick? #AI #Leadership`.slice(
            0,
            280
          ),
        hashtags: ["AI", "Leadership"],
      },
    ];

    const inserts = drafts.map((d) => ({
      event_id,
      platform: d.platform,
      content: d.content,
      hashtags: d.hashtags,
      status: "draft",
      scheduled_for: scheduled_for || null,
      created_by: session.user?.email || null,
    }));

    const { data: inserted, error: insertError } = await supabase
      .from("marketing_social_queue")
      .insert(inserts)
      .select();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(inserted, { status: 201 });
  }

  // --- Manual single-item creation ---
  if (!event_id || !platform || !content) {
    return NextResponse.json(
      { error: "Missing required fields: event_id, platform, content" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("marketing_social_queue")
    .insert({
      event_id,
      platform,
      content,
      hashtags: hashtags || [],
      status: "draft",
      scheduled_for: scheduled_for || null,
      created_by: session.user?.email || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
