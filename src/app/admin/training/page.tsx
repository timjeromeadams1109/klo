"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  LayoutDashboard,
  Vote,
  BarChart3,
  Inbox,
  ClipboardCheck,
  Users,
  BotMessageSquare,
  DollarSign,
  Lock,
  Radio,
  MessageSquare,
  Cloud,
  Megaphone,
  Shield,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  BookOpen,
  PlayCircle,
  Star,
  Upload,
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  Plus,
  Globe,
  Pencil,
  Power,
  UserPlus,
  Download,
  Zap,
} from "lucide-react";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

interface TrainingSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  adminTab?: string; // which admin tab this maps to
  steps: TrainingStep[];
  tips?: string[];
  subSections?: TrainingSubSection[];
}

interface TrainingStep {
  icon: React.ElementType;
  label: string;
  detail: string;
}

interface TrainingSubSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  steps: TrainingStep[];
  tips?: string[];
}

// ------------------------------------------------------------
// Training content — update this when features change
// ------------------------------------------------------------

const TRAINING_SECTIONS: TrainingSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: PlayCircle,
    description: "How to access the admin dashboard and navigate its 9 tabs.",
    steps: [
      { icon: Globe, label: "Sign In", detail: "Go to keithlodom.io and click Sign In, or navigate directly to /auth/signin" },
      { icon: Users, label: "Use Admin Credentials", detail: "Enter your admin email and password. Only owner and admin roles can access the dashboard." },
      { icon: Star, label: "Find the Admin Link", detail: "Once signed in, the gold \"Admin\" link appears in the top navigation bar" },
      { icon: LayoutDashboard, label: "Explore 9 Tabs", detail: "The dashboard has 9 tabs: Overview, Events, Conference, Inquiries, Presentations, Users, Content, Revenue, and Tools" },
      { icon: Zap, label: "Request a Site Update", detail: "Click the blue \"Request Update\" button (top-right) to submit a change request for any part of the website that isn't managed in the dashboard — like homepage text, bio, images, or pricing" },
    ],
    tips: [
      "Only users with the \"admin\" or \"owner\" role can see the Admin link. Moderators have limited conference access.",
      "The Inquiries tab shows a blue badge with the count of new/unread inquiries.",
      "Use the Refresh button (top-right) to reload data on any tab.",
      "For changes to website content (homepage, about page, images, etc.), use the blue \"Request Update\" button — Tim will handle it quickly.",
    ],
  },
  {
    id: "events",
    title: "Events Management",
    icon: Vote,
    description: "Create, publish, and manage conference events with files, AI document parsing, and reports.",
    adminTab: "events",
    steps: [
      { icon: Plus, label: "Add Event", detail: "Click \"+ Add Event\" to create a new event with title, date, location, conference details, and optional access code" },
      { icon: Globe, label: "Web Link", detail: "Open the event's public-facing page to preview what attendees see" },
      { icon: Star, label: "Feature Event", detail: "Pin one event as the featured event — it appears on the homepage with a live countdown timer. Only one event can be featured at a time." },
      { icon: Pencil, label: "Edit Event", detail: "Modify event details including title, dates, location, slug, access code, display settings, and seminar mode" },
      { icon: Upload, label: "Upload Files", detail: "Expand an event to attach files (PDF, PPT, DOC, XLS, TXT — up to 50MB each). These are downloadable by attendees." },
      { icon: Zap, label: "AI Document Parse", detail: "Upload a conference schedule PDF/DOC and let AI automatically extract event details — supports multiple events per document" },
      { icon: Trash2, label: "Delete Event", detail: "Remove an event permanently (with confirmation prompt)" },
    ],
    tips: [
      "Events are split into \"Current Events\" (future dates) and \"Previous Events\" (past dates).",
      "The gold star icon marks the currently featured event. Click the star on another event to switch.",
      "File uploads are stored in Supabase and served via secure signed URLs.",
    ],
  },
  {
    id: "conference",
    title: "Conference Tools",
    icon: BarChart3,
    description: "Real-time audience engagement — manage sessions, polls, Q&A, word clouds, and announcements for live events.",
    adminTab: "conference",
    steps: [
      { icon: Eye, label: "Select an Event", detail: "The Conference tab shows all your events. Click any event card to drill into its interactive tools." },
      { icon: Power, label: "Go LIVE", detail: "Toggle the LIVE switch (top-right) to enable all interactive tools for attendees. Green = active." },
      { icon: ArrowLeft, label: "Back to Events", detail: "Click the back arrow to return to the event list and select a different event" },
    ],
    tips: [
      "The \"Engagement OFF\" status bar at the top shows when no events are currently live.",
      "Events with sessions show a blue badge with the session count.",
    ],
    subSections: [
      {
        id: "sessions",
        title: "Sessions",
        icon: Radio,
        description: "Add and manage individual sessions within an event. Each session gets its own polls, Q&A, and toggle.",
        steps: [
          { icon: Plus, label: "Add Session", detail: "Create sessions with title, description, speaker name, room location, and time" },
          { icon: Zap, label: "Auto-Fetch Schedule", detail: "Toggle to automatically sync the session schedule from the web every 7 days via n8n automation" },
          { icon: MessageSquare, label: "Q&A Toggle", detail: "Enable or disable Q&A per session (red = off, green = on). When off, attendees cannot submit questions." },
          { icon: Eye, label: "Release Controls", detail: "\"Show All\" makes all sessions visible, \"Single Release\" shows one at a time, \"Hide All\" hides everything from attendees" },
        ],
        tips: ["Sessions are displayed to attendees in the order they are created."],
      },
      {
        id: "polls",
        title: "Live Polling",
        icon: BarChart3,
        description: "Create polls, deploy them live, and view real-time results.",
        steps: [
          { icon: Plus, label: "Create Poll", detail: "Enter a question and 2+ answer options. Click \"Create Poll (Queued)\" to save it." },
          { icon: Upload, label: "Batch Import", detail: "Switch to \"Batch\" tab to upload a CSV or document with multiple polls. Also supports .pdf, .doc, .xls files." },
          { icon: PlayCircle, label: "Deploy Live", detail: "Push a queued poll live so attendees can see it and vote in real-time" },
          { icon: Filter, label: "Filter by Session", detail: "Use the session dropdown to view polls for a specific session only" },
          { icon: Download, label: "Export Results", detail: "Download poll results as CSV for reporting and post-event analysis" },
        ],
        tips: [
          "Polls update in real-time via WebSocket — results appear instantly as attendees vote.",
          "You can deploy multiple polls at once or release them one at a time for pacing.",
        ],
      },
      {
        id: "qa",
        title: "Q&A Moderation",
        icon: MessageSquare,
        description: "Review, approve, and manage audience questions during live events.",
        steps: [
          { icon: Eye, label: "Approve / Hide", detail: "Control which questions are visible to the audience. Hidden questions are only seen by admins." },
          { icon: Star, label: "Mark Answered", detail: "Flag questions that have been addressed by the speaker" },
          { icon: FileText, label: "Archive", detail: "Move old questions to the archive tab for record-keeping" },
          { icon: Trash2, label: "Delete", detail: "Remove questions permanently" },
        ],
        tips: [
          "Questions update in real-time via WebSocket — no need to refresh.",
          "Questions are ranked by upvote count so you can see what the audience cares about most.",
        ],
      },
      {
        id: "wordcloud",
        title: "Word Cloud",
        icon: Cloud,
        description: "See what words and phrases attendees are submitting in real-time.",
        steps: [
          { icon: Eye, label: "Live View", detail: "Words appear as attendees type them, sized proportionally by frequency" },
          { icon: Trash2, label: "Delete Entries", detail: "Remove individual inappropriate or off-topic words" },
          { icon: Trash2, label: "Clear All", detail: "Reset the entire word cloud with a confirmation prompt" },
        ],
      },
      {
        id: "announcements",
        title: "Announcements",
        icon: Megaphone,
        description: "Broadcast messages to all event attendees in real-time.",
        steps: [
          { icon: Plus, label: "Send Announcement", detail: "Enter a title and message, then broadcast to all attendees instantly" },
          { icon: Power, label: "Toggle Active", detail: "Turn announcements on/off without deleting them" },
          { icon: Trash2, label: "Delete", detail: "Remove announcements permanently when no longer needed" },
        ],
      },
      {
        id: "settings",
        title: "Settings",
        icon: Shield,
        description: "Manage roles, profanity filters, and the master engagement toggle.",
        steps: [
          { icon: UserPlus, label: "Role Manager", detail: "Assign admin, moderator, or presenter roles to users by email. Moderators can approve Q&A questions." },
          { icon: Shield, label: "Profanity Filter", detail: "Add custom terms to the blocklist. View a log of when and where violations occurred." },
          { icon: Power, label: "Seminar Mode", detail: "Master toggle for all interactive tools (polls, Q&A, word cloud, sessions). Same as the LIVE switch." },
        ],
        tips: ["Moderators can approve Q&A questions but cannot create events or manage users."],
      },
    ],
  },
  {
    id: "inquiries",
    title: "Inquiries",
    icon: Inbox,
    description: "Track and respond to booking and consultation requests from the website.",
    adminTab: "inquiries",
    steps: [
      { icon: Search, label: "Search", detail: "Find inquiries by name or email address" },
      { icon: Filter, label: "Filter by Type", detail: "Booking, Consultation, or All" },
      { icon: Filter, label: "Filter by Status", detail: "New → Reviewed → Contacted → Archived. Update status with one click." },
      { icon: Eye, label: "View Details", detail: "Click any inquiry to see the full message, contact info, phone, and organization" },
    ],
    tips: [
      "The blue badge on the Inquiries tab shows the count of unread inquiries.",
      "Workflow: New → Reviewed → Contacted → Archived. Move inquiries through each stage as you handle them.",
      "20 inquiries per page with pagination controls.",
    ],
  },
  {
    id: "presentations",
    title: "Presentations",
    icon: ClipboardCheck,
    description: "Upload and manage downloadable presentation materials for your audience.",
    adminTab: "presentations",
    steps: [
      { icon: Plus, label: "Create Presentation", detail: "Add a title, description, and category for a new presentation" },
      { icon: Upload, label: "Upload Files", detail: "Attach PDF, PPT, PPTX, DOC, DOCX, XLS, XLSX, or TXT files (50MB max per file)" },
      { icon: Eye, label: "Publish / Unpublish", detail: "Toggle visibility — unpublished presentations are hidden from attendees" },
      { icon: Trash2, label: "Delete", detail: "Remove presentations or individual files" },
    ],
    tips: [
      "Published presentations appear in the public Vault section of the website.",
      "Click the expand arrow on any presentation to see and manage its attached files.",
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: Users,
    description: "View and search all registered users across the platform.",
    adminTab: "users",
    steps: [
      { icon: Search, label: "Search", detail: "Find users by name or organization" },
      { icon: Filter, label: "Filter by Tier", detail: "Free, Pro, Executive, or All" },
      { icon: Eye, label: "View Details", detail: "Full name, email, organization, subscription tier, and signup date" },
    ],
    tips: [
      "Users are sorted by creation date (newest first) by default.",
      "20 users per page with pagination.",
    ],
  },
  {
    id: "content",
    title: "Content (Assessments)",
    icon: BotMessageSquare,
    description: "View and manage all completed leadership assessment results.",
    adminTab: "content",
    steps: [
      { icon: Search, label: "Search", detail: "Find results by user name" },
      { icon: Filter, label: "Filter by Type", detail: "Leadership, Strategic Vision, and other assessment types" },
      { icon: Eye, label: "View Details", detail: "User name, email, score, and completion date" },
      { icon: Trash2, label: "Delete Individual", detail: "Remove a single assessment result" },
      { icon: Trash2, label: "Delete All", detail: "Bulk delete all results with a confirmation modal — use with caution!" },
    ],
  },
];

// ------------------------------------------------------------
// Workflow cards
// ------------------------------------------------------------

const WORKFLOWS = [
  {
    title: "Before a Conference",
    emoji: "🎯",
    steps: [
      "Create event in Events tab",
      "Feature it (star icon) for homepage countdown",
      "Conference tab → select event → Add sessions",
      "Create polls for each session",
      "Test with access code",
    ],
  },
  {
    title: "Going Live",
    emoji: "🔴",
    steps: [
      "Conference tab → select event",
      "Toggle LIVE switch (top-right) to ON",
      "Deploy polls one at a time",
      "Monitor Q&A — approve questions",
      "Send announcements as needed",
    ],
  },
  {
    title: "After the Event",
    emoji: "📊",
    steps: [
      "Toggle LIVE to OFF",
      "Export poll results (CSV)",
      "Review Q&A archive",
      "Check engagement metrics",
    ],
  },
  {
    title: "Managing Inquiries",
    emoji: "💬",
    steps: [
      "Check Inquiries tab (blue badge = unread)",
      "Click inquiry to view details",
      "Update status: New → Reviewed → Contacted → Archived",
    ],
  },
  {
    title: "Uploading Presentations",
    emoji: "📑",
    steps: [
      "Presentations tab → Create new",
      "Set title, description, category",
      "Upload files (PDF, PPT, DOC)",
      "Toggle \"Published\" when ready",
    ],
  },
  {
    title: "Adding a Moderator",
    emoji: "🛡️",
    steps: [
      "Conference tab → select event",
      "Settings sub-tab → Role Manager",
      "Enter email → Assign \"moderator\" role",
      "They can now approve Q&A questions",
    ],
  },
];

// ------------------------------------------------------------
// Animation variants
// ------------------------------------------------------------

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export default function TrainingPage() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>("getting-started");
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [view, setView] = useState<"guide" | "workflows">("guide");

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
    setExpandedSub(null);
  };

  const toggleSub = (id: string) => {
    setExpandedSub(expandedSub === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-klo-dark">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-klo-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="p-2 rounded-lg text-klo-muted hover:text-klo-text hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-klo-text flex items-center gap-2">
              <BookOpen size={20} className="text-klo-gold" />
              Admin Training Guide
            </h1>
            <p className="text-xs text-klo-muted mt-0.5">
              Complete walkthrough of every admin function
            </p>
          </div>

          {/* View toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-klo-dark/50 border border-white/5">
            <button
              onClick={() => setView("guide")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "guide"
                  ? "bg-klo-slate text-klo-text shadow-md"
                  : "text-klo-muted hover:text-klo-text"
              }`}
            >
              <BookOpen size={14} className="inline mr-1.5 -mt-0.5" />
              Feature Guide
            </button>
            <button
              onClick={() => setView("workflows")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "workflows"
                  ? "bg-klo-slate text-klo-text shadow-md"
                  : "text-klo-muted hover:text-klo-text"
              }`}
            >
              <Lightbulb size={14} className="inline mr-1.5 -mt-0.5" />
              Workflows
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {view === "guide" ? (
            <motion.div
              key="guide"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
              className="space-y-3"
            >
              {TRAINING_SECTIONS.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  expanded={expandedSection === section.id}
                  onToggle={() => toggleSection(section.id)}
                  expandedSub={expandedSub}
                  onToggleSub={toggleSub}
                  onNavigate={(tab) => router.push(`/admin?tab=${tab}`)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="workflows"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
            >
              <p className="text-klo-muted mb-6 text-sm">
                Step-by-step guides for the most common admin tasks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WORKFLOWS.map((wf) => (
                  <div
                    key={wf.title}
                    className="rounded-2xl border border-white/5 bg-klo-surface p-6 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{wf.emoji}</span>
                      <h3 className="text-lg font-semibold text-klo-text">{wf.title}</h3>
                    </div>
                    <ol className="space-y-2.5">
                      {wf.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-klo-gold/15 text-klo-gold text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-klo-text/90">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Section Card
// ------------------------------------------------------------

function SectionCard({
  section,
  expanded,
  onToggle,
  expandedSub,
  onToggleSub,
  onNavigate,
}: {
  section: TrainingSection;
  expanded: boolean;
  onToggle: () => void;
  expandedSub: string | null;
  onToggleSub: (id: string) => void;
  onNavigate: (tab: string) => void;
}) {
  const Icon = section.icon;

  return (
    <div className="rounded-2xl border border-white/5 bg-klo-surface overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="p-2.5 rounded-xl bg-klo-gold/10 shrink-0">
          <Icon size={20} className="text-klo-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-klo-text">{section.title}</h3>
          <p className="text-sm text-klo-muted mt-0.5 line-clamp-1">{section.description}</p>
        </div>
        {section.adminTab && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(section.adminTab!); }}
            className="shrink-0 text-xs font-medium text-klo-gold bg-klo-gold/10 hover:bg-klo-gold/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Open Tab →
          </button>
        )}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-klo-muted"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* Steps */}
              <div className="space-y-2.5">
                {section.steps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <StepIcon size={14} className="text-klo-gold" />
                      </div>
                      <div>
                        <span className="font-medium text-klo-text">{step.label}</span>
                        <span className="text-klo-muted"> — {step.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tips */}
              {section.tips && section.tips.length > 0 && (
                <div className="rounded-xl bg-[#2764FF]/5 border border-[#2764FF]/10 p-4 space-y-2">
                  <div className="text-xs font-semibold text-[#2764FF] flex items-center gap-1.5">
                    <Lightbulb size={13} />
                    Tips
                  </div>
                  {section.tips.map((tip, i) => (
                    <p key={i} className="text-sm text-[#7eb0ff] leading-relaxed">{tip}</p>
                  ))}
                </div>
              )}

              {/* Sub-sections (for Conference) */}
              {section.subSections && section.subSections.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-klo-muted uppercase tracking-wider mb-3">
                    Sub-sections
                  </div>
                  {section.subSections.map((sub) => (
                    <SubSectionCard
                      key={sub.id}
                      sub={sub}
                      expanded={expandedSub === sub.id}
                      onToggle={() => onToggleSub(sub.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------
// Sub-section Card (for conference drill-down)
// ------------------------------------------------------------

function SubSectionCard({
  sub,
  expanded,
  onToggle,
}: {
  sub: TrainingSubSection;
  expanded: boolean;
  onToggle: () => void;
}) {
  const Icon = sub.icon;

  return (
    <div className="rounded-xl border border-white/5 bg-klo-dark/40 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        <Icon size={15} className="text-klo-gold shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-klo-text">{sub.title}</span>
          <span className="text-xs text-klo-muted ml-2">{sub.description}</span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="text-klo-muted shrink-0"
        >
          <ChevronRight size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div className="border-t border-white/5" />
              <div className="space-y-2">
                {sub.steps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <StepIcon size={12} className="text-klo-gold" />
                      </div>
                      <div>
                        <span className="font-medium text-klo-text">{step.label}</span>
                        <span className="text-klo-muted"> — {step.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {sub.tips && sub.tips.length > 0 && (
                <div className="rounded-lg bg-[#2764FF]/5 border border-[#2764FF]/10 p-3">
                  {sub.tips.map((tip, i) => (
                    <p key={i} className="text-xs text-[#7eb0ff] leading-relaxed">{tip}</p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
