"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import Button from "@/components/shared/Button";
import type { SubscriptionTierSlug } from "@/types";

interface UpgradeBannerProps {
  currentTier: SubscriptionTierSlug;
  requiredTier: SubscriptionTierSlug;
  feature: string;
  variant?: "compact" | "full";
  className?: string;
}

const tierLabels: Record<SubscriptionTierSlug, string> = {
  free: "Explorer",
  pro: "Pro",
  executive: "Executive",
};

const bannerVariants = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export default function UpgradeBanner({
  currentTier,
  requiredTier,
  feature,
  variant = "full",
  className = "",
}: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const requiredLabel = tierLabels[requiredTier];

  if (variant === "compact") {
    return (
      <AnimatePresence>
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`flex items-center justify-between gap-3 rounded-lg border border-klo-gold/30 bg-klo-gold/5 px-4 py-3 ${className}`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="h-4 w-4 text-klo-gold shrink-0" />
            <p className="text-sm text-klo-text truncate">
              Upgrade to{" "}
              <span className="font-semibold text-klo-gold">
                {requiredLabel}
              </span>{" "}
              to unlock {feature}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="primary" size="sm" href="/pricing">
              Upgrade
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-klo-muted hover:text-klo-text transition-colors rounded"
              aria-label="Dismiss upgrade banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`relative overflow-hidden rounded-xl border border-klo-gold/30 bg-gradient-to-r from-klo-gold/10 via-klo-dark to-klo-gold/5 p-6 lg:p-8 ${className}`}
      >
        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 p-1.5 text-klo-muted hover:text-klo-text transition-colors rounded-lg hover:bg-white/5"
          aria-label="Dismiss upgrade banner"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-klo-gold/15 shrink-0">
            <Sparkles className="h-6 w-6 text-klo-gold" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-klo-text mb-1">
              Unlock {feature}
            </h3>
            <p className="text-sm text-klo-muted">
              Your current{" "}
              <span className="text-klo-text font-medium">
                {tierLabels[currentTier]}
              </span>{" "}
              plan does not include this feature. Upgrade to{" "}
              <span className="text-klo-gold font-semibold">
                {requiredLabel}
              </span>{" "}
              to get full access.
            </p>
          </div>

          {/* CTA */}
          <Button variant="primary" size="md" href="/pricing" className="shrink-0">
            View Plans
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
