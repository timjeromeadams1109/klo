import { z } from "zod";

// ----------------------------------------------------------------
// Shared primitives
// ----------------------------------------------------------------

const uuidSchema = z.string().uuid();
const emailSchema = z.string().email().max(320);
const nonEmptyString = z.string().min(1).max(5000);

// ----------------------------------------------------------------
// Assessment download (PDF, PPTX, DOCX — all share the same shape)
// ----------------------------------------------------------------

export const assessmentDownloadSchema = z.object({
  title: z.string().max(500).optional(),
  score: z.number(),
  maxScore: z.number(),
  percentage: z.number().min(0).max(100),
  recommendations: z.array(z.string().max(2000)).optional(),
});

// ----------------------------------------------------------------
// POST /api/assessments — save assessment result
// ----------------------------------------------------------------

export const assessmentSaveSchema = z.object({
  assessment_type: nonEmptyString,
  score: z.number(),
  answers: z.unknown(), // JSON structure varies per assessment
  recommendations: z.array(z.string()).optional(),
});

// ----------------------------------------------------------------
// POST /api/ai-advisor
// ----------------------------------------------------------------

export const aiAdvisorSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.string().min(1),
        content: z.string().min(1).max(50000),
      })
    )
    .min(1)
    .max(100),
});

// ----------------------------------------------------------------
// POST /api/auth/register
// ----------------------------------------------------------------

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).max(200),
  full_name: z.string().max(200).optional(),
});

// ----------------------------------------------------------------
// POST /api/stripe/checkout
// ----------------------------------------------------------------

export const stripeCheckoutSchema = z.object({
  priceId: nonEmptyString,
  tier: z.enum(["pro", "executive"]),
});

// ----------------------------------------------------------------
// POST /api/stripe/portal
// ----------------------------------------------------------------

export const stripePortalSchema = z.object({
  customerId: nonEmptyString,
});

// ----------------------------------------------------------------
// Push notifications
// ----------------------------------------------------------------

export const pushSendSchema = z.object({
  title: nonEmptyString,
  body: nonEmptyString,
  url: z.string().max(2000).optional(),
  tag: z.string().max(200).optional(),
  userId: z.string().optional(),
  userIds: z.array(z.string()).optional(),
});

export const pushSubscribeSchema = z.object({
  platform: z.enum(["web", "ios", "android"]),
  token: z.unknown(), // web push token can be object or string
  userAgent: z.string().max(500).optional(),
});

export const pushUnsubscribeSchema = z.object({
  token: z.unknown(), // can be object or string
});

// ----------------------------------------------------------------
// Admin: changelog
// ----------------------------------------------------------------

export const changelogCreateSchema = z.object({
  version: nonEmptyString,
  title: nonEmptyString,
  description: z.string().max(5000).optional(),
  type: z.string().max(50).optional(),
});

export const changelogDeleteSchema = z.object({
  id: uuidSchema,
});

// ----------------------------------------------------------------
// Admin: inquiries PATCH
// ----------------------------------------------------------------

export const inquiryUpdateSchema = z.object({
  id: uuidSchema,
  status: z.enum(["new", "reviewed", "contacted", "archived"]),
});

// ----------------------------------------------------------------
// Admin: activity log
// ----------------------------------------------------------------

export const activityLogSchema = z.object({
  action: nonEmptyString,
  entity_type: nonEmptyString,
  entity_id: z.string().optional(),
  details: z.string().max(5000).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ----------------------------------------------------------------
// Admin: events POST
// ----------------------------------------------------------------

export const adminEventCreateSchema = z.object({
  title: nonEmptyString,
  conference_name: nonEmptyString,
  conference_location: nonEmptyString,
  event_category: z.string().max(100).optional(),
  description: z.string().max(10000).optional(),
  event_date: nonEmptyString,
  event_time: z.string().max(50).optional(),
  event_timezone: z.string().max(100).optional(),
  website_url: z.string().url().max(2000).optional().or(z.literal("")),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  notes: z.string().max(10000).optional(),
  session_name: z.string().max(500).optional(),
  room_location: z.string().max(500).optional(),
  is_guest_presenter: z.boolean().optional(),
  session_end_time: z.string().max(50).optional(),
});

// ----------------------------------------------------------------
// Admin: events [id] PUT
// ----------------------------------------------------------------

export const adminEventUpdateSchema = z.object({
  title: z.string().max(500).optional(),
  description: z.string().max(10000).optional(),
  conference_name: z.string().max(500).optional(),
  conference_location: z.string().max(500).optional(),
  event_category: z.string().max(100).optional(),
  event_date: z.string().optional(),
  event_time: z.string().max(50).optional(),
  event_timezone: z.string().max(100).optional(),
  is_published: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  slug: z.string().max(500).optional(),
  access_code: z.string().max(50).optional(),
  seminar_mode: z.boolean().optional(),
  website_url: z.string().max(2000).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  notes: z.string().max(10000).optional(),
  session_name: z.string().max(500).optional(),
  room_location: z.string().max(500).optional(),
  is_guest_presenter: z.boolean().optional(),
  session_end_time: z.string().max(50).optional(),
  event_status: z.string().max(50).optional(),
  event_status_override: z.string().max(50).optional(),
  display_name_mode: z.string().max(50).optional(),
  show_countdown: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

// ----------------------------------------------------------------
// Admin: presentations
// ----------------------------------------------------------------

export const presentationCreateSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  category: z.string().max(200).optional(),
});

export const presentationUpdateSchema = z.object({
  title: z.string().max(500).optional(),
  description: z.string().max(5000).optional(),
  category: z.string().max(200).optional(),
  is_published: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

// ----------------------------------------------------------------
// Admin: marketing social queue
// ----------------------------------------------------------------

export const socialQueueCreateSchema = z.object({
  event_id: z.string().optional(),
  platform: z.string().max(50).optional(),
  content: z.string().max(10000).optional(),
  hashtags: z.array(z.string().max(100)).optional(),
  scheduled_for: z.string().optional(),
  auto_generate: z.boolean().optional(),
});

export const socialQueueUpdateSchema = z.object({
  status: z.string().max(50).optional(),
  content: z.string().max(10000).optional(),
  hashtags: z.array(z.string().max(100)).optional(),
  platform: z.string().max(50).optional(),
  scheduled_for: z.string().optional(),
  posted_at: z.string().optional(),
  posted_url: z.string().max(2000).optional(),
});

// ----------------------------------------------------------------
// Admin: assessments DELETE
// ----------------------------------------------------------------

export const assessmentDeleteSchema = z.object({
  ids: z.array(uuidSchema).optional(),
});

// ----------------------------------------------------------------
// Conference: guest sign-in
// ----------------------------------------------------------------

export const guestSigninSchema = z.object({
  display_name: z.string().min(1).max(200),
  access_code: z.string().min(1).max(50),
});

// ----------------------------------------------------------------
// Conference: word cloud POST
// ----------------------------------------------------------------

export const wordCloudSubmitSchema = z.object({
  word: z.string().min(1).max(30),
  event_id: z.string().optional(),
});

// ----------------------------------------------------------------
// Conference: announcements POST
// ----------------------------------------------------------------

export const announcementCreateSchema = z.object({
  title: z.string().min(1).max(500),
  message: z.string().min(1).max(5000),
  event_id: z.string().optional(),
});

// ----------------------------------------------------------------
// Conference: roles POST
// ----------------------------------------------------------------

export const roleAssignSchema = z.object({
  user_id: nonEmptyString,
  session_id: z.string().optional(),
  role: z.enum(["admin", "moderator", "presenter", "attendee"]),
});

// ----------------------------------------------------------------
// Conference: polls POST
// ----------------------------------------------------------------

const singlePollQuestion = z.object({
  question: z.string().min(1).max(2000),
  options: z.array(z.string().max(500)).min(2).max(20),
});

export const pollCreateSchema = z.object({
  question: z.string().max(2000).optional(),
  options: z.array(z.string().max(500)).optional(),
  questions: z.array(singlePollQuestion).max(20).optional(),
  session_id: z.string().optional(),
  event_id: z.string().optional(),
});

// ----------------------------------------------------------------
// Conference: polls [id] PUT
// ----------------------------------------------------------------

export const pollUpdateSchema = z.object({
  is_active: z.boolean().optional(),
  show_results: z.boolean().optional(),
});

// ----------------------------------------------------------------
// Conference: polls [id] vote
// ----------------------------------------------------------------

export const pollVoteSchema = z.object({
  option_index: z.number().int().min(0),
  voter_id: z.string().min(16).max(64),
});

// ----------------------------------------------------------------
// Conference: polls export
// ----------------------------------------------------------------

const pollDataSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  votes: z.array(z.number()),
  totalVotes: z.number(),
});

export const pollExportSchema = z.object({
  polls: z.array(pollDataSchema).min(1),
});

// ----------------------------------------------------------------
// Conference: questions POST
// ----------------------------------------------------------------

export const questionSubmitSchema = z.object({
  text: z.string().min(1).max(2000),
  author_name: z.string().max(200).optional(),
  session_id: z.string().optional(),
});

// ----------------------------------------------------------------
// Conference: questions [id] PUT
// ----------------------------------------------------------------

export const questionUpdateSchema = z.object({
  is_answered: z.boolean().optional(),
  is_hidden: z.boolean().optional(),
  released: z.boolean().optional(),
  archive: z.boolean().optional(),
});

// ----------------------------------------------------------------
// Conference: sessions POST
// ----------------------------------------------------------------

export const sessionCreateSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  scheduled_at: z.string().optional(),
  qa_enabled: z.boolean().optional(),
  release_mode: z.string().max(50).optional(),
  speaker: z.string().max(200).optional(),
  room: z.string().max(200).optional(),
  time_label: z.string().max(200).optional(),
  sort_order: z.number().int().optional(),
  event_id: z.string().optional(),
});

// ----------------------------------------------------------------
// Conference: sessions [id] PUT
// ----------------------------------------------------------------

export const sessionUpdateSchema = z.object({
  title: z.string().max(500).optional(),
  description: z.string().max(5000).optional(),
  scheduled_at: z.string().optional(),
  is_active: z.boolean().optional(),
  qa_enabled: z.boolean().optional(),
  release_mode: z.string().max(50).optional(),
  speaker: z.string().max(200).optional(),
  room: z.string().max(200).optional(),
  time_label: z.string().max(200).optional(),
  sort_order: z.number().int().optional(),
});

// ----------------------------------------------------------------
// Conference: profanity POST
// ----------------------------------------------------------------

export const profanityTermSchema = z.object({
  term: z.string().min(1).max(200),
});

// ----------------------------------------------------------------
// Conference: settings PUT
// ----------------------------------------------------------------

export const conferenceSettingsUpdateSchema = z.object({
  key: z.string().max(200).optional(),
  value: z.string().max(10000).optional(),
  active: z.boolean().optional(),
  event_id: z.string().optional(),
  session_id: z.string().optional(),
  qa_enabled: z.boolean().optional(),
  release_mode: z.string().max(50).optional(),
});

// ----------------------------------------------------------------
// Conference: session-attendance POST/DELETE
// ----------------------------------------------------------------

export const sessionAttendanceSchema = z.object({
  session_id: nonEmptyString,
});

// ----------------------------------------------------------------
// Maven webhook POST
// ----------------------------------------------------------------

export const mavenWebhookSchema = z.object({
  type: z.enum(["bug_report", "feature_request", "feedback", "change_request"]),
  title: nonEmptyString,
  description: nonEmptyString,
  priority: z.enum(["low", "normal", "high", "urgent"]).optional(),
  email: emailSchema.optional(),
  project: z.string().max(200).optional(),
});

// ----------------------------------------------------------------
// Contact form — already has manual validation, but we add Zod
// for consistency. The existing validateForm/validateConsultForm
// are preserved; Zod runs first as a quick structural check.
// ----------------------------------------------------------------

export const contactBookingSchema = z.object({
  type: z.literal("booking").optional(),
  name: z.string().min(2).max(200),
  email: emailSchema,
  organization: z.string().max(500).optional(),
  eventName: z.string().min(2).max(500),
  eventDate: z.string().max(50).optional(),
  eventType: nonEmptyString,
  message: z.string().max(10000).optional(),
  budgetRange: z.string().max(200).optional(),
  audienceSize: z.string().max(200).optional(),
});

export const contactConsultationSchema = z.object({
  type: z.literal("consultation"),
  firstName: z.string().min(2).max(200),
  lastName: z.string().min(2).max(200),
  email: emailSchema,
  phone: nonEmptyString,
  industry: nonEmptyString,
  location: z.string().max(500).optional(),
  areaOfInterest: nonEmptyString,
  organizationName: nonEmptyString,
  organizationSize: z.string().max(200).optional(),
  currentChallenge: z.string().max(10000).optional(),
  additionalDetails: z.string().max(10000).optional(),
});

export const contactFormSchema = z.discriminatedUnion("type", [
  contactConsultationSchema,
  contactBookingSchema.extend({ type: z.literal("booking") }),
]);
