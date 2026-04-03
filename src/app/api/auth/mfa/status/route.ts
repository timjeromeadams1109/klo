/**
 * GET /api/auth/mfa/status
 *
 * Returns whether MFA is currently enabled for the authenticated user.
 * Used by the settings page to show the correct MFA toggle state.
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "No user ID in session" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("mfa_enabled")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("[GET /api/auth/mfa/status]", error);
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }

  return NextResponse.json({ mfaEnabled: profile?.mfa_enabled ?? false });
}
