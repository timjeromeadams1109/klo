"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

const mockBrief = {
  title: "The AI Executive Order: What Leaders Need to Know in 2026",
  date: "February 24, 2026",
  excerpt:
    "A concise breakdown of the latest federal guidance on AI governance, what it means for enterprise leaders, and three action steps every organization should take this quarter.",
  slug: "/vault/executives-ai-briefing-q1-2026",
};

export default function LatestBrief() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-8">
        <span className="w-10 h-1 bg-gradient-to-r from-[#68E9FA] to-[#37B1FF] rounded-full" />
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
          Latest Intelligence Brief
        </h2>
      </div>

      {/* Brief card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link href={mockBrief.slug} className="block group">
          <div className="bg-[#011A5E] border border-[#0E3783] rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-[#68E9FA]/10 group-hover:border-[#68E9FA]/30">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center rounded-xl bg-[#0E3783]">
                <FileText className="w-5 h-5 text-[#68E9FA]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                  {mockBrief.date}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-[#68E9FA] transition-colors duration-200">
                  {mockBrief.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4">
                  {mockBrief.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#68E9FA] hover:underline group-hover:gap-2.5 transition-all duration-200">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
