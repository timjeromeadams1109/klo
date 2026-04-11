import { NextRequest, NextResponse } from "next/server";
import { broadcastPush, sendPushToUser, sendPushToUsers } from "@/lib/push-server";
import { pushSendSchema } from "@/lib/validation";
import { verifyCreativeStudioAdmin } from "@/lib/creative-studio-auth";

export async function POST(request: NextRequest) {
  const session = await verifyCreativeStudioAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const parsed = pushSendSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, body, url, tag, userId, userIds } = parsed.data;
  const payload = { title, body, url, tag };

  try {
    let result;
    if (userId) {
      result = await sendPushToUser(userId, payload);
    } else if (userIds && Array.isArray(userIds) && userIds.length > 0) {
      result = await sendPushToUsers(userIds, payload);
    } else {
      result = await broadcastPush(payload);
    }
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[POST /api/push/send]", err);
    return NextResponse.json(
      {
        error: "Push delivery failed",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
