"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import Button from "@/components/shared/Button";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function PremiumLock() {
  return (
    <div className="relative">
      {/* Blurred preview placeholder */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="blur-sm select-none pointer-events-none opacity-40 p-8 space-y-4">
          <div className="h-4 bg-klo-slate rounded w-3/4" />
          <div className="h-4 bg-klo-slate rounded w-full" />
          <div className="h-4 bg-klo-slate rounded w-5/6" />
          <div className="h-4 bg-klo-slate rounded w-2/3" />
          <div className="h-8" />
          <div className="h-4 bg-klo-slate rounded w-full" />
          <div className="h-4 bg-klo-slate rounded w-4/5" />
          <div className="h-4 bg-klo-slate rounded w-full" />
          <div className="h-4 bg-klo-slate rounded w-3/4" />
          <div className="h-8" />
          <div className="h-4 bg-klo-slate rounded w-5/6" />
          <div className="h-4 bg-klo-slate rounded w-full" />
          <div className="h-4 bg-klo-slate rounded w-2/3" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-klo-navy/80 to-klo-navy flex items-center justify-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center px-6 max-w-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-klo-gold/10 border border-klo-gold/20 flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-klo-gold" />
            </div>

            <h3 className="font-display text-xl font-bold text-klo-text mb-3">
              Premium Content
            </h3>

            <p className="text-sm text-klo-muted leading-relaxed mb-6">
              This resource is available exclusively to premium members. Upgrade
              your account to unlock the full library of frameworks, templates,
              and expert briefings.
            </p>

            <Button variant="primary" href="/profile" size="md">
              <Sparkles size={16} />
              Upgrade to Unlock
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
