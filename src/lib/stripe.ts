import Stripe from "stripe";

/* ------------------------------------------------------------------ */
/*  Stripe client                                                      */
/* ------------------------------------------------------------------ */

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, {
    apiVersion: "2026-02-25.clover",
    typescript: true,
  });
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    })
  : (null as unknown as Stripe);

export { getStripeClient };

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CheckoutSessionParams {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CustomerPortalParams {
  customerId: string;
  returnUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Helper functions (to be fully implemented in Phase 4)              */
/* ------------------------------------------------------------------ */

/**
 * Create a Stripe Checkout session for a subscription purchase.
 */
export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    customer: params.customerId,
    mode: "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
  return session;
}

/**
 * Create a Stripe Customer Portal session for managing subscriptions.
 */
export async function createCustomerPortalSession(
  params: CustomerPortalParams
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  });
  return session;
}

/**
 * Retrieve a subscription by its Stripe subscription ID.
 */
export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}
