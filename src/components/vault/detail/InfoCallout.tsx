"use client";

import { Info, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import FadeInOnScroll from "@/components/shared/FadeInOnScroll";
import type { VaultCallout } from "@/lib/vault-content";

interface InfoCalloutProps {
  callouts: VaultCallout[];
}

const calloutConfig: Record<
  VaultCallout["type"],
  { color: string; bg: string; border: string; Icon: typeof Info }
> = {
  info: {
    color: "text-[#2764FF]",
    bg: "bg-[#2764FF]/5",
    border: "border-[#2764FF]/40",
    Icon: Info,
  },
  warning: {
    color: "text-[#C8A84E]",
    bg: "bg-[#C8A84E]/5",
    border: "border-[#C8A84E]/40",
    Icon: AlertTriangle,
  },
  tip: {
    color: "text-[#21B8CD]",
    bg: "bg-[#21B8CD]/5",
    border: "border-[#21B8CD]/40",
    Icon: Lightbulb,
  },
  example: {
    color: "text-[#6ECF55]",
    bg: "bg-[#6ECF55]/5",
    border: "border-[#6ECF55]/40",
    Icon: BookOpen,
  },
};

export default function InfoCallout({ callouts }: InfoCalloutProps) {
  return (
    <div className="space-y-4">
      {callouts.map((callout, i) => {
        const config = calloutConfig[callout.type];
        return (
          <FadeInOnScroll key={i} delay={i * 0.1}>
            <div
              className={`${config.bg} border-l-4 ${config.border} rounded-r-xl p-6`}
            >
              <div className="flex items-start gap-3">
                <config.Icon size={18} className={`${config.color} mt-0.5 shrink-0`} />
                <div>
                  <h4
                    className={`font-display text-sm font-semibold ${config.color} mb-1.5`}
                  >
                    {callout.title}
                  </h4>
                  <p className="text-sm text-klo-muted leading-relaxed">
                    {callout.body}
                  </p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        );
      })}
    </div>
  );
}
