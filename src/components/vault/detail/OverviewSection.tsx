"use client";

import FadeInOnScroll from "@/components/shared/FadeInOnScroll";

interface OverviewSectionProps {
  overview: string;
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  const paragraphs = overview.split("\n\n");

  return (
    <FadeInOnScroll>
      <div className="relative rounded-2xl bg-[#011A5E]/30 border border-[#0E3783]/50 p-8 md:p-10 overflow-hidden">
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#2764FF]/10 to-transparent rounded-bl-full" />

        <div className="relative space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-klo-muted text-base leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </FadeInOnScroll>
  );
}
