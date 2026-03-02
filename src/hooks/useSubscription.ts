"use client";

import { useState, useEffect, useCallback } from "react";

export type SubscriptionTier = "free" | "pro" | "executive";

interface SubscriptionState {
  tier: SubscriptionTier;
  isActive: boolean;
  features: string[];
  canAccess: (requiredTier: SubscriptionTier) => boolean;
  upgradeTo: (newTier: SubscriptionTier) => void;
  downgradeToFree: () => void;
}

const STORAGE_KEY = "klo-subscription-tier";

const tierFeatures: Record<SubscriptionTier, string[]> = {
  free: [
    "Basic assessments",
    "Limited AI Advisor queries (5/month)",
    "Public vault access",
    "Executive feed (free posts only)",
  ],
  pro: [
    "All assessments with detailed reports",
    "Unlimited AI Advisor queries",
    "Full vault access",
    "Executive feed (all posts)",
    "Priority support",
    "Export assessment reports",
  ],
  executive: [
    "Everything in Pro",
    "1-on-1 advisory sessions",
    "Custom assessment frameworks",
    "Organization-wide dashboards",
    "Executive briefing documents",
    "Early access to new features",
    "White-glove onboarding",
  ],
};

const tierHierarchy: Record<SubscriptionTier, number> = {
  free: 0,
  pro: 1,
  executive: 2,
};

export function useSubscription(): SubscriptionState {
  const [tier, setTier] = useState<SubscriptionTier>("free");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === "free" || stored === "pro" || stored === "executive")) {
        setTier(stored as SubscriptionTier);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const canAccess = useCallback(
    (requiredTier: SubscriptionTier) => {
      return tierHierarchy[tier] >= tierHierarchy[requiredTier];
    },
    [tier]
  );

  const upgradeTo = useCallback((newTier: SubscriptionTier) => {
    setTier(newTier);
    try {
      localStorage.setItem(STORAGE_KEY, newTier);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const downgradeToFree = useCallback(() => {
    setTier("free");
    try {
      localStorage.setItem(STORAGE_KEY, "free");
    } catch {
      // localStorage unavailable
    }
  }, []);

  return {
    tier,
    isActive: true,
    features: tierFeatures[tier],
    canAccess,
    upgradeTo,
    downgradeToFree,
  };
}
