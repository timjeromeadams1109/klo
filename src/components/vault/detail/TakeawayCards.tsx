"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "@/components/shared/FadeInOnScroll";
import { iconMap } from "./iconMap";
import type { VaultTakeaway } from "@/lib/vault-content";

interface TakeawayCardsProps {
  takeaways: VaultTakeaway[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function TakeawayCards({ takeaways }: TakeawayCardsProps) {
  return (
    <FadeInOnScroll>
      <div>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#2764FF] to-[#21B8CD]" />
          <h2 className="font-display text-xl font-bold text-klo-text">
            Key Takeaways
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {takeaways.map((takeaway, i) => {
            const Icon = iconMap[takeaway.icon];
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                custom={i}
                className="group rounded-xl bg-[#011A5E]/40 border border-[#0E3783]/50 p-6 transition-all duration-300 hover:border-[#68E9FA]/30 hover:shadow-lg hover:shadow-[#68E9FA]/5"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2764FF] to-[#21B8CD] flex items-center justify-center mb-4">
                  {Icon && <Icon size={20} className="text-white" />}
                </div>
                <h3 className="font-display text-sm font-semibold text-klo-text mb-2">
                  {takeaway.title}
                </h3>
                <p className="text-sm text-klo-muted leading-relaxed">
                  {takeaway.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </FadeInOnScroll>
  );
}
