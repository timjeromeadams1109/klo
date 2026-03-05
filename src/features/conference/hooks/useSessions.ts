"use client";

import { useState, useEffect, useCallback } from "react";
import { useConferenceRealtime } from "./useConferenceRealtime";
import type { ConferenceSession } from "../types";

export function useSessions() {
  const [sessions, setSessions] = useState<ConferenceSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/conference/sessions");
      if (res.ok) {
        setSessions(await res.json());
      }
    } catch {
      // Keep current state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useConferenceRealtime({
    onSessionsChange: fetchSessions,
  });

  const activeSession = sessions.find((s) => s.is_active) || null;

  return { sessions, activeSession, loading, refetch: fetchSessions };
}
