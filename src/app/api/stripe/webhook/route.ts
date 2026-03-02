import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

/* ------------------------------------------------------------------ */
/*  POST /api/stripe/webhook                                           */
/*  Handles incoming Stripe webhook events.                            */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("[Stripe Webhook] Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Verify webhook signature                                         */
  /* ---------------------------------------------------------------- */
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Handle events                                                    */
  /* ---------------------------------------------------------------- */
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const tier = session.metadata?.tier ?? "pro";
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        console.log(
          `[Stripe Webhook] checkout.session.completed — ` +
            `customer=${customerId}, subscription=${subscriptionId}, tier=${tier}`
        );

        // TODO: Update user record in Supabase
        // await supabase.from('profiles').update({
        //   subscription_tier: tier,
        //   stripe_customer_id: customerId,
        //   stripe_subscription_id: subscriptionId,
        // }).eq('stripe_customer_id', customerId);

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const tier = subscription.metadata?.tier ?? "pro";
        const customerId = subscription.customer as string;
        const status = subscription.status;

        console.log(
          `[Stripe Webhook] customer.subscription.updated — ` +
            `customer=${customerId}, status=${status}, tier=${tier}`
        );

        // TODO: Update subscription status in Supabase
        // await supabase.from('profiles').update({
        //   subscription_tier: status === 'active' ? tier : 'free',
        //   subscription_status: status,
        // }).eq('stripe_customer_id', customerId);

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        console.log(
          `[Stripe Webhook] customer.subscription.deleted — ` +
            `customer=${customerId}, downgrading to free tier`
        );

        // TODO: Downgrade user in Supabase
        // await supabase.from('profiles').update({
        //   subscription_tier: 'free',
        //   stripe_subscription_id: null,
        //   subscription_status: 'canceled',
        // }).eq('stripe_customer_id', customerId);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        const attemptCount = invoice.attempt_count;

        console.log(
          `[Stripe Webhook] invoice.payment_failed — ` +
            `customer=${customerId}, attempt=${attemptCount}`
        );

        // TODO: Flag the account and/or notify the user
        // await supabase.from('profiles').update({
        //   payment_failed: true,
        //   payment_failed_at: new Date().toISOString(),
        // }).eq('stripe_customer_id', customerId);

        break;
      }

      default: {
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
