"use client";

import { useState } from "react";
import { Send, AlertTriangle, X } from "lucide-react";
import Card from "@/components/shared/Card";

interface QuestionInputProps {
  onSubmit: (text: string, authorName?: string) => Promise<boolean>;
  profanityError?: string[] | null;
  onClearProfanityError?: () => void;
}

export default function QuestionInput({
  onSubmit,
  profanityError,
  onClearProfanityError,
}: QuestionInputProps) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    const ok = await onSubmit(trimmed);
    if (ok) setText("");
    setSubmitting(false);
  };

  return (
    <div className="space-y-2">
      {profanityError && profanityError.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-400 font-medium">
              Your question was blocked due to inappropriate language.
            </p>
            <p className="text-xs text-red-400/70 mt-1">
              Please rephrase and try again.
            </p>
          </div>
          {onClearProfanityError && (
            <button
              onClick={onClearProfanityError}
              className="text-red-400/50 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
      <Card>
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (profanityError) onClearProfanityError?.();
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Ask an anonymous question..."
            className="flex-1 bg-klo-navy/50 border border-klo-slate rounded-lg px-4 py-3 text-sm text-klo-text placeholder:text-klo-muted/50 focus:outline-none focus:border-[#2764FF]/50 focus:ring-1 focus:ring-[#2764FF]/20 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || submitting}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#2764FF] to-[#21B8CD] text-white font-semibold text-sm rounded-lg hover:brightness-110 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {submitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </Card>
    </div>
  );
}
