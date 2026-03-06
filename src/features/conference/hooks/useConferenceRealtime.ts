"use client";

import { useEffect, useRef } from "react";
import { getSupabase } from "@/lib/supabase";

interface RealtimeCallbacks {
  onSettingsChange?: () => void;
  onPollsChange?: () => void;
  onVotesChange?: () => void;
  onQuestionsChange?: () => void;
  onUpvotesChange?: () => void;
  onWordCloudChange?: () => void;
  onSessionsChange?: () => void;
  onLikesChange?: () => void;
  onAnnouncementsChange?: () => void;
}

export function useConferenceRealtime(callbacks: RealtimeCallbacks) {
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    const supabase = getSupabase();

    const channel = supabase
      .channel("conference-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_settings" },
        () => callbacksRef.current.onSettingsChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_polls" },
        () => callbacksRef.current.onPollsChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_poll_votes" },
        () => callbacksRef.current.onVotesChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_questions" },
        () => callbacksRef.current.onQuestionsChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_question_upvotes" },
        () => callbacksRef.current.onUpvotesChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_word_cloud" },
        () => callbacksRef.current.onWordCloudChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_sessions" },
        () => callbacksRef.current.onSessionsChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_question_likes" },
        () => callbacksRef.current.onLikesChange?.()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conference_announcements" },
        () => callbacksRef.current.onAnnouncementsChange?.()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
