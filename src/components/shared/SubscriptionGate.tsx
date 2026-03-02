"use client";

import { type ReactNode } from "react";
import { useSubscription, type SubscriptionTier } from "@/hooks/useSubscription";
import UpgradePrompt from "./UpgradePrompt";

interface SubscriptionGateProps {
  requiredTier: SubscriptionTier;
  children: ReactNode;
  fallback?: ReactNode;
  /** Description of the gated feature shown in the upgrade prompt */
  feature?: string;
}

/**
 * Conditionally renders children based on the user's subscription tier.
 *
 * If the user has the required tier (or higher), children are rendered.
 * Otherwise, shows an UpgradePrompt (inline variant) or a custom fallback.
 *
 * Usage:
 * ```tsx
 * <SubscriptionGate requiredTier="pro" feature="Detailed assessment reports">
 *   <AssessmentReport />
 * </SubscriptionGate>
 * ```
 */
export default function SubscriptionGate({
  requiredTier,
  children,
  fallback,
  feature,
}: SubscriptionGateProps) {
  const { tier, canAccess } = useSubscription();

  if (canAccess(requiredTier)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <UpgradePrompt
      feature={feature ?? `This content requires a ${requiredTier} subscription`}
      requiredTier={requiredTier}
      currentTier={tier}
      variant="inline"
    />
  );
}
