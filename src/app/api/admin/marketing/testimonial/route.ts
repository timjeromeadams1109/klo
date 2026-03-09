import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

/**
 * PUBLIC endpoint — no auth required.
 * Clicked from email links to collect testimonial ratings.
 * Returns a styled HTML thank-you page.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const event_id = searchParams.get("event_id");
  const rating = searchParams.get("rating");
  const email = searchParams.get("email");

  // Validate required params
  if (!event_id || !rating || !email) {
    return new NextResponse(renderHTML("Missing Information", "We couldn't process your feedback. Please use the link from your email."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const numericRating = parseInt(rating, 10);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return new NextResponse(renderHTML("Invalid Rating", "Please use a rating between 1 and 5."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabase = getServiceSupabase();

  // Upsert — if this email+event combo exists, update the rating
  const { error } = await supabase
    .from("marketing_testimonials")
    .upsert(
      {
        event_id,
        email,
        rating: numericRating,
        created_at: new Date().toISOString(),
      },
      { onConflict: "event_id,email" }
    );

  if (error) {
    return new NextResponse(renderHTML("Something Went Wrong", "We couldn't save your feedback right now. Please try again later."), {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const starLabel = numericRating === 1 ? "star" : "stars";

  return new NextResponse(
    renderHTML(
      "Thank You!",
      `We received your ${numericRating}-${starLabel} rating. Your feedback helps us improve the Keith L. Odom App experience.`
    ),
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

function renderHTML(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Keith L. Odom</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0D1117;
      color: #E6EDF3;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: linear-gradient(145deg, #161B22, #1C2333);
      border: 1px solid rgba(212, 168, 83, 0.2);
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
    }
    .logo-text {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #D4A853;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 16px;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #8B949E;
      margin-bottom: 32px;
    }
    .divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, #D4A853, #2764FF);
      margin: 0 auto 24px;
      border-radius: 1px;
    }
    .app-badge {
      display: inline-block;
      font-size: 13px;
      color: #2764FF;
      background: rgba(39, 100, 255, 0.1);
      border: 1px solid rgba(39, 100, 255, 0.2);
      border-radius: 20px;
      padding: 8px 20px;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-text">Keith L. Odom</div>
    <h1>${title}</h1>
    <p class="message">${message}</p>
    <div class="divider"></div>
    <span class="app-badge">Available on App Store &amp; Google Play</span>
  </div>
</body>
</html>`;
}
