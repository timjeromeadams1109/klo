"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "@/components/shared/FadeInOnScroll";
import type { VaultStep } from "@/lib/vault-content";

interface ImplementationStepsProps {
  steps: VaultStep[];
}

const stepVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ImplementationSteps({
  steps,
}: ImplementationStepsProps) {
  return (
    <FadeInOnScroll>
      <div>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#2764FF] to-[#21B8CD]" />
          <h2 className="font-display text-xl font-bold text-klo-text">
            Implementation Steps
          </h2>
        </div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Connecting line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-[#2764FF] via-[#21B8CD] to-[#0E3783]/30" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                custom={i}
                className="relative flex gap-5"
              >
                {/* Number badge */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#2764FF] to-[#21B8CD] flex items-center justify-center shrink-0 shadow-lg shadow-[#2764FF]/20">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1.5 pb-2">
                  <h3 className="font-display text-base font-semibold text-klo-text mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-klo-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FadeInOnScroll>
  );
}
