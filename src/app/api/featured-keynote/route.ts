import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getServiceSupabase();

  const { data, error } = await supabase
    .from("event_presentations")
    .select("id, title, conference_name, conference_location, event_date, description")
    .eq("is_featured", true)
    .eq("is_published", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
