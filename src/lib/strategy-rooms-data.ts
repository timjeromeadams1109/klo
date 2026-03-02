// ── Strategy Rooms Mock Data ──────────────────────────────────────────────────

export type Tier = "pro" | "executive";

export interface StrategySession {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  facilitator: string;
  totalSeats: number;
  registeredCount: number;
  isPast: boolean;
  replayUrl?: string;
  notesUrl?: string;
  tier: Tier;
  topics: string[];
  discussionCount: number;
  attendees?: number;
  agenda?: AgendaItem[];
  keyTakeaways?: string[];
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface DiscussionComment {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  timestamp: string;
  likes: number;
}

// ── Upcoming Sessions ────────────────────────────────────────────────────────

const upcomingSessions: StrategySession[] = [
  {
    id: "ai-governance-faith",
    title: "AI Governance for Faith Organizations",
    description:
      "Explore responsible AI adoption frameworks tailored for faith-based organizations. This session covers ethical AI policies, risk management, and governance structures that align technology decisions with your mission and values.",
    date: "April 15, 2026",
    time: "2:00 PM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 20,
    registeredCount: 12,
    isPast: false,
    tier: "executive",
    topics: ["AI Governance", "Ethics", "Faith Organizations", "Policy"],
    discussionCount: 7,
    agenda: [
      {
        time: "2:00 PM",
        title: "Welcome & Landscape Overview",
        description:
          "Current state of AI adoption in faith-based organizations.",
      },
      {
        time: "2:20 PM",
        title: "Ethical Frameworks for AI",
        description:
          "Building governance policies that align with organizational values.",
      },
      {
        time: "2:50 PM",
        title: "Risk Assessment Workshop",
        description:
          "Hands-on exercise identifying and mitigating AI risks.",
      },
      {
        time: "3:20 PM",
        title: "Implementation Roadmap",
        description:
          "Practical steps to build your AI governance structure.",
      },
      {
        time: "3:45 PM",
        title: "Q&A and Next Steps",
        description: "Open discussion and action planning.",
      },
    ],
  },
  {
    id: "digital-transformation-workshop",
    title: "Digital Transformation Roadmapping Workshop",
    description:
      "A hands-on workshop where leaders map out a 12-month digital transformation plan. You will leave with a prioritized roadmap, budget framework, and implementation timeline customized to your organization.",
    date: "April 29, 2026",
    time: "1:00 PM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 15,
    registeredCount: 8,
    isPast: false,
    tier: "pro",
    topics: [
      "Digital Transformation",
      "Roadmapping",
      "Budgeting",
      "Change Management",
    ],
    discussionCount: 4,
    agenda: [
      {
        time: "1:00 PM",
        title: "Assessment & Benchmarking",
        description: "Evaluate your current digital maturity level.",
      },
      {
        time: "1:25 PM",
        title: "Vision Setting",
        description: "Define your 12-month digital transformation vision.",
      },
      {
        time: "1:55 PM",
        title: "Roadmap Workshop",
        description:
          "Collaborative exercise to build your prioritized roadmap.",
      },
      {
        time: "2:30 PM",
        title: "Budget & Resource Planning",
        description: "Align your roadmap with realistic budgets.",
      },
      {
        time: "3:00 PM",
        title: "Wrap-up & Commitments",
        description: "Share plans and commit to accountability milestones.",
      },
    ],
  },
  {
    id: "cybersecurity-small-orgs",
    title: "Cybersecurity Strategy for Small Organizations",
    description:
      "Learn how to build a robust cybersecurity posture without enterprise-level budgets. Covers threat landscape, affordable security tools, staff training, and incident response planning for organizations with limited IT resources.",
    date: "May 10, 2026",
    time: "11:00 AM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 25,
    registeredCount: 5,
    isPast: false,
    tier: "pro",
    topics: [
      "Cybersecurity",
      "Small Organizations",
      "Incident Response",
      "Training",
    ],
    discussionCount: 2,
    agenda: [
      {
        time: "11:00 AM",
        title: "Threat Landscape Briefing",
        description: "Understanding the threats facing small organizations.",
      },
      {
        time: "11:20 AM",
        title: "Security Stack on a Budget",
        description:
          "Affordable tools and platforms for small teams.",
      },
      {
        time: "11:50 AM",
        title: "Staff Awareness Training",
        description:
          "Building a security-first culture in your organization.",
      },
      {
        time: "12:15 PM",
        title: "Incident Response Planning",
        description:
          "Creating a response plan you can actually execute.",
      },
      {
        time: "12:40 PM",
        title: "Open Discussion",
        description: "Peer-to-peer sharing and Q&A.",
      },
    ],
  },
  {
    id: "future-church-tech-2027",
    title: "The Future of Church Technology: 2027 and Beyond",
    description:
      "A forward-looking session exploring emerging technologies shaping ministry in the next 3-5 years. From AI-powered pastoral tools to immersive worship experiences, discover what is on the horizon and how to prepare your organization.",
    date: "May 22, 2026",
    time: "3:00 PM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 30,
    registeredCount: 18,
    isPast: false,
    tier: "executive",
    topics: [
      "Church Technology",
      "Emerging Tech",
      "AI Ministry",
      "Innovation",
    ],
    discussionCount: 11,
    agenda: [
      {
        time: "3:00 PM",
        title: "State of Church Technology",
        description: "Where we are and where we are headed.",
      },
      {
        time: "3:20 PM",
        title: "AI in Ministry",
        description: "Practical AI applications for churches and ministries.",
      },
      {
        time: "3:45 PM",
        title: "Immersive Worship Tech",
        description: "AR, VR, and spatial computing for worship.",
      },
      {
        time: "4:10 PM",
        title: "Data & Analytics for Growth",
        description: "Leveraging data to drive ministry impact.",
      },
      {
        time: "4:35 PM",
        title: "Panel Discussion",
        description: "Interactive panel with technology leaders.",
      },
    ],
  },
];

// ── Past Sessions ────────────────────────────────────────────────────────────

const pastSessions: StrategySession[] = [
  {
    id: "ai-ready-org",
    title: "Building an AI-Ready Organization",
    description:
      "This session equipped leaders with frameworks for preparing their organizations for AI adoption, covering culture, data readiness, and practical implementation strategies.",
    date: "February 20, 2026",
    time: "2:00 PM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 25,
    registeredCount: 22,
    isPast: true,
    replayUrl: "#replay-ai-ready",
    notesUrl: "#notes-ai-ready",
    tier: "executive",
    topics: ["AI Readiness", "Culture", "Data Strategy", "Implementation"],
    discussionCount: 14,
    attendees: 22,
    keyTakeaways: [
      "AI readiness starts with data hygiene, not technology purchases.",
      "Organizations need a cross-functional AI steering committee.",
      "Start with low-risk, high-visibility pilot projects to build momentum.",
      "Staff training and change management are the biggest success factors.",
      "Measure AI impact with mission-aligned KPIs, not just efficiency metrics.",
    ],
  },
  {
    id: "tech-governance-masterclass",
    title: "Technology Governance Masterclass",
    description:
      "A deep dive into building technology governance structures that ensure accountability, security, and strategic alignment across your organization.",
    date: "January 15, 2026",
    time: "1:00 PM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 20,
    registeredCount: 18,
    isPast: true,
    replayUrl: "#replay-tech-governance",
    notesUrl: "#notes-tech-governance",
    tier: "pro",
    topics: [
      "Governance",
      "Compliance",
      "Strategic Alignment",
      "Accountability",
    ],
    discussionCount: 9,
    attendees: 18,
    keyTakeaways: [
      "Governance is not bureaucracy; it is strategic enablement.",
      "Define clear roles: who owns technology decisions at each level.",
      "Regular technology audits prevent shadow IT and security gaps.",
      "Align governance policies with organizational mission and risk tolerance.",
    ],
  },
  {
    id: "ministry-digital-strategy",
    title: "Ministry Digital Strategy Deep Dive",
    description:
      "An interactive session exploring how ministries can develop comprehensive digital strategies that enhance outreach, engagement, and operational effectiveness.",
    date: "December 10, 2025",
    time: "2:00 PM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 18,
    registeredCount: 15,
    isPast: true,
    replayUrl: "#replay-ministry-digital",
    notesUrl: "#notes-ministry-digital",
    tier: "executive",
    topics: [
      "Ministry",
      "Digital Strategy",
      "Outreach",
      "Engagement",
    ],
    discussionCount: 12,
    attendees: 15,
    keyTakeaways: [
      "Digital strategy must serve the mission, not replace personal connection.",
      "Multichannel engagement requires consistent messaging and branding.",
      "Analytics reveal which digital touchpoints drive the most engagement.",
      "Invest in training staff to use digital tools effectively.",
    ],
  },
  {
    id: "executive-cyber-briefing",
    title: "Executive Cybersecurity Briefing",
    description:
      "A concise, executive-level briefing on the current cybersecurity threat landscape and practical steps leaders can take to protect their organizations.",
    date: "November 8, 2025",
    time: "11:00 AM EST",
    facilitator: "Keith L. Odom",
    totalSeats: 25,
    registeredCount: 20,
    isPast: true,
    replayUrl: "#replay-exec-cyber",
    notesUrl: "#notes-exec-cyber",
    tier: "pro",
    topics: [
      "Cybersecurity",
      "Executive Briefing",
      "Threat Landscape",
      "Risk Management",
    ],
    discussionCount: 8,
    attendees: 20,
    keyTakeaways: [
      "Phishing remains the number one attack vector for small organizations.",
      "Multi-factor authentication is non-negotiable for all systems.",
      "Cyber insurance requirements are tightening; start the process early.",
      "Incident response plans must be tested, not just documented.",
      "Board-level cybersecurity literacy is now a fiduciary responsibility.",
    ],
  },
];

// ── Discussion Comments ──────────────────────────────────────────────────────

export const sampleDiscussionComments: DiscussionComment[] = [
  {
    id: "dc-1",
    author: "Marcus Thompson",
    authorInitials: "MT",
    content:
      "Really looking forward to this session. Our church just started exploring AI tools and we need a governance framework before things get out of hand.",
    timestamp: "2 days ago",
    likes: 8,
  },
  {
    id: "dc-2",
    author: "Rev. Patricia Coleman",
    authorInitials: "PC",
    content:
      "Can we discuss how to handle congregation concerns about AI? We have had pushback from members who see it as conflicting with faith values.",
    timestamp: "2 days ago",
    likes: 12,
  },
  {
    id: "dc-3",
    author: "David Kim",
    authorInitials: "DK",
    content:
      "Has anyone implemented an AI usage policy at their organization yet? Would love to see examples during the session.",
    timestamp: "1 day ago",
    likes: 6,
  },
  {
    id: "dc-4",
    author: "Sarah Mitchell",
    authorInitials: "SM",
    content:
      "Keith, will you be covering the ethical implications of using AI for pastoral care and counseling? That is a huge topic for us.",
    timestamp: "1 day ago",
    likes: 15,
  },
  {
    id: "dc-5",
    author: "Keith L. Odom",
    authorInitials: "KO",
    content:
      "Great questions from everyone. Yes, we will absolutely cover AI ethics in pastoral contexts and I will share policy templates you can adapt. Bring your specific scenarios!",
    timestamp: "1 day ago",
    likes: 22,
  },
  {
    id: "dc-6",
    author: "Anthony Brooks",
    authorInitials: "AB",
    content:
      "Our denomination is developing AI guidelines at the national level. Happy to share what we have so far as a starting point for discussion.",
    timestamp: "18 hours ago",
    likes: 9,
  },
  {
    id: "dc-7",
    author: "Lisa Chen",
    authorInitials: "LC",
    content:
      "I work in nonprofit tech and many of these AI governance principles apply across sectors. Excited to bring a cross-industry perspective.",
    timestamp: "14 hours ago",
    likes: 5,
  },
  {
    id: "dc-8",
    author: "Rev. James Washington",
    authorInitials: "JW",
    content:
      "We are a small church with limited tech staff. Will this session address governance for organizations that do not have a dedicated IT team?",
    timestamp: "10 hours ago",
    likes: 11,
  },
  {
    id: "dc-9",
    author: "Nicole Ramirez",
    authorInitials: "NR",
    content:
      "Just registered! The intersection of AI and faith leadership is exactly the kind of strategic thinking we need more of in this space.",
    timestamp: "6 hours ago",
    likes: 7,
  },
  {
    id: "dc-10",
    author: "Michael Foster",
    authorInitials: "MF",
    content:
      "Can we talk about vendor evaluation? So many AI tools are popping up claiming to be built for churches and I am not sure which ones to trust.",
    timestamp: "3 hours ago",
    likes: 4,
  },
  {
    id: "dc-11",
    author: "Tanya Williams",
    authorInitials: "TW",
    content:
      "This is so timely. We just had a board meeting where AI governance was raised as a priority. Sharing this session with our entire leadership team.",
    timestamp: "1 hour ago",
    likes: 3,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getAllSessions(): StrategySession[] {
  return [...upcomingSessions, ...pastSessions];
}

export function getUpcomingSessions(): StrategySession[] {
  return upcomingSessions;
}

export function getPastSessions(): StrategySession[] {
  return pastSessions;
}

export function getSessionById(id: string): StrategySession | undefined {
  return getAllSessions().find((s) => s.id === id);
}

export function getRelatedSessions(
  currentId: string,
  limit = 3
): StrategySession[] {
  const current = getSessionById(currentId);
  if (!current) return [];

  const all = getAllSessions().filter((s) => s.id !== currentId);
  // Score by shared topics
  const scored = all.map((session) => {
    const shared = session.topics.filter((t) =>
      current.topics.includes(t)
    ).length;
    return { session, score: shared };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.session);
}
