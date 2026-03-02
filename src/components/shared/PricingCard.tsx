"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import type { SubscriptionTier } from "@/types";

interface PricingCardProps {
  tier: SubscriptionTier;
  highlighted?: boolean;
  onSelect: (tier: SubscriptionTier) => void;
  loading?: boolean;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.06,
      duration: 0.35,
      ease: "easeOut" as const,
    },
  }),
};

export default function PricingCard({
  tier,
  highlighted = false,
  onSelect,
  loading = false,
  index = 0,
}: PricingCardProps) {
  const isHighlighted = highlighted || tier.highlighted;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex flex-col rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
        isHighlighted
          ? "bg-[#011A5E] border-2 border-[#68E9FA] shadow-lg shadow-[#68E9FA]/15 scale-[1.02] lg:scale-105"
          : "bg-[#011A5E] border border-[#0E3783] hover:border-[#68E9FA]/30"
      }`}
    >
      {/* Most Popular Badge */}
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="cyan">Most Popular</Badge>
        </div>
      )}

      {/* Tier Header */}
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-klo-text mb-2">
          {tier.name}
        </h3>
        <p className="text-klo-muted text-sm leading-relaxed">
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-[#68E9FA] font-display text-4xl font-bold">
            ${tier.price}
          </span>
          <span className="text-klo-muted text-sm">/{tier.interval}</span>
        </div>
      </div>

      {/* Feature List */}
      <ul className="flex-1 space-y-3 mb-8">
        {tier.features.map((feature, i) => (
          <motion.li
            key={feature}
            custom={i}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start gap-3 text-sm"
          >
            <Check className="h-4 w-4 text-[#68E9FA] shrink-0 mt-0.5" />
            <span className="text-klo-text">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        variant={isHighlighted ? "primary" : tier.slug === "executive" ? "gold" : "secondary"}
        size="lg"
        onClick={() => onSelect(tier)}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Processing..." : tier.cta}
      </Button>
    </motion.div>
  );
}
