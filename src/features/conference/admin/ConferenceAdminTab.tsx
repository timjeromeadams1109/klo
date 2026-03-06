"use client";

import SeminarModeToggle from "./SeminarModeToggle";
import PollManager from "./PollManager";
import QuestionModerator from "./QuestionModerator";
import WordCloudManager from "./WordCloudManager";
import SessionManager from "./SessionManager";
import RoleManager from "./RoleManager";
import ProfanityManager from "./ProfanityManager";
import AnnouncementManager from "./AnnouncementManager";

export default function ConferenceAdminTab() {
  return (
    <div className="space-y-8">
      {/* Seminar Mode Toggle */}
      <section>
        <SeminarModeToggle />
      </section>

      {/* Session Management */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Session Management</h2>
        <SessionManager />
      </section>

      {/* Announcements */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Push Instructions / Announcements</h2>
        <AnnouncementManager />
      </section>

      {/* Poll Management */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Poll Management</h2>
        <PollManager />
      </section>

      {/* Question Moderation */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Question Moderation</h2>
        <QuestionModerator />
      </section>

      {/* Word Cloud */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Word Cloud</h2>
        <WordCloudManager />
      </section>

      {/* Profanity Filter */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Profanity Filter</h2>
        <ProfanityManager />
      </section>

      {/* Role Management */}
      <section>
        <h2 className="text-lg font-semibold text-klo-text mb-4">Role Management</h2>
        <RoleManager />
      </section>
    </div>
  );
}
