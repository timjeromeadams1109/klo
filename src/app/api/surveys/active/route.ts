import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

// Public: returns the active survey
// ?nav=1 → only checks is_active (for nav link)
// default → checks is_active AND show_on_homepage (for homepage CTA)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const navOnly = searchParams.get("nav") === "1";

  const supabase = getServiceSupabase();
  let query = supabase
    .from("surveys")
    .select("id, title, slug, description")
    .eq("is_active", true);

  if (!navOnly) {
    query = query.eq("show_on_homepage", true);
  }

  const { data } = await query.limit(1).maybeSingle();

  return NextResponse.json({ survey: data ?? null });
}
