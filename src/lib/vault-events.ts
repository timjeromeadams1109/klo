import type { VaultItem, VaultCategory, EventFile } from "./vault-data";

interface EventFileRow {
  id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  file_size: string | null;
}

interface EventRow {
  id: string;
  title: string;
  slug: string;
  conference_name: string;
  conference_location: string;
  event_category: string;
  description: string | null;
  event_date: string;
  event_files: EventFileRow[];
}

const eventGradients = [
  "from-indigo-600 to-blue-900",
  "from-teal-600 to-emerald-900",
  "from-violet-600 to-purple-900",
  "from-sky-600 to-cyan-900",
];

export async function fetchEventItems(): Promise<VaultItem[]> {
  const res = await fetch("/api/events");
  if (!res.ok) return [];

  const events: EventRow[] = await res.json();

  return events.map((event, i): VaultItem => {
    const files: EventFile[] = (event.event_files ?? []).map((f) => ({
      id: f.id,
      name: f.file_name,
      type: f.file_type as EventFile["type"],
      url: f.file_url,
      size: f.file_size ?? "",
    }));

    return {
      id: `event-${event.id}`,
      title: event.title,
      slug: event.slug,
      category: event.event_category as VaultCategory,
      level: "Executive",
      type: "event",
      isPremium: false,
      thumbnailGradient: eventGradients[i % eventGradients.length],
      description: event.description ?? `${event.conference_name} — ${event.conference_location}`,
      duration: `${files.length} file${files.length !== 1 ? "s" : ""}`,
      publishedAt: event.event_date,
      author: "Keith L. Odom",
      conferenceName: event.conference_name,
      conferenceLocation: event.conference_location,
      files,
    };
  });
}
