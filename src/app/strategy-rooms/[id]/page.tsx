"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Users,
  Crown,
  Lock,
  Play,
  Download,
  CheckCircle,
  Heart,
  Send,
  MessageSquare,
  Zap,
  ArrowRight,
} from "lucide-react";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import {
  getSessionById,
  getRelatedSessions,
  sampleDiscussionComments,
  type StrategySession,
  type DiscussionComment,
} from "@/lib/strategy-rooms-data";

// ── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ── Tier Badge ───────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: "pro" | "executive" }) {
  if (tier === "executive") {
    return (
      <Badge variant="gold">
        <Crown size={12} className="mr-1" />
        Executive
      </Badge>
    );
  }
  return (
    <Badge variant="blue">
      <Lock size={12} className="mr-1" />
      Pro
    </Badge>
  );
}

// ── Countdown Timer ──────────────────────────────────────────────────────────

function CountdownTimer({ dateStr }: { dateStr: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    function calculate() {
      const target = new Date(dateStr).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    }
    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [dateStr]);

  return (
    <div className="flex items-center gap-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-16 h-16 bg-klo-gold/10 border border-klo-gold/20 rounded-xl flex items-center justify-center mb-1">
            <span className="font-display text-2xl font-bold text-klo-gold">
              {item.value}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-klo-muted">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Discussion Comment Component ─────────────────────────────────────────────

function CommentItem({
  comment,
  onLike,
}: {
  comment: DiscussionComment;
  onLike: (id: string) => void;
}) {
  return (
    <motion.div variants={itemFade} className="flex gap-3">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-klo-gold/15 border border-klo-gold/20 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-klo-gold">
          {comment.authorInitials}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-klo-text">
            {comment.author}
          </span>
          <span className="text-xs text-klo-muted">{comment.timestamp}</span>
        </div>
        <p className="text-sm text-klo-muted leading-relaxed mb-1.5">
          {comment.content}
        </p>
        <button
          onClick={() => onLike(comment.id)}
          className="inline-flex items-center gap-1.5 text-xs text-klo-muted hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Heart size={13} />
          <span>{comment.likes}</span>
        </button>
      </div>
    </motion.div>
  );
}

// ── Related Session Card ─────────────────────────────────────────────────────

function RelatedSessionCard({ session }: { session: StrategySession }) {
  return (
    <Link href={`/strategy-rooms/${session.id}`}>
      <Card hoverable className="p-4">
        <TierBadge tier={session.tier} />
        <h4 className="font-display text-sm font-bold text-klo-text mt-2 mb-1 leading-snug hover:text-klo-gold transition-colors">
          {session.title}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-klo-muted">
          <Calendar size={12} />
          <span>{session.date}</span>
        </div>
      </Card>
    </Link>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────

export default function StrategyRoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const session = getSessionById(id);
  const related = getRelatedSessions(id, 3);

  const [registered, setRegistered] = useState(false);
  const [comments, setComments] = useState<DiscussionComment[]>(
    sampleDiscussionComments
  );
  const [newComment, setNewComment] = useState("");

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-klo-text mb-4">
            Session Not Found
          </h1>
          <p className="text-klo-muted mb-6">
            This strategy room session could not be found.
          </p>
          <Button variant="secondary" href="/strategy-rooms">
            <ArrowLeft size={16} />
            Back to Strategy Rooms
          </Button>
        </div>
      </div>
    );
  }

  function handleLike(commentId: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  }

  function handleSubmitComment() {
    if (!newComment.trim()) return;
    const comment: DiscussionComment = {
      id: `dc-new-${Date.now()}`,
      author: "You",
      authorInitials: "YO",
      content: newComment.trim(),
      timestamp: "Just now",
      likes: 0,
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  }

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Back Link */}
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <Link
              href="/strategy-rooms"
              className="inline-flex items-center gap-2 text-sm text-klo-muted hover:text-klo-gold transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Strategy Rooms
            </Link>
          </motion.div>

          {/* Layout: Main + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Main Content ──────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Session Header */}
              <motion.div variants={fadeUp} custom={1}>
                <Card className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <TierBadge tier={session.tier} />
                    <Badge variant={session.isPast ? "muted" : "green"}>
                      {session.isPast ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>

                  <h1 className="font-display text-2xl md:text-3xl font-bold text-klo-text mb-4 leading-tight">
                    {session.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-klo-muted mb-5">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={15} className="text-klo-gold" />
                      {session.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock size={15} className="text-klo-gold" />
                      {session.time}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <User size={15} className="text-klo-gold" />
                      {session.facilitator}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Users size={15} className="text-klo-gold" />
                      {session.isPast
                        ? `${session.attendees} attended`
                        : `${session.registeredCount}/${session.totalSeats} registered`}
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic) => (
                      <Badge key={topic} variant="muted">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} custom={2}>
                <Card className="mb-6">
                  <h2 className="font-display text-lg font-bold text-klo-text mb-3">
                    About This Session
                  </h2>
                  <p className="text-sm text-klo-muted leading-relaxed">
                    {session.description}
                  </p>
                </Card>
              </motion.div>

              {/* ── Upcoming-specific sections ────────────────── */}
              {!session.isPast && (
                <>
                  {/* Countdown + Registration */}
                  <motion.div variants={fadeUp} custom={3}>
                    <Card className="mb-6">
                      <h2 className="font-display text-lg font-bold text-klo-text mb-5">
                        Session Starts In
                      </h2>
                      <CountdownTimer dateStr={session.date} />

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {registered ? (
                          <Button
                            variant="secondary"
                            onClick={() => setRegistered(false)}
                          >
                            <CheckCircle size={16} />
                            Registered
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => setRegistered(true)}
                          >
                            Register for Session
                          </Button>
                        )}
                        <Button variant="ghost" disabled>
                          <Zap size={16} />
                          Join Session
                        </Button>
                      </div>

                      {/* Capacity */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-xs text-klo-muted mb-1.5">
                          <span>
                            {session.totalSeats - session.registeredCount} seats
                            remaining
                          </span>
                          <span>
                            {Math.round(
                              (session.registeredCount / session.totalSeats) *
                                100
                            )}
                            % full
                          </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-klo-gold to-amber-400"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.round(
                                (session.registeredCount /
                                  session.totalSeats) *
                                  100
                              )}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut" as const,
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Agenda */}
                  {session.agenda && (
                    <motion.div variants={fadeUp} custom={4}>
                      <Card className="mb-6">
                        <h2 className="font-display text-lg font-bold text-klo-text mb-4">
                          Session Agenda
                        </h2>
                        <div className="space-y-0">
                          {session.agenda.map((item, idx) => (
                            <div
                              key={idx}
                              className={`flex gap-4 py-4 ${
                                idx < (session.agenda?.length ?? 0) - 1
                                  ? "border-b border-klo-slate"
                                  : ""
                              }`}
                            >
                              <div className="shrink-0 w-20">
                                <span className="text-xs font-mono text-klo-gold font-medium">
                                  {item.time}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-klo-text mb-0.5">
                                  {item.title}
                                </h3>
                                <p className="text-xs text-klo-muted leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </>
              )}

              {/* ── Past-specific sections ────────────────────── */}
              {session.isPast && (
                <>
                  {/* Replay */}
                  {session.replayUrl && (
                    <motion.div variants={fadeUp} custom={3}>
                      <Card className="mb-6">
                        <h2 className="font-display text-lg font-bold text-klo-text mb-4">
                          Session Replay
                        </h2>
                        {/* Video placeholder */}
                        <div className="relative aspect-video bg-klo-navy rounded-xl overflow-hidden border border-klo-slate mb-4 flex items-center justify-center group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="relative z-10 w-16 h-16 rounded-full bg-klo-gold/20 border-2 border-klo-gold flex items-center justify-center group-hover:bg-klo-gold/30 transition-colors">
                            <Play
                              size={28}
                              className="text-klo-gold ml-1"
                              fill="currentColor"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="primary" size="sm">
                            <Play size={14} />
                            Watch Replay
                          </Button>
                          {session.notesUrl && (
                            <Button variant="secondary" size="sm">
                              <Download size={14} />
                              Download Notes
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {/* Key Takeaways */}
                  {session.keyTakeaways && (
                    <motion.div variants={fadeUp} custom={4}>
                      <Card className="mb-6">
                        <h2 className="font-display text-lg font-bold text-klo-text mb-4">
                          Key Takeaways
                        </h2>
                        <ul className="space-y-3">
                          {session.keyTakeaways.map((takeaway, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-klo-muted leading-relaxed"
                            >
                              <CheckCircle
                                size={16}
                                className="text-klo-gold shrink-0 mt-0.5"
                              />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </motion.div>
                  )}
                </>
              )}

              {/* ── Discussion Thread ─────────────────────────── */}
              <motion.div variants={fadeUp} custom={5}>
                <Card className="mb-6">
                  <div className="flex items-center gap-2 mb-5">
                    <MessageSquare size={18} className="text-klo-gold" />
                    <h2 className="font-display text-lg font-bold text-klo-text">
                      Discussion ({comments.length})
                    </h2>
                  </div>

                  {/* Comments */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="space-y-5 mb-6"
                  >
                    {comments.map((comment) => (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        onLike={handleLike}
                      />
                    ))}
                  </motion.div>

                  {/* New Comment */}
                  <div className="border-t border-klo-slate pt-5">
                    <h3 className="text-sm font-semibold text-klo-text mb-3">
                      Add a Comment
                    </h3>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts or questions..."
                      rows={3}
                      className="w-full bg-white/5 border border-klo-slate rounded-xl px-4 py-3 text-sm text-klo-text placeholder-klo-muted focus:outline-none focus:ring-2 focus:ring-klo-gold/30 focus:border-klo-gold/40 resize-none transition-all"
                    />
                    <div className="flex justify-end mt-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                      >
                        <Send size={14} />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* ── Sidebar (desktop) ─────────────────────────────── */}
            <motion.aside
              variants={fadeUp}
              custom={3}
              className="hidden lg:block w-72 shrink-0"
            >
              <div className="sticky top-28 space-y-6">
                {/* Quick Info */}
                <Card>
                  <h3 className="font-display text-sm font-bold text-klo-text mb-3 uppercase tracking-wider">
                    Session Info
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-klo-muted text-xs mb-0.5">
                        Facilitator
                      </dt>
                      <dd className="text-klo-text font-medium">
                        {session.facilitator}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-klo-muted text-xs mb-0.5">
                        Date & Time
                      </dt>
                      <dd className="text-klo-text font-medium">
                        {session.date}
                        <br />
                        <span className="text-klo-muted font-normal">
                          {session.time}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-klo-muted text-xs mb-0.5">
                        Access Level
                      </dt>
                      <dd>
                        <TierBadge tier={session.tier} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-klo-muted text-xs mb-0.5">
                        Discussion
                      </dt>
                      <dd className="text-klo-text font-medium">
                        {comments.length} comments
                      </dd>
                    </div>
                  </dl>
                </Card>

                {/* Related Sessions */}
                {related.length > 0 && (
                  <div>
                    <h3 className="font-display text-sm font-bold text-klo-text mb-3 uppercase tracking-wider">
                      Related Sessions
                    </h3>
                    <div className="space-y-3">
                      {related.map((s) => (
                        <RelatedSessionCard key={s.id} session={s} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Back CTA */}
                <Button
                  variant="ghost"
                  size="sm"
                  href="/strategy-rooms"
                  className="w-full"
                >
                  <ArrowRight size={14} className="rotate-180" />
                  All Strategy Rooms
                </Button>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
