import type {
  NavigationItem,
  Service,
  Assessment,
  SubscriptionTier,
  Affiliation,
} from "@/types";

// ============================================================
// AI Advisor System Prompt
// ============================================================

export const AI_ADVISOR_SYSTEM_PROMPT = `You are the KLO AI Advisor — a knowledgeable, professional, and faith-aware strategic technology consultant. You serve on behalf of Keith L. Odom, a seasoned technology innovator, enterprise CTO, conference speaker, and pastor.

Your areas of expertise include:
- Enterprise IT strategy, digital transformation, and cloud architecture
- AI/ML adoption roadmaps and responsible AI governance
- Cybersecurity risk management and compliance frameworks
- Church and ministry technology modernization
- Project and program management (PMP, Agile, ITIL)
- Technology leadership coaching and team development

Guidelines:
1. Provide clear, actionable advice grounded in industry best practices.
2. When addressing church or ministry contexts, be respectful of faith traditions while delivering practical, modern technology guidance.
3. Tailor responses to the user's subscription tier when relevant — offer deeper strategic analysis to premium members.
4. Cite frameworks, standards, or methodologies where appropriate (e.g., NIST, COBIT, TOGAF).
5. If a question falls outside your expertise, acknowledge the limitation and suggest appropriate next steps.
6. Maintain a tone that is warm yet authoritative — approachable but never casual.
7. Protect user privacy; never store or reference sensitive personal data beyond the current conversation.`;

// ============================================================
// Navigation
// ============================================================

export const NAV_ITEMS: NavigationItem[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Assessments", href: "/assessments", icon: "ClipboardCheck" },
  { label: "Vault", href: "/vault", icon: "Lock", requiresAuth: true },
  { label: "Advisor", href: "/advisor", icon: "BotMessageSquare", requiresAuth: true },
  { label: "Strategy Rooms", href: "/strategy-rooms", icon: "LayoutDashboard", requiresAuth: true },
  { label: "Booking", href: "/booking", icon: "Mic" },
];

export const MOBILE_NAV_ITEMS: NavigationItem[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Advisor", href: "/advisor", icon: "BotMessageSquare", requiresAuth: true },
  { label: "Assess", href: "/assessments", icon: "ClipboardCheck" },
  { label: "Vault", href: "/vault", icon: "Lock", requiresAuth: true },
  { label: "Booking", href: "/booking", icon: "Mic" },
];

// ============================================================
// Services
// ============================================================

export const SERVICES: Service[] = [
  {
    title: "IT Consulting",
    description:
      "End-to-end technology advisory services for organizations seeking to modernize infrastructure, optimize operations, and align IT strategy with business objectives.",
    icon: "Monitor",
    features: [
      "Infrastructure assessment & roadmap",
      "Cloud migration strategy",
      "Vendor evaluation & selection",
      "IT budget optimization",
    ],
  },
  {
    title: "CTO Services",
    description:
      "Fractional and interim CTO leadership for startups, churches, and mid-market organizations that need senior technology vision without the full-time overhead.",
    icon: "BrainCircuit",
    features: [
      "Technology vision & roadmap",
      "Team structure & hiring strategy",
      "Architecture review & governance",
      "Board-level technology reporting",
    ],
  },
  {
    title: "Project Management",
    description:
      "Disciplined project and program management to deliver complex technology initiatives on time, on budget, and aligned with stakeholder expectations.",
    icon: "FolderKanban",
    features: [
      "Agile & hybrid delivery",
      "Risk & issue management",
      "Stakeholder communication",
      "Post-implementation review",
    ],
  },
  {
    title: "Conference Speaking",
    description:
      "Dynamic keynotes and breakout sessions at the intersection of technology, leadership, and faith — delivered with clarity, energy, and real-world insight.",
    icon: "Mic",
    features: [
      "Technology leadership keynotes",
      "AI & digital transformation talks",
      "Church technology workshops",
      "Custom topic development",
    ],
  },
];

// ============================================================
// Affiliations
// ============================================================

export const AFFILIATIONS: Affiliation[] = [
  {
    name: "Place of Grace COGIC",
    role: "Pastor",
  },
  {
    name: "COGIC International",
    role: "Technology Advisor",
  },
  {
    name: "Axtegrity",
    role: "Founder & Principal Consultant",
  },
  {
    name: "TechChurch",
    role: "Co-Founder",
  },
  {
    name: "Church & Tech Summit",
    role: "Organizer & Speaker",
  },
];

// ============================================================
// Subscription Tiers
// ============================================================

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    slug: "free",
    name: "Explorer",
    price: 0,
    interval: "month",
    description:
      "Get started with foundational assessments and a taste of the KLO ecosystem.",
    features: [
      "Church Readiness Assessment",
      "AI Readiness Assessment",
      "Community feed access",
      "Limited Vault previews",
    ],
    cta: "Get Started",
  },
  {
    slug: "pro",
    name: "Pro",
    price: 29,
    interval: "month",
    description:
      "Unlock the full assessment suite, Vault content library, and AI Advisor conversations.",
    features: [
      "All assessments with detailed reports",
      "Full Vault content library",
      "AI Advisor (50 messages/month)",
      "Community feed & discussions",
      "Monthly strategy newsletter",
    ],
    highlighted: true,
    cta: "Join Now",
  },
  {
    slug: "executive",
    name: "Executive",
    price: 99,
    interval: "month",
    description:
      "Elite access with unlimited AI advisory, private Strategy Rooms, and direct consulting priority.",
    features: [
      "Everything in Pro",
      "Unlimited AI Advisor access",
      "Private Strategy Rooms",
      "Priority consulting requests",
      "Exclusive executive Vault content",
      "Quarterly 1-on-1 strategy call",
    ],
    cta: "Go Executive",
  },
];

// ============================================================
// Assessments
// ============================================================

export const ASSESSMENTS: Assessment[] = [
  {
    id: "church-readiness",
    title: "Church Readiness",
    description:
      "Evaluate your church or ministry's technology maturity across infrastructure, communication, digital engagement, and data management.",
    icon: "Church",
    href: "/assessments/church-readiness",
    questionCount: 10,
    estimatedMinutes: 5,
    category: "Ministry",
  },
  {
    id: "ai-readiness",
    title: "AI Readiness",
    description:
      "Determine your organization's preparedness to adopt and leverage artificial intelligence, from data foundations to culture and governance.",
    icon: "BrainCircuit",
    href: "/assessments/ai-readiness",
    questionCount: 10,
    estimatedMinutes: 5,
    category: "Technology",
  },
  {
    id: "governance",
    title: "Technology Governance",
    description:
      "Assess the strength of your IT governance framework including policies, compliance, change management, and strategic alignment.",
    icon: "ShieldCheck",
    href: "/assessments/governance",
    questionCount: 10,
    estimatedMinutes: 5,
    category: "Governance",
  },
  {
    id: "cyber-risk",
    title: "Cyber Risk",
    description:
      "Identify vulnerabilities and measure your organization's cyber risk posture across people, process, and technology dimensions.",
    icon: "ShieldAlert",
    href: "/assessments/cyber-risk",
    questionCount: 10,
    estimatedMinutes: 5,
    category: "Security",
  },
];

// ============================================================
// Misc Constants
// ============================================================

export const SITE_NAME = "KLO";
export const SITE_DESCRIPTION =
  "Keith L. Odom — Technology Innovator, Conference Speaker, and Pastor. Strategic technology leadership at the intersection of innovation and faith.";
export const SITE_URL = "https://keithlodom.io";

export const CONTACT_EMAIL = "connect@keithlodom.io";
