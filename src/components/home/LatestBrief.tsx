"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

const mockBrief = {
  title: "The AI Executive Order: What Leaders Need to Know in 2026",
  date: "February 24, 2026",
  excerpt:
    "A concise breakdown of the latest federal guidance on AI governance, what it means for enterprise leaders, and three action steps every organization should take this quarter.",
  slug: "/vault/ai-executive-order-2026",
};

export default function LatestBrief() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-8">
        <span className="w-8 h-0.5 bg-klo-gold rounded-full" />
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-klo-text">
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
          <div className="bg-klo-dark border border-klo-slate rounded-xl p-6 sm:p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/20 group-hover:border-klo-gold/20">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center rounded-lg bg-klo-slate">
                <FileText className="w-5 h-5 text-klo-gold" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-klo-muted uppercase tracking-wider mb-2">
                  {mockBrief.date}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-klo-text mb-3 group-hover:text-klo-gold transition-colors duration-200">
                  {mockBrief.title}
                </h3>
                <p className="text-sm text-klo-muted leading-relaxed line-clamp-2 mb-4">
                  {mockBrief.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-klo-gold group-hover:gap-2.5 transition-all duration-200">
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
