"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const trendingTopics = [
  { label: "AI Regulation", category: "ai-regulation", color: "border-[#68E9FA]/30 bg-[#68E9FA]/10 text-[#68E9FA] hover:border-[#68E9FA]/60 hover:bg-[#68E9FA]/15" },
  { label: "Church Tech", category: "church-tech", color: "border-[#8840FF]/30 bg-[#8840FF]/10 text-[#8840FF] hover:border-[#8840FF]/60 hover:bg-[#8840FF]/15" },
  { label: "Cybersecurity", category: "cybersecurity", color: "border-[#F77A81]/30 bg-[#F77A81]/10 text-[#F77A81] hover:border-[#F77A81]/60 hover:bg-[#F77A81]/15" },
  { label: "Digital Ethics", category: "digital-ethics", color: "border-[#C8A84E]/30 bg-[#C8A84E]/10 text-[#C8A84E] hover:border-[#C8A84E]/60 hover:bg-[#C8A84E]/15" },
  { label: "AI in Education", category: "ai-education", color: "border-[#37B1FF]/30 bg-[#37B1FF]/10 text-[#37B1FF] hover:border-[#37B1FF]/60 hover:bg-[#37B1FF]/15" },
];

export default function TrendingTopics() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-8">
        <span className="w-10 h-1 bg-gradient-to-r from-[#68E9FA] to-[#37B1FF] rounded-full" />
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
          Trending in Tech &amp; Faith
        </h2>
      </div>

      {/* Topics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <div className="bg-[#011A5E] border border-[#0E3783] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-[#68E9FA]" />
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Popular this week
            </p>
          </div>

          {/* Mobile: horizontal scroll / Desktop: flex wrap grid */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-thin">
            {trendingTopics.map((topic) => (
              <Link
                key={topic.category}
                href={`/feed?category=${topic.category}`}
                className={`shrink-0 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 active:scale-[0.97] ${topic.color}`}
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
