import { NextRequest, NextResponse } from "next/server";
import { AI_ADVISOR_SYSTEM_PROMPT } from "@/lib/constants";

// ------------------------------------------------------------
// In-memory rate limiter (per-IP, resets on deploy/restart)
// ------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

// ------------------------------------------------------------
// POST /api/ai-advisor
// ------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI Advisor is not configured. Missing API key." },
        { status: 503 }
      );
    }

    // Rate limiting based on IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const messages: { role: string; content: string }[] = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    // Call Anthropic Messages API with streaming
    const anthropicResponse = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: AI_ADVISOR_SYSTEM_PROMPT,
          stream: true,
          messages: messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      }
    );

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error("Anthropic API error:", anthropicResponse.status, errorText);
      return NextResponse.json(
        { error: "AI service is temporarily unavailable." },
        { status: 502 }
      );
    }

    // Stream SSE back to client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = anthropicResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            // Keep the last potentially incomplete line in the buffer
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const event = JSON.parse(data);

                  if (
                    event.type === "content_block_delta" &&
                    event.delta?.type === "text_delta"
                  ) {
                    const text = event.delta.text;
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                    );
                  }

                  if (event.type === "message_stop") {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  }
                } catch {
                  // Skip non-JSON lines (event type lines, etc.)
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream reading error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (err) {
    console.error("AI Advisor route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
