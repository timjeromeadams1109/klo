"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, ShieldAlert, Clock } from "lucide-react";
import type { ProfanityTerm, ProfanityLogEntry } from "../types";

export default function ProfanityManager() {
  const [terms, setTerms] = useState<ProfanityTerm[]>([]);
  const [log, setLog] = useState<ProfanityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTerm, setNewTerm] = useState("");
  const [adding, setAdding] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const fetchTerms = useCallback(async () => {
    try {
      const res = await fetch("/api/conference/profanity");
      if (res.ok) setTerms(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLog = useCallback(async () => {
    const res = await fetch("/api/conference/profanity?log=true");
    if (res.ok) setLog(await res.json());
  }, []);

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  useEffect(() => {
    if (showLog) fetchLog();
  }, [showLog, fetchLog]);

  const addTerm = async () => {
    if (!newTerm.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/conference/profanity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: newTerm }),
      });
      if (res.ok) {
        setNewTerm("");
        fetchTerms();
      }
    } finally {
      setAdding(false);
    }
  };

  const removeTerm = async (termId: string) => {
    await fetch(`/api/conference/profanity?id=${termId}`, { method: "DELETE" });
    fetchTerms();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-[#2764FF]/30 border-t-[#2764FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add term form */}
      <div className="glass rounded-2xl p-4 border border-white/5">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTerm()}
            placeholder="Add profanity term..."
            className="flex-1 bg-klo-navy/50 border border-klo-slate rounded-lg px-4 py-2 text-sm text-klo-text placeholder:text-klo-muted/50 focus:outline-none focus:border-[#2764FF]/50"
          />
          <button
            onClick={addTerm}
            disabled={!newTerm.trim() || adding}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2764FF] to-[#21B8CD] text-white font-semibold text-sm rounded-lg hover:brightness-110 disabled:opacity-40"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Terms as tags */}
      <div className="flex flex-wrap gap-2">
        {terms.map((t) => (
          <span
            key={t.id}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20"
          >
            {t.term}
            <button
              onClick={() => removeTerm(t.id)}
              className="hover:text-red-300 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </span>
        ))}
      </div>

      <p className="text-xs text-klo-muted">{terms.length} terms configured</p>

      {/* Audit log toggle */}
      <button
        onClick={() => setShowLog(!showLog)}
        className="inline-flex items-center gap-2 text-sm text-klo-muted hover:text-klo-text transition-colors"
      >
        <ShieldAlert size={16} />
        {showLog ? "Hide" : "Show"} Audit Log
      </button>

      {/* Audit log */}
      {showLog && (
        <div className="space-y-2">
          {log.length === 0 ? (
            <p className="text-sm text-klo-muted text-center py-4">No blocked submissions</p>
          ) : (
            log.map((entry) => (
              <div
                key={entry.id}
                className="glass rounded-xl p-3 border border-white/5"
              >
                <p className="text-sm text-klo-text">&ldquo;{entry.original_text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-klo-muted">
                  <span className="text-red-400">
                    Flagged: {entry.flagged_terms.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(entry.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
