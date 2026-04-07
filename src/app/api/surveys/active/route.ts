import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

// Public: returns the active homepage survey (if any) for the CTA
export async function GET() {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from("surveys")
    .select("id, title, slug, description")
    .eq("is_active", true)
    .eq("show_on_homepage", true)
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ survey: data ?? null });
}
