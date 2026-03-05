import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

function getFingerprint(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  return createHash("sha256").update(`${ip}:${ua}`).digest("hex");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = getServiceSupabase();

  // Check if the user is authenticated — if so, use authenticated likes
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (userId) {
    // Authenticated like via RPC (atomic insert + increment)
    const { data, error } = await supabase.rpc("like_conference_question", {
      p_question_id: id,
      p_user_id: userId,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = data as { ok: boolean; reason?: string };
    if (!result.ok) {
      return NextResponse.json({ error: result.reason }, { status: 409 });
    }

    return NextResponse.json({ success: true, type: "like" }, { status: 201 });
  }

  // Anonymous fingerprint upvote (V1 behavior preserved)
  const fingerprint = getFingerprint(request);

  const { error: upvoteError } = await supabase
    .from("conference_question_upvotes")
    .insert({ question_id: id, voter_fingerprint: fingerprint });

  if (upvoteError) {
    if (upvoteError.code === "23505") {
      return NextResponse.json({ error: "Already upvoted" }, { status: 409 });
    }
    return NextResponse.json({ error: upvoteError.message }, { status: 500 });
  }

  // Atomic increment via RPC
  await supabase.rpc("increment_question_upvotes", { question_id: id });

  return NextResponse.json({ success: true, type: "upvote" }, { status: 201 });
}
