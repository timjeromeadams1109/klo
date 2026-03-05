"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

type ConferenceRole = "admin" | "moderator" | "presenter" | "attendee" | null;

export function useConferenceRoles() {
  const { data: session } = useSession();
  const [conferenceRole, setConferenceRole] = useState<ConferenceRole>(null);
  const [loading, setLoading] = useState(true);

  const userId = (session?.user as { id?: string } | undefined)?.id;
  const appRole = (session?.user as { role?: string } | undefined)?.role;

  const fetchRole = useCallback(async () => {
    // App-level admin is always conference admin
    if (appRole === "admin") {
      setConferenceRole("admin");
      setLoading(false);
      return;
    }

    if (!userId) {
      setConferenceRole(null);
      setLoading(false);
      return;
    }

    // Could fetch from an API if needed, but for now derive from session
    // The verifyConferenceRole helper handles server-side checks
    setConferenceRole("attendee");
    setLoading(false);
  }, [userId, appRole]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const isAdmin = conferenceRole === "admin";
  const isModerator = conferenceRole === "moderator" || isAdmin;
  const isPresenter = conferenceRole === "presenter" || isModerator;
  const isAuthenticated = !!userId;

  return {
    conferenceRole,
    isAdmin,
    isModerator,
    isPresenter,
    isAuthenticated,
    userId,
    loading,
  };
}
