"use client";

import FadeInOnScroll from "@/components/shared/FadeInOnScroll";
import type { VaultQuote } from "@/lib/vault-content";

interface PullQuoteProps {
  quote: VaultQuote;
}

export default function PullQuote({ quote }: PullQuoteProps) {
  return (
    <FadeInOnScroll>
      <div className="relative pl-6 border-l-4 border-[#C8A84E] bg-[#C8A84E]/5 rounded-r-xl py-8 px-8">
        {/* Decorative quote mark */}
        <span className="absolute top-4 right-6 text-6xl font-serif text-[#C8A84E]/15 leading-none select-none">
          &ldquo;
        </span>

        <p className="text-lg md:text-xl italic text-klo-text leading-relaxed mb-4 relative">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-sm text-[#C8A84E] font-medium">
          &mdash; {quote.attribution}
        </p>
      </div>
    </FadeInOnScroll>
  );
}
