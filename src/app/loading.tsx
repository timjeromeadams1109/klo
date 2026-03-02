"use client";

import { motion } from "framer-motion";

const pulseVariants = {
  initial: { opacity: 0.4, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeOut" as const,
    },
  },
};

const spinnerVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      {/* KLO logo pulse */}
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        className="font-display text-5xl font-bold text-klo-gold tracking-wide select-none"
      >
        KLO
      </motion.div>

      {/* Gold spinner */}
      <motion.div
        variants={spinnerVariants}
        initial="initial"
        animate="animate"
        className="w-10 h-10 rounded-full border-2 border-klo-slate border-t-klo-gold"
      />

      {/* Loading text */}
      <p className="text-klo-muted text-sm font-medium tracking-wider uppercase">
        Loading...
      </p>
    </div>
  );
}
