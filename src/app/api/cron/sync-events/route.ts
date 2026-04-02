import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

const SOURCES = [
  { url: "https://keithlodom.io", name: "keithlodom.io" },
  { url: "https://churchandtechnology.com", name: "churchandtechnology.com" },
  { url: "https://experiasummit.io", name: "experiasummit.io" },
];

// Simple date pattern: matches "Month Day, Year" or "YYYY-MM-DD"
const DATE_PATTERNS = [
  /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b)/gi,
  /(\b\d{4}-\d{2}-\d{2}\b)/g,
];

interface ParsedEvent {
  title: string;
  conference_name: string;
  conference_location: string;
  event_date: string;
  description: string | null;
}

function parseDate(dateStr: string): string | null {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

function extractEvents(html: string, sourceName: string): ParsedEvent[] {
  const events: ParsedEvent[] = [];

  // Look for structured event-like content
  // Match patterns like headings near dates and locations
  const eventBlockPattern =
    /<(?:div|section|article)[^>]*class[^>]*(?:event|conference|keynote|speaking)[^>]*>([\s\S]*?)<\/(?:div|section|article)>/gi;

  let match;
  while ((match = eventBlockPattern.exec(html)) !== null) {
    const block = match[1];
    const textContent = block.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    // Try to find a date in this block
    let eventDate: string | null = null;
    for (const pattern of DATE_PATTERNS) {
      pattern.lastIndex = 0;
      const dateMatch = pattern.exec(textContent);
      if (dateMatch) {
        eventDate = parseDate(dateMatch[1]);
        if (eventDate) break;
      }
    }

    if (!eventDate) continue;

    // Extract title from heading tags within the block
    const headingMatch = /<h[1-4][^>]*>(.*?)<\/h[1-4]>/i.exec(block);
    const title = headingMatch
      ? headingMatch[1].replace(/<[^>]+>/g, "").trim()
      : textContent.slice(0, 100);

    if (!title) continue;

    events.push({
      title,
      conference_name: title,
      conference_location: "TBD",
      event_date: eventDate,
      description: `Auto-synced from ${sourceName}`,
    });
  }

  return events;
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "KLO-EventSync/1.0",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel injects CRON_SECRET automatically)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  const results: { source: string; found: number; inserted: number }[] = [];

  for (const source of SOURCES) {
    const html = await fetchPage(source.url);
    if (!html) {
      results.push({ source: source.name, found: 0, inserted: 0 });
      continue;
    }

    const events = extractEvents(html, source.name);
    let inserted = 0;

    for (const event of events) {
      // Check if event already exists (match by title + date)
      const { data: existing } = await supabase
        .from("event_presentations")
        .select("id")
        .eq("title", event.title)
        .eq("event_date", event.event_date)
        .maybeSingle();

      if (existing) continue;

      const { error } = await supabase.from("event_presentations").insert({
        ...event,
        is_published: false, // Auto-synced events start unpublished for review
        is_featured: false,
        source: "auto-sync",
      });

      if (!error) inserted++;
    }

    results.push({ source: source.name, found: events.length, inserted });
  }

  return NextResponse.json({
    success: true,
    synced_at: new Date().toISOString(),
    results,
  });
}
