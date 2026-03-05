"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Power, Trash2, MessageSquare, Eye } from "lucide-react";
import type { ConferenceSession } from "../types";

export default function SessionManager() {
  const [sessions, setSessions] = useState<ConferenceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/conference/sessions");
      if (res.ok) setSessions(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const createSession = async () => {
    if (!title.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/conference/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
        fetchSessions();
      }
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (id: string, currentlyActive: boolean) => {
    await fetch(`/api/conference/sessions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !currentlyActive }),
    });
    fetchSessions();
  };

  const toggleQA = async (id: string, currentValue: boolean) => {
    await fetch(`/api/conference/sessions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qa_enabled: !currentValue }),
    });
    fetchSessions();
  };

  const setReleaseMode = async (id: string, mode: string) => {
    await fetch(`/api/conference/sessions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ release_mode: mode }),
    });
    fetchSessions();
  };

  const deleteSession = async (id: string) => {
    await fetch(`/api/conference/sessions/${id}`, { method: "DELETE" });
    fetchSessions();
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
      {/* Create form */}
      <div className="glass rounded-2xl p-4 border border-white/5 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Session title..."
          className="w-full bg-klo-navy/50 border border-klo-slate rounded-lg px-4 py-2 text-sm text-klo-text placeholder:text-klo-muted/50 focus:outline-none focus:border-[#2764FF]/50"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)..."
          className="w-full bg-klo-navy/50 border border-klo-slate rounded-lg px-4 py-2 text-sm text-klo-text placeholder:text-klo-muted/50 focus:outline-none focus:border-[#2764FF]/50"
        />
        <button
          onClick={createSession}
          disabled={!title.trim() || creating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2764FF] to-[#21B8CD] text-white font-semibold text-sm rounded-lg hover:brightness-110 disabled:opacity-40"
        >
          <Plus size={16} />
          {creating ? "Creating..." : "Create Session"}
        </button>
      </div>

      {/* Session list */}
      {sessions.map((s) => (
        <div
          key={s.id}
          className={`glass rounded-2xl p-4 border ${
            s.is_active ? "border-emerald-500/30" : "border-white/5"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-klo-text">{s.title}</p>
                {s.is_active && (
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              {s.description && (
                <p className="text-xs text-klo-muted mt-1">{s.description}</p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-klo-muted">
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  Q&A: {s.qa_enabled ? "On" : "Off"}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  Release: {s.release_mode}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleActive(s.id, s.is_active)}
                className={`p-2 rounded-lg transition-colors ${
                  s.is_active
                    ? "text-emerald-400 hover:bg-emerald-500/10"
                    : "text-klo-muted hover:bg-white/5"
                }`}
                title={s.is_active ? "Deactivate" : "Activate"}
              >
                <Power size={16} />
              </button>
              <button
                onClick={() => toggleQA(s.id, s.qa_enabled)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  s.qa_enabled
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                    : "bg-gray-500/20 text-klo-muted border border-white/10 hover:bg-white/10"
                }`}
                title={s.qa_enabled ? "Disable Q&A" : "Enable Q&A"}
              >
                <MessageSquare size={14} />
                {s.qa_enabled ? "Q&A On" : "Q&A Off"}
              </button>
              <button
                onClick={() => deleteSession(s.id)}
                className="p-2 rounded-lg text-klo-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Delete session"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Release mode selector */}
          <div className="mt-3 flex gap-2">
            {(["all", "single", "hide_all"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setReleaseMode(s.id, mode)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  s.release_mode === mode
                    ? "bg-[#2764FF]/20 text-[#2764FF] border border-[#2764FF]/30"
                    : "bg-klo-navy/50 text-klo-muted hover:text-klo-text border border-white/5"
                }`}
              >
                {mode === "all" ? "Show All" : mode === "single" ? "Single Release" : "Hide All"}
              </button>
            ))}
          </div>
        </div>
      ))}

      {sessions.length === 0 && (
        <p className="text-sm text-klo-muted text-center py-4">No sessions created yet</p>
      )}
    </div>
  );
}
