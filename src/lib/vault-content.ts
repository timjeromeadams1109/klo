export interface VaultTakeaway {
  icon: string;
  title: string;
  description: string;
}

export interface VaultQuote {
  text: string;
  attribution: string;
}

export interface VaultStep {
  number: number;
  title: string;
  description: string;
}

export interface VaultCallout {
  type: "info" | "warning" | "tip" | "example";
  title: string;
  body: string;
}

export interface VaultItemContent {
  heroSubtitle: string;
  overview: string;
  takeaways: VaultTakeaway[];
  quote: VaultQuote;
  steps: VaultStep[];
  callouts: VaultCallout[];
  conclusion: string;
}

const vaultContent: Record<string, VaultItemContent> = {
  "v-001": {
    heroSubtitle:
      "A plain-language roadmap for faith leaders ready to embrace AI with wisdom and confidence.",
    overview:
      "Artificial intelligence is no longer a future concept — it is already reshaping how organizations communicate, operate, and serve their communities. For pastors and church leaders, the question is not whether AI will impact your ministry, but how you will lead your congregation through this transformation.\n\nThis guide cuts through the hype to give you a grounded, practical understanding of what AI can and cannot do. You will learn how to evaluate AI tools through the lens of your ministry's mission, communicate technology changes to your congregation without creating anxiety, and build a culture of thoughtful innovation.\n\nWhether you are considering AI-powered communication tools, automated administrative systems, or data-driven outreach strategies, this briefing equips you with the vocabulary, frameworks, and confidence to lead the conversation.",
    takeaways: [
      {
        icon: "brain",
        title: "Understand AI Fundamentals",
        description:
          "Learn what AI actually is — and what it is not — in language that connects with ministry context and congregational concerns.",
      },
      {
        icon: "shield",
        title: "Evaluate Tools Wisely",
        description:
          "Apply a practical evaluation framework to assess whether an AI tool aligns with your ministry's values, budget, and technical capacity.",
      },
      {
        icon: "users",
        title: "Communicate Change Effectively",
        description:
          "Use proven communication strategies to introduce technology initiatives without alienating members who may be hesitant or fearful.",
      },
      {
        icon: "target",
        title: "Start with Quick Wins",
        description:
          "Identify low-risk, high-impact opportunities to introduce AI in ways that build confidence and demonstrate tangible value.",
      },
    ],
    quote: {
      text: "The organizations that thrive in the age of AI are not the ones with the biggest budgets. They are the ones with the clearest sense of purpose.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Assess Your Current State",
        description:
          "Inventory your existing tools, workflows, and pain points. Identify where your team spends the most time on repetitive tasks that could benefit from automation.",
      },
      {
        number: 2,
        title: "Define Your Ministry's AI Vision",
        description:
          "Articulate what responsible AI adoption looks like for your specific context. Set boundaries and principles before evaluating any tools.",
      },
      {
        number: 3,
        title: "Select a Pilot Project",
        description:
          "Choose one low-risk area to begin — such as email automation, sermon transcription, or visitor follow-up — and run a 30-day pilot.",
      },
      {
        number: 4,
        title: "Gather Feedback & Iterate",
        description:
          "Collect input from staff and volunteers involved in the pilot. Document what worked, what did not, and what you learned about your team's readiness.",
      },
      {
        number: 5,
        title: "Communicate & Scale",
        description:
          "Share results with your congregation transparently. Use the pilot's success to build support for broader adoption.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Start Small, Think Big",
        body: "You do not need a technology budget to begin. Many powerful AI tools offer free tiers that are more than sufficient for initial exploration. The most important investment is time and intentionality.",
      },
      {
        type: "info",
        title: "Privacy First",
        body: "Before adopting any AI tool, review its data handling policies. Ensure it complies with your congregation's expectations around privacy, especially for sensitive pastoral communications.",
      },
    ],
    conclusion:
      "AI adoption in ministry is not about replacing the human touch — it is about amplifying it. By approaching these tools with wisdom, transparency, and a servant's heart, you can free your team to focus on what matters most: building genuine relationships and serving your community with excellence.",
  },

  "v-002": {
    heroSubtitle:
      "Enterprise-grade governance for organizations deploying AI at scale with accountability and transparency.",
    overview:
      "As AI systems become embedded in critical business processes, the stakes of ungoverned deployment grow exponentially. Data breaches, algorithmic bias, regulatory penalties, and reputational damage are not hypothetical risks — they are documented outcomes of organizations that moved fast without governance guardrails.\n\nThis framework provides the structural foundation enterprise leaders need to deploy AI responsibly. It covers the full governance lifecycle: from risk assessment and policy development through audit protocols and board-level reporting.\n\nDesigned for C-suite leaders and governance professionals, this resource translates complex technical risks into business language, provides ready-to-use templates, and establishes clear accountability structures that scale with your AI portfolio.",
    takeaways: [
      {
        icon: "scale",
        title: "Risk Assessment Matrices",
        description:
          "Quantify and categorize AI risks across operational, reputational, legal, and ethical dimensions with standardized scoring methods.",
      },
      {
        icon: "network",
        title: "Accountability Structures",
        description:
          "Define clear ownership, escalation paths, and decision rights for every AI system in your organization's portfolio.",
      },
      {
        icon: "clipboardCheck",
        title: "Audit Protocols",
        description:
          "Implement systematic review processes including model performance monitoring, bias detection, and compliance verification.",
      },
      {
        icon: "barChart",
        title: "Board-Level Reporting",
        description:
          "Translate technical metrics into executive dashboards that communicate AI risk posture to non-technical stakeholders.",
      },
    ],
    quote: {
      text: "Governance is not the enemy of innovation — it is the foundation that makes sustainable innovation possible.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Inventory All AI Systems",
        description:
          "Create a comprehensive registry of every AI system, model, and automated decision-making tool deployed across your organization.",
      },
      {
        number: 2,
        title: "Classify Risk Levels",
        description:
          "Apply the risk assessment matrix to categorize each system as low, medium, high, or critical risk based on impact and autonomy.",
      },
      {
        number: 3,
        title: "Assign Governance Owners",
        description:
          "Designate accountable individuals for each AI system with clear authority over deployment, monitoring, and decommissioning decisions.",
      },
      {
        number: 4,
        title: "Establish Audit Cadence",
        description:
          "Set review cycles proportional to risk level — quarterly for critical systems, semi-annually for high-risk, annually for lower tiers.",
      },
      {
        number: 5,
        title: "Implement Reporting Pipelines",
        description:
          "Build automated dashboards that surface key governance metrics to the appropriate leadership level on a regular cadence.",
      },
      {
        number: 6,
        title: "Conduct Tabletop Exercises",
        description:
          "Simulate AI failure scenarios to test your incident response procedures and identify gaps before real incidents occur.",
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Regulatory Landscape Is Shifting",
        body: "The EU AI Act, proposed US federal legislation, and emerging state-level regulations mean governance is no longer optional. Organizations without formal AI governance frameworks face increasing legal exposure.",
      },
      {
        type: "example",
        title: "Case Study: Financial Services",
        body: "A mid-size financial services firm reduced AI-related incidents by 73% within 18 months of implementing a structured governance framework similar to this one, while actually accelerating their AI deployment velocity.",
      },
    ],
    conclusion:
      "Effective AI governance is a competitive advantage, not a compliance burden. Organizations that invest in governance infrastructure today will be positioned to deploy AI faster, safer, and with greater stakeholder confidence than those scrambling to catch up with regulatory requirements.",
  },

  "v-003": {
    heroSubtitle:
      "Your step-by-step operational playbook for building a modern, effective digital ministry presence.",
    overview:
      "The digital ministry landscape has evolved dramatically. Congregations expect seamless online experiences, hybrid worship options, and personalized communication — yet many churches struggle with fragmented tools, inconsistent execution, and volunteer burnout.\n\nThis playbook provides the operational infrastructure your church needs to run digital ministry like a well-oiled machine. From social media content calendars and livestream production checklists to CRM integration guides and engagement automation workflows, every template is designed to be implemented by teams of any size.\n\nBuilt from real-world experience across dozens of churches, this resource addresses the practical challenges that technology guides often overlook: volunteer capacity, budget constraints, and the unique rhythms of church life.",
    takeaways: [
      {
        icon: "calendar",
        title: "Content Calendar System",
        description:
          "A 12-month social media calendar template aligned with the church calendar, including post templates and approval workflows.",
      },
      {
        icon: "video",
        title: "Livestream Production Guide",
        description:
          "End-to-end checklists for livestream worship services, from equipment setup through post-stream engagement and archiving.",
      },
      {
        icon: "database",
        title: "CRM Integration Blueprints",
        description:
          "Step-by-step guides for connecting your church management system with communication, giving, and engagement platforms.",
      },
      {
        icon: "zap",
        title: "Automation Workflows",
        description:
          "Pre-built automation recipes for visitor follow-up, prayer request routing, event reminders, and volunteer scheduling.",
      },
    ],
    quote: {
      text: "Digital ministry is not about replacing the personal touch — it is about ensuring no one falls through the cracks.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Audit Your Digital Presence",
        description:
          "Map every digital touchpoint your church currently maintains. Identify redundancies, gaps, and tools that are underutilized or abandoned.",
      },
      {
        number: 2,
        title: "Consolidate Your Tech Stack",
        description:
          "Select a core set of integrated tools that cover your essential needs. Eliminate redundant subscriptions and simplify volunteer training.",
      },
      {
        number: 3,
        title: "Implement the Content System",
        description:
          "Deploy the content calendar template, assign roles, and establish a sustainable rhythm for content creation and approval.",
      },
      {
        number: 4,
        title: "Activate Automation Workflows",
        description:
          "Set up the three highest-impact automations: visitor follow-up, event communication, and volunteer reminders.",
      },
      {
        number: 5,
        title: "Train & Empower Your Team",
        description:
          "Run the included training modules with your staff and volunteers. Establish a buddy system for ongoing support.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Budget-Friendly Options",
        body: "Every tool recommendation in this playbook includes a free or low-cost alternative. Effective digital ministry does not require a large technology budget — it requires intentional systems.",
      },
    ],
    conclusion:
      "A well-run digital ministry extends your church's reach without exhausting your team. By implementing the systems in this playbook, you will create sustainable rhythms that keep your congregation connected, engaged, and cared for — online and offline.",
  },

  "v-004": {
    heroSubtitle:
      "Protect your ministry from digital threats with practical, jargon-free cybersecurity guidance.",
    overview:
      "Churches are increasingly targeted by cybercriminals. With donation processing systems, member databases, and communication platforms handling sensitive information daily, the attack surface for most ministries is larger than leaders realize.\n\nThis video training walks church administrators through the essential cybersecurity practices that protect your ministry without requiring a technical background. Using real-world case studies from faith organizations that experienced breaches, you will understand not just what to do but why each practice matters.\n\nFrom password management and phishing recognition to backup strategies and incident response, this resource transforms cybersecurity from an intimidating technical topic into a manageable set of habits and systems.",
    takeaways: [
      {
        icon: "lock",
        title: "Password & Access Management",
        description:
          "Implement proper password policies, multi-factor authentication, and role-based access controls for all church systems.",
      },
      {
        icon: "mail",
        title: "Phishing Defense Training",
        description:
          "Teach your team to recognize and report phishing attempts using the provided training materials and simulated examples.",
      },
      {
        icon: "hardDrive",
        title: "Backup & Recovery Plans",
        description:
          "Establish automated backup systems and tested recovery procedures so a ransomware attack does not become catastrophic.",
      },
      {
        icon: "alertTriangle",
        title: "Incident Response Protocol",
        description:
          "Know exactly what to do in the first 24 hours of a security incident with the step-by-step response checklist.",
      },
    ],
    quote: {
      text: "The question is not if your church will face a cyber threat, but when. Preparation is the best protection.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Conduct a Security Audit",
        description:
          "Use the included checklist to assess your current security posture across email, financial systems, member databases, and website.",
      },
      {
        number: 2,
        title: "Enable Multi-Factor Authentication",
        description:
          "Roll out MFA on all critical accounts — email, financial, and administrative — within your first week.",
      },
      {
        number: 3,
        title: "Implement Backup Systems",
        description:
          "Set up automated daily backups with at least one off-site copy. Test your restore process to ensure it actually works.",
      },
      {
        number: 4,
        title: "Train Your Team",
        description:
          "Run the phishing awareness training with all staff and key volunteers. Schedule quarterly refresher sessions.",
      },
      {
        number: 5,
        title: "Create Your Incident Response Plan",
        description:
          "Customize the incident response template with your organization's contacts, systems, and communication chains.",
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Real-World Impact",
        body: "In 2025, a mid-size church lost access to all member records and financial data for three weeks after a ransomware attack. The total cost exceeded $45,000 — an expense that proper backup procedures would have prevented entirely.",
      },
      {
        type: "tip",
        title: "Free Tools Available",
        body: "Many enterprise-grade security tools offer free tiers for nonprofits and religious organizations. The resources section includes a curated list of no-cost security solutions.",
      },
    ],
    conclusion:
      "Cybersecurity is stewardship. Protecting the data your congregation entrusts to you is not just a technical responsibility — it is a moral one. The practices in this guide are straightforward, affordable, and essential for every ministry operating in a digital world.",
  },

  "v-005": {
    heroSubtitle:
      "Translate technology investments into business language your board will understand and champion.",
    overview:
      "One of the greatest challenges technology leaders face is communicating the value of their work to non-technical board members. Too often, technology reports devolve into jargon-heavy status updates that fail to connect digital transformation efforts with organizational outcomes.\n\nThis template transforms how you report on technology to your board. It includes pre-built KPI dashboards that visualize the metrics that matter, risk heat maps that communicate exposure without fear-mongering, ROI calculation frameworks that demonstrate return on investment, and narrative structures that tell a compelling story about your technology journey.\n\nDesigned for CIOs, CTOs, and technology leaders who report to governing boards, this resource bridges the communication gap between technical execution and strategic oversight.",
    takeaways: [
      {
        icon: "pieChart",
        title: "KPI Dashboard Templates",
        description:
          "Pre-built visual dashboards that surface the technology metrics your board actually needs to see, organized by strategic priority.",
      },
      {
        icon: "flame",
        title: "Risk Heat Maps",
        description:
          "Visual risk communication tools that translate technical vulnerabilities into business impact language board members understand.",
      },
      {
        icon: "trendingUp",
        title: "ROI Calculation Models",
        description:
          "Standardized frameworks for calculating and presenting the return on technology investments across multiple dimensions.",
      },
      {
        icon: "fileText",
        title: "Narrative Frameworks",
        description:
          "Storytelling templates that connect technology progress to mission outcomes, making your reports memorable and actionable.",
      },
    ],
    quote: {
      text: "Your board does not need to understand your technology. They need to understand what your technology is doing for the mission.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Identify Board Priorities",
        description:
          "Map your board's top strategic priorities and identify which technology initiatives directly support each one.",
      },
      {
        number: 2,
        title: "Select Key Metrics",
        description:
          "Choose 5-7 KPIs that demonstrate technology's contribution to each board priority. Avoid vanity metrics.",
      },
      {
        number: 3,
        title: "Build Your Dashboard",
        description:
          "Populate the dashboard template with your selected metrics. Establish baselines and set targets for the coming quarter.",
      },
      {
        number: 4,
        title: "Draft the Narrative",
        description:
          "Use the narrative framework to write a 2-page executive summary that connects metrics to mission outcomes.",
      },
      {
        number: 5,
        title: "Present & Refine",
        description:
          "Deliver your first enhanced report and gather board feedback. Iterate on format and content based on what resonates.",
      },
    ],
    callouts: [
      {
        type: "example",
        title: "Before & After",
        body: "A nonprofit CTO switched from a 40-slide technical deck to this 6-page narrative format. Board engagement with technology topics increased from 5 minutes of discussion to 25 minutes of strategic dialogue.",
      },
    ],
    conclusion:
      "Great technology reporting does not just inform — it inspires confidence, builds trust, and secures the support your team needs to keep innovating. This template gives you the structure to make every board interaction count.",
  },

  "v-006": {
    heroSubtitle:
      "Navigate the ethical complexities of AI in youth-facing programs with care and confidence.",
    overview:
      "Youth ministry sits at the intersection of two of the most important conversations in technology today: data privacy for minors and the responsible use of AI. As churches and organizations adopt AI-powered tools for education, mentorship, and engagement, the ethical stakes are uniquely high when young people are involved.\n\nThis briefing provides a comprehensive ethical framework for deploying AI tools in youth-facing programs. It addresses the legal landscape around data privacy for minors, the nuances of consent when working with families, the risks of algorithmic bias in educational and developmental contexts, and practical approaches to building digital literacy into your youth curriculum.\n\nWritten for youth pastors, program directors, and organizational leaders, this resource balances the genuine potential of AI to enhance youth engagement with the imperative to protect the young people in your care.",
    takeaways: [
      {
        icon: "shield",
        title: "Minor Data Privacy",
        description:
          "Understand COPPA, state-level privacy laws, and denominational guidelines that govern how you collect and use data from minors.",
      },
      {
        icon: "userCheck",
        title: "Consent Frameworks",
        description:
          "Implement age-appropriate consent processes that respect both parental authority and youth autonomy at different developmental stages.",
      },
      {
        icon: "eye",
        title: "Bias Awareness Training",
        description:
          "Recognize how algorithmic bias can disproportionately affect young people from underrepresented communities in AI-driven programs.",
      },
      {
        icon: "bookOpen",
        title: "Digital Literacy Curriculum",
        description:
          "Integrate AI literacy into your existing youth programming using the modular lesson plans and discussion guides provided.",
      },
    ],
    quote: {
      text: "When it comes to young people and AI, the standard for care is not what is legal — it is what is right.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Audit Youth-Facing Tools",
        description:
          "Catalog every digital tool your youth programs use and assess each one's data collection practices against the privacy checklist.",
      },
      {
        number: 2,
        title: "Update Consent Processes",
        description:
          "Review and revise your consent forms and processes using the templates provided. Ensure parents understand what data is collected and why.",
      },
      {
        number: 3,
        title: "Train Youth Leaders",
        description:
          "Equip your youth leadership team with the knowledge to make ethical technology decisions using the training module included.",
      },
      {
        number: 4,
        title: "Integrate Literacy Modules",
        description:
          "Add the AI literacy curriculum modules to your programming calendar. Start with the foundational session and build from there.",
      },
      {
        number: 5,
        title: "Establish Review Cycles",
        description:
          "Set quarterly reviews to reassess tool compliance, update consent materials, and gather feedback from youth and families.",
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Legal Compliance Is Not Enough",
        body: "Meeting the minimum legal requirements for data privacy does not mean you are meeting your ethical obligations to the families who trust you with their children. Always aim higher than the legal floor.",
      },
    ],
    conclusion:
      "AI tools offer genuine potential to enhance how we engage, educate, and empower young people. But that potential can only be realized when we build on a foundation of ethical clarity, transparent practices, and an unwavering commitment to the wellbeing of every young person in our care.",
  },

  "v-007": {
    heroSubtitle:
      "Master the psychology of change and lead your organization through technological transformation.",
    overview:
      "Digital transformation fails not because of technology — it fails because of people. Research consistently shows that the primary barriers to successful technology adoption are cultural resistance, poor communication, and leadership misalignment, not technical complexity.\n\nThis masterclass equips leaders with the psychological frameworks, communication strategies, and organizational design patterns that separate successful digital transformations from the 70% that fail. Drawing on case studies from both the corporate and nonprofit sectors, you will learn how to read organizational readiness, build coalitions of support, navigate resistance without creating adversaries, and sustain momentum through the inevitable setbacks.\n\nWhether you are leading a church through its first digital overhaul or guiding an enterprise through its third AI wave, the leadership principles in this video apply.",
    takeaways: [
      {
        icon: "brain",
        title: "Change Psychology",
        description:
          "Understand the neuroscience of change resistance and use evidence-based techniques to move people from anxiety to adoption.",
      },
      {
        icon: "messageCircle",
        title: "Strategic Communication",
        description:
          "Master the communication cadences, framing techniques, and storytelling approaches that build support for transformation.",
      },
      {
        icon: "settings",
        title: "Organizational Design",
        description:
          "Structure your teams, incentives, and decision-making processes to support rather than undermine digital transformation.",
      },
      {
        icon: "award",
        title: "Sustaining Momentum",
        description:
          "Learn the milestone management and celebration techniques that keep transformation energy high over multi-year journeys.",
      },
    ],
    quote: {
      text: "People do not resist change — they resist being changed. The leader's job is to make transformation something people choose.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Assess Organizational Readiness",
        description:
          "Use the readiness assessment framework to gauge your organization's capacity for change across leadership, culture, and infrastructure.",
      },
      {
        number: 2,
        title: "Build Your Coalition",
        description:
          "Identify and activate change champions at every level. Map influence networks and neutralize potential blockers early.",
      },
      {
        number: 3,
        title: "Craft the Transformation Narrative",
        description:
          "Develop a compelling story that connects the change to your organization's mission and each stakeholder's personal interests.",
      },
      {
        number: 4,
        title: "Design Quick Wins",
        description:
          "Plan early, visible successes that build confidence and create positive momentum in the first 90 days.",
      },
      {
        number: 5,
        title: "Establish Feedback Loops",
        description:
          "Create structured channels for surfacing concerns, celebrating progress, and adjusting course based on real-time feedback.",
      },
    ],
    callouts: [
      {
        type: "info",
        title: "The 70% Failure Rate",
        body: "Research from McKinsey consistently shows that 70% of digital transformations fail to meet their objectives. The common thread is not technology selection — it is leadership and change management.",
      },
    ],
    conclusion:
      "Leading through digital disruption is ultimately an act of service. When you equip your people to thrive in a changing landscape, you honor both their contributions and your organization's mission. The frameworks in this masterclass will help you lead with empathy, clarity, and resolve.",
  },

  "v-008": {
    heroSubtitle:
      "Get your organization's AI policy off the ground with ready-to-customize templates and guidelines.",
    overview:
      "Every organization using AI needs a policy framework — but building one from scratch is daunting. This starter kit eliminates the blank-page problem by providing comprehensive, professionally drafted templates that you can customize to your organization's specific context and values.\n\nThe kit includes acceptable use policies that define how employees and volunteers can and cannot use AI tools, vendor evaluation checklists for assessing third-party AI solutions, data handling guidelines that protect sensitive information, and incident response procedures for when things go wrong.\n\nDesigned for organizations at the beginning of their AI governance journey, this resource prioritizes clarity and practicality over legal complexity. Each template includes explanatory notes that help you understand why each provision matters and how to adapt it to your needs.",
    takeaways: [
      {
        icon: "fileText",
        title: "Acceptable Use Policy",
        description:
          "A complete, customizable policy template that defines appropriate AI use across roles, including specific guidance for sensitive contexts.",
      },
      {
        icon: "search",
        title: "Vendor Evaluation Checklist",
        description:
          "A structured scoring system for evaluating AI vendors on security, privacy, reliability, bias mitigation, and organizational fit.",
      },
      {
        icon: "database",
        title: "Data Handling Guidelines",
        description:
          "Clear protocols for what data can be shared with AI systems, how outputs should be reviewed, and where human oversight is required.",
      },
      {
        icon: "alertCircle",
        title: "Incident Response Procedures",
        description:
          "Step-by-step procedures for responding to AI-related incidents including data exposure, biased outputs, and system failures.",
      },
    ],
    quote: {
      text: "A good AI policy does not prevent innovation — it creates the safe boundaries within which innovation can flourish.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Assess Your AI Footprint",
        description:
          "Document all AI tools currently in use across your organization, including shadow IT and personal tool usage by staff.",
      },
      {
        number: 2,
        title: "Customize Core Policies",
        description:
          "Adapt the acceptable use policy template to reflect your organization's values, risk tolerance, and regulatory requirements.",
      },
      {
        number: 3,
        title: "Evaluate Current Vendors",
        description:
          "Run your existing AI vendors through the evaluation checklist. Flag any that do not meet your minimum standards for review.",
      },
      {
        number: 4,
        title: "Publish & Communicate",
        description:
          "Distribute the finalized policies through your normal governance channels. Hold briefing sessions to explain key provisions.",
      },
      {
        number: 5,
        title: "Schedule Regular Reviews",
        description:
          "Set calendar reminders for quarterly policy reviews. AI capabilities and regulations evolve rapidly — your policies should too.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Start with What You Have",
        body: "You do not need to implement every template at once. Start with the acceptable use policy and vendor checklist. Add the remaining documents as your AI usage matures.",
      },
      {
        type: "info",
        title: "Living Documents",
        body: "These templates are designed to evolve. Version control your policies and review them quarterly as the AI landscape shifts. What was best practice six months ago may need updating.",
      },
    ],
    conclusion:
      "Having an AI policy is no longer optional for responsible organizations. This starter kit gives you the foundation to govern AI use thoughtfully, protect your stakeholders, and create the conditions for safe, productive innovation.",
  },

  "v-009": {
    heroSubtitle:
      "Build an AI-ready workforce with structured competency maps, training blueprints, and measurement tools.",
    overview:
      "The AI skills gap is the defining workforce challenge of this decade. Organizations that invest in upskilling now will build resilient, adaptable teams. Those that wait will face talent shortages, competitive disadvantage, and a demoralized workforce anxious about being replaced.\n\nThis framework provides the complete infrastructure for building an AI upskilling program. It includes competency maps that define what AI readiness looks like at every organizational level, training program blueprints with modular curricula for technical and non-technical roles, mentorship models that pair AI-savvy team members with colleagues who are still building confidence, and measurement tools that track skill development over time.\n\nWhether you are upskilling a team of 10 or 10,000, this framework scales to your needs and adapts to your organizational culture.",
    takeaways: [
      {
        icon: "map",
        title: "Competency Maps",
        description:
          "Role-specific AI competency definitions spanning awareness, literacy, application, and leadership levels for every department.",
      },
      {
        icon: "graduationCap",
        title: "Training Blueprints",
        description:
          "Modular training curricula for both technical and non-technical roles, with recommended platforms, timelines, and assessment methods.",
      },
      {
        icon: "users",
        title: "Mentorship Models",
        description:
          "Structured mentorship program designs that accelerate skill transfer and build a culture of continuous learning.",
      },
      {
        icon: "barChart",
        title: "Progress Measurement",
        description:
          "Assessment frameworks and dashboards that track individual and organizational AI readiness over time.",
      },
    ],
    quote: {
      text: "The goal of upskilling is not to turn everyone into a data scientist — it is to give every person the confidence to work effectively alongside AI.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Baseline Assessment",
        description:
          "Survey your organization's current AI skill levels using the provided assessment tool. Map results against the competency framework.",
      },
      {
        number: 2,
        title: "Identify Priority Roles",
        description:
          "Determine which roles will be most impacted by AI in the next 12 months and prioritize upskilling efforts accordingly.",
      },
      {
        number: 3,
        title: "Design Learning Paths",
        description:
          "Customize the training blueprints for your priority roles. Select appropriate modules, platforms, and delivery formats.",
      },
      {
        number: 4,
        title: "Launch Mentorship Pairs",
        description:
          "Match early adopters with colleagues who need support. Provide mentors with the conversation guides and milestone checklists.",
      },
      {
        number: 5,
        title: "Measure & Communicate Progress",
        description:
          "Deploy quarterly skill assessments and share progress transparently. Celebrate growth and identify areas needing additional support.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Culture Before Curriculum",
        body: "Before launching training programs, address the cultural fears around AI replacing jobs. People cannot learn when they are anxious. Lead with empathy and transparent communication about how AI will augment — not replace — their work.",
      },
    ],
    conclusion:
      "Investing in your people is always the right strategy. An AI-ready workforce is not just a competitive advantage — it is a commitment to the dignity and growth of every person on your team. This framework gives you the tools to make that investment wisely and effectively.",
  },

  "v-010": {
    heroSubtitle:
      "Leverage AI to deepen community engagement and extend your ministry's reach with practical strategies.",
    overview:
      "Community engagement is the lifeblood of churches and nonprofits. AI tools offer unprecedented opportunities to understand, reach, and serve your community more effectively — but only when deployed with wisdom and authentic care.\n\nThis workshop replay explores how organizations are using AI to enhance community engagement without losing the personal touch. From chatbot-powered ministry tools that provide 24/7 spiritual resources to personalized outreach automation that ensures no visitor is forgotten, you will see real examples of AI augmenting human connection.\n\nThe session also covers sentiment analysis tools that help leaders understand congregation feedback at scale, predictive models that identify members who may be disengaging, and ethical frameworks for using these powerful tools responsibly.",
    takeaways: [
      {
        icon: "messageCircle",
        title: "Chatbot Ministry Tools",
        description:
          "Deploy AI-powered chatbots for prayer requests, resource recommendations, and initial spiritual conversations with appropriate human handoff.",
      },
      {
        icon: "send",
        title: "Personalized Outreach",
        description:
          "Use AI to personalize communication at scale — from visitor follow-up sequences to milestone celebrations and care check-ins.",
      },
      {
        icon: "activity",
        title: "Sentiment Analysis",
        description:
          "Leverage natural language processing to understand congregation feedback, identify trends, and respond to emerging needs proactively.",
      },
      {
        icon: "heartPulse",
        title: "Engagement Prediction",
        description:
          "Use predictive analytics to identify members who may be drifting and trigger proactive pastoral outreach before disconnection occurs.",
      },
    ],
    quote: {
      text: "AI should never replace a pastor's intuition — but it can ensure that intuition is informed by data no human could process alone.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Map Your Engagement Points",
        description:
          "Document every touchpoint where your community interacts with your organization — digital and physical.",
      },
      {
        number: 2,
        title: "Identify Automation Candidates",
        description:
          "Select 2-3 engagement touchpoints that could benefit from AI augmentation without sacrificing authenticity.",
      },
      {
        number: 3,
        title: "Deploy a Pilot Chatbot",
        description:
          "Set up a focused chatbot for one specific use case — such as prayer request intake or event information — and monitor performance.",
      },
      {
        number: 4,
        title: "Implement Outreach Automation",
        description:
          "Configure personalized follow-up sequences for new visitors using the templates and best practices shared in the workshop.",
      },
      {
        number: 5,
        title: "Review & Iterate",
        description:
          "After 60 days, review engagement metrics, gather qualitative feedback, and refine your AI-augmented engagement strategy.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Human Handoff Is Essential",
        body: "Every AI-powered engagement tool must have a clear path to human connection. AI should handle routine interactions and surface the conversations that need a human touch — never the reverse.",
      },
    ],
    conclusion:
      "The most effective community engagement strategies combine the scale of AI with the warmth of human connection. When deployed thoughtfully, these tools help your team spend less time on logistics and more time on the relationships that matter most.",
  },

  "v-011": {
    heroSubtitle:
      "Navigate data privacy regulations with confidence using compliance checklists and ready-to-use templates.",
    overview:
      "Faith organizations handle some of the most sensitive personal data imaginable — spiritual journeys, family situations, financial giving, and pastoral counseling records. Yet many churches and religious nonprofits operate without formal data privacy policies, creating significant legal and ethical exposure.\n\nThis resource demystifies the data privacy landscape for faith organizations. It covers GDPR, CCPA, and emerging regulations while addressing the unique exemptions and obligations that apply to religious organizations. More importantly, it provides practical tools: compliance checklists, data mapping exercises, consent form templates, and breach notification procedures.\n\nDesigned for church administrators, executive pastors, and organizational leaders, this policy resource transforms data privacy from an overwhelming legal topic into a manageable set of organizational practices.",
    takeaways: [
      {
        icon: "globe",
        title: "Regulatory Overview",
        description:
          "Understand which data privacy regulations apply to your organization, including religious exemptions and sector-specific requirements.",
      },
      {
        icon: "clipboardCheck",
        title: "Compliance Checklists",
        description:
          "Step-by-step compliance checklists for GDPR, CCPA, and general best practices tailored to faith organization contexts.",
      },
      {
        icon: "map",
        title: "Data Mapping Exercises",
        description:
          "Guided exercises to map what personal data you collect, where it is stored, who has access, and how long it is retained.",
      },
      {
        icon: "alertCircle",
        title: "Breach Response Procedures",
        description:
          "Complete breach notification templates and procedures that comply with regulatory requirements and protect your community.",
      },
    ],
    quote: {
      text: "Data privacy is a trust issue. Your congregation shares their most personal information with you because they trust you. Honor that trust with proper stewardship.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Determine Your Regulatory Landscape",
        description:
          "Use the decision tree to identify which privacy regulations apply based on your location, operations, and community demographics.",
      },
      {
        number: 2,
        title: "Complete the Data Mapping Exercise",
        description:
          "Walk through the guided exercise to document every type of personal data your organization collects, processes, and stores.",
      },
      {
        number: 3,
        title: "Assess Compliance Gaps",
        description:
          "Compare your current practices against the applicable compliance checklist. Prioritize gaps by risk level and ease of remediation.",
      },
      {
        number: 4,
        title: "Implement Priority Fixes",
        description:
          "Address the highest-risk compliance gaps first using the provided templates for consent forms, privacy notices, and data handling procedures.",
      },
      {
        number: 5,
        title: "Establish Ongoing Governance",
        description:
          "Assign a data privacy lead, schedule annual reviews, and create a process for evaluating new tools against your privacy standards.",
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Religious Exemptions Are Limited",
        body: "While some regulations provide limited exemptions for religious organizations, these exemptions are narrower than many leaders assume. When in doubt, comply with the full standard — it protects your community.",
      },
    ],
    conclusion:
      "Data privacy compliance is not just about avoiding penalties — it is about honoring the trust your community places in you. With the tools in this resource, you can build privacy practices that protect your members and demonstrate the integrity your organization stands for.",
  },

  "v-012": {
    heroSubtitle:
      "Stay ahead of the curve with quarterly AI intelligence curated for senior leadership decision-makers.",
    overview:
      "The AI landscape evolves faster than any leader can track independently. New models, regulatory shifts, market disruptions, and emerging use cases create a constant stream of information that is difficult to synthesize into actionable intelligence.\n\nThis quarterly briefing distills the most important AI developments into a focused, executive-level analysis designed to be consumed in a single sitting. It covers the latest model capabilities and what they mean for your organization, regulatory developments that may require strategic response, market shifts that present opportunities or threats, and specific recommendations tailored to organizational leaders.\n\nDesigned for senior leaders who need to stay informed without drowning in technical detail, each briefing delivers the context and analysis you need to make confident AI-related decisions.",
    takeaways: [
      {
        icon: "cpu",
        title: "Model Capability Updates",
        description:
          "Understand what the latest AI models can do and where current limitations remain, translated into business-relevant implications.",
      },
      {
        icon: "scale",
        title: "Regulatory Developments",
        description:
          "Track the evolving regulatory landscape across jurisdictions with specific guidance on compliance implications for your organization.",
      },
      {
        icon: "trendingUp",
        title: "Market Intelligence",
        description:
          "Identify emerging market trends, competitive dynamics, and strategic opportunities in the AI ecosystem relevant to your sector.",
      },
      {
        icon: "compass",
        title: "Strategic Recommendations",
        description:
          "Actionable recommendations for organizational AI strategy informed by the quarter's most significant developments.",
      },
    ],
    quote: {
      text: "The leaders who will navigate AI successfully are not the ones who know the most about technology — they are the ones who ask the best questions.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Read the Executive Summary",
        description:
          "Start with the one-page executive summary to identify which sections are most relevant to your current strategic priorities.",
      },
      {
        number: 2,
        title: "Review Regulatory Updates",
        description:
          "Check the regulatory section for any developments that require immediate attention or strategic planning from your team.",
      },
      {
        number: 3,
        title: "Assess Strategic Recommendations",
        description:
          "Evaluate the quarterly recommendations against your current AI strategy and identify any adjustments needed.",
      },
      {
        number: 4,
        title: "Brief Your Team",
        description:
          "Share relevant sections with your direct reports and use the discussion questions provided to drive strategic conversation.",
      },
    ],
    callouts: [
      {
        type: "info",
        title: "Quarterly Cadence",
        body: "This briefing is published at the start of each quarter. Subscribe to receive automatic notifications when new editions are released, along with interim alerts for breaking developments.",
      },
    ],
    conclusion:
      "Staying informed is a strategic imperative, not a luxury. This quarterly briefing ensures you have the intelligence foundation needed to lead with confidence in a rapidly evolving AI landscape.",
  },

  "v-013": {
    heroSubtitle:
      "Establish an internal AI advisory council that balances innovation velocity with responsible oversight.",
    overview:
      "As AI becomes embedded in more organizational processes, ad-hoc governance approaches break down. An AI advisory council provides the structured forum for evaluating AI initiatives, setting organizational standards, resolving ethical tensions, and ensuring that AI deployment aligns with your mission and values.\n\nThis guide walks you through every aspect of building an effective AI advisory council: from selecting members who bring diverse perspectives to developing a charter that defines scope and authority, establishing a meeting cadence that maintains momentum without creating bureaucratic drag, and implementing decision-making frameworks that balance speed with rigor.\n\nWhether your organization is deploying its first AI tool or managing a portfolio of AI systems, an advisory council provides the governance structure that scales with your ambitions.",
    takeaways: [
      {
        icon: "users",
        title: "Member Selection Criteria",
        description:
          "Define the competencies, perspectives, and organizational roles needed for a balanced, effective advisory council.",
      },
      {
        icon: "fileText",
        title: "Charter Development",
        description:
          "Build a clear, concise charter that defines the council's scope, authority, reporting relationships, and success metrics.",
      },
      {
        icon: "calendar",
        title: "Meeting Cadence & Structure",
        description:
          "Establish a rhythm of meetings that maintains governance momentum without creating administrative burden on members.",
      },
      {
        icon: "scale",
        title: "Decision-Making Frameworks",
        description:
          "Implement structured decision processes for evaluating AI proposals, resolving ethical questions, and managing exceptions.",
      },
    ],
    quote: {
      text: "An AI advisory council is not about slowing things down — it is about making sure you are moving fast in the right direction.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Define Scope & Authority",
        description:
          "Clarify what decisions the council will make versus advise on. Define the boundary between council authority and executive decision-making.",
      },
      {
        number: 2,
        title: "Select Council Members",
        description:
          "Recruit 5-9 members representing technology, ethics, operations, legal, and community perspectives using the selection criteria matrix.",
      },
      {
        number: 3,
        title: "Draft & Ratify the Charter",
        description:
          "Use the charter template to define mission, scope, membership terms, meeting cadence, and reporting obligations.",
      },
      {
        number: 4,
        title: "Establish Operating Procedures",
        description:
          "Set up meeting structures, decision frameworks, documentation practices, and communication channels for the council.",
      },
      {
        number: 5,
        title: "Launch with a Real Decision",
        description:
          "Start the council's work with a genuine AI decision that needs to be made. Nothing builds credibility faster than delivering tangible value.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Diverse Perspectives Matter",
        body: "The most common failure mode for AI advisory councils is homogeneity. Ensure your council includes voices from outside the technology function — community members, ethicists, front-line workers, and people who will be most affected by AI decisions.",
      },
    ],
    conclusion:
      "An effective AI advisory council is one of the highest-leverage governance investments an organization can make. It provides the structure for making better decisions, the forum for surfacing ethical concerns, and the credibility to move boldly with stakeholder confidence.",
  },

  "v-014": {
    heroSubtitle:
      "Launch a technology mentorship program that empowers young people and builds bridges with local industry.",
    overview:
      "Young people are growing up surrounded by technology, but many lack structured guidance to develop the skills, critical thinking, and ethical awareness needed to thrive in a technology-driven world. A mentorship program bridges this gap by connecting young people with experienced professionals who can guide their development.\n\nThis blueprint provides everything you need to launch and sustain a technology mentorship program: curriculum outlines that cover technical skills and digital ethics, mentor matching frameworks that create productive pairings, progress tracking tools that demonstrate impact, and partnership templates for engaging local technology companies as program sponsors and volunteer sources.\n\nDesigned for youth leaders, church administrators, and community program directors, this resource transforms the aspiration of technology mentorship into an operational reality.",
    takeaways: [
      {
        icon: "code",
        title: "Curriculum Outlines",
        description:
          "Age-appropriate technology curriculum covering coding basics, digital literacy, AI awareness, and ethical technology use.",
      },
      {
        icon: "link",
        title: "Mentor Matching Framework",
        description:
          "A structured process for pairing mentors and mentees based on interests, learning goals, availability, and personality compatibility.",
      },
      {
        icon: "barChart",
        title: "Progress Tracking Tools",
        description:
          "Measurement instruments that track skill development, confidence growth, and program satisfaction for reporting and improvement.",
      },
      {
        icon: "handshake",
        title: "Partnership Templates",
        description:
          "Ready-to-use outreach templates and partnership agreements for engaging local technology companies as sponsors and volunteer sources.",
      },
    ],
    quote: {
      text: "Every young person deserves a guide who sees their potential and helps them build the skills to realize it.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Assess Community Needs",
        description:
          "Survey your community to understand the technology skill gaps, interests, and aspirations of the young people you serve.",
      },
      {
        number: 2,
        title: "Recruit & Screen Mentors",
        description:
          "Use the outreach templates to recruit mentors from your community and partner organizations. Complete background checks and training.",
      },
      {
        number: 3,
        title: "Build the Curriculum",
        description:
          "Customize the curriculum outlines for your community's specific needs. Select modules that align with local industry opportunities.",
      },
      {
        number: 4,
        title: "Match & Launch",
        description:
          "Use the matching framework to pair mentors and mentees. Hold a launch event to build excitement and set expectations.",
      },
      {
        number: 5,
        title: "Monitor & Celebrate",
        description:
          "Track progress using the provided tools. Celebrate milestones publicly to build program visibility and recruit future participants.",
      },
    ],
    callouts: [
      {
        type: "example",
        title: "Community Impact",
        body: "A church in Atlanta launched a tech mentorship program using this blueprint with 12 mentor-mentee pairs. Within one year, 8 of the 12 mentees had enrolled in technology-related education or training programs.",
      },
    ],
    conclusion:
      "Technology mentorship is one of the most impactful investments a community can make in its young people. This blueprint gives you the tools to move from intention to action and create lasting impact in the lives of the young people you serve.",
  },

  "v-015": {
    heroSubtitle:
      "Identify, quantify, and mitigate AI-related risks specific to nonprofit organizations and missions.",
    overview:
      "Nonprofits face unique AI risks that corporate frameworks do not adequately address. Reputational risk carries outsized consequences when public trust is your primary asset. Operational dependencies on AI can threaten mission-critical programs. Vendor lock-in can consume limited budgets. And algorithmic bias can undermine the equity commitments central to your mission.\n\nThis video deep-dive provides a nonprofit-specific lens on AI risk management. Using real-world examples from organizations that have navigated these challenges, you will learn practical approaches to identifying risks before they materialize, quantifying their potential impact, implementing proportionate mitigations, and building organizational resilience.\n\nDesigned for nonprofit executives, board members, and program leaders, this resource transforms risk management from a fear-based exercise into a strategic enabler of confident AI adoption.",
    takeaways: [
      {
        icon: "shield",
        title: "Reputational Risk Management",
        description:
          "Assess and mitigate the unique reputational risks nonprofits face when deploying AI, including public perception and donor confidence.",
      },
      {
        icon: "alertTriangle",
        title: "Operational Dependency Mapping",
        description:
          "Identify where AI dependencies could threaten mission-critical operations and build appropriate redundancy and fallback plans.",
      },
      {
        icon: "dollarSign",
        title: "Vendor Lock-In Prevention",
        description:
          "Evaluate vendor relationships for lock-in risks and implement contractual and technical safeguards to preserve organizational flexibility.",
      },
      {
        icon: "eye",
        title: "Bias Auditing Methodologies",
        description:
          "Apply structured bias detection processes to ensure AI systems serve all members of your community equitably.",
      },
    ],
    quote: {
      text: "Risk management is not about avoiding risk — it is about understanding risk well enough to take smart, mission-aligned ones.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Catalog AI Touchpoints",
        description:
          "Document every way AI touches your programs, operations, fundraising, and communications. Include both formal tools and informal usage.",
      },
      {
        number: 2,
        title: "Assess Risk by Category",
        description:
          "Evaluate each touchpoint across the four risk categories: reputational, operational, financial, and equity using the provided framework.",
      },
      {
        number: 3,
        title: "Prioritize Mitigations",
        description:
          "Rank risks by likelihood and impact. Focus mitigation efforts on high-likelihood, high-impact risks first.",
      },
      {
        number: 4,
        title: "Implement Safeguards",
        description:
          "Deploy the recommended mitigations for your highest-priority risks using the implementation guides provided for each risk category.",
      },
      {
        number: 5,
        title: "Establish Monitoring",
        description:
          "Set up ongoing risk monitoring using the dashboard template and schedule quarterly risk reviews with your leadership team.",
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Mission Alignment Is Non-Negotiable",
        body: "Every AI risk decision should be evaluated through the lens of your mission. An efficiency gain that compromises your equity commitments or community trust is not a gain — it is a liability.",
      },
    ],
    conclusion:
      "Smart risk management enables bold innovation. By understanding and proactively managing AI risks, nonprofit leaders can pursue the transformative potential of AI while protecting the trust, equity, and mission that define their organizations.",
  },

  "v-016": {
    heroSubtitle:
      "Streamline church operations with practical, affordable automation that your volunteer team can manage.",
    overview:
      "Church administrators wear many hats — and the administrative burden of managing events, communications, follow-ups, donations, and volunteer schedules can overwhelm even the most dedicated teams. Automation is not about replacing people; it is about freeing them to focus on ministry instead of logistics.\n\nThis video walks you through setting up practical automation workflows using affordable, accessible tools. From automated visitor follow-up sequences that ensure no guest is forgotten, to event management workflows that handle registrations, reminders, and post-event surveys automatically, every workflow is designed to be implemented and maintained by non-technical staff.\n\nYou will also learn how to automate donation acknowledgment and tracking, build self-service volunteer scheduling systems, and create communication workflows that keep your congregation informed without overwhelming your team.",
    takeaways: [
      {
        icon: "userPlus",
        title: "Visitor Follow-Up Automation",
        description:
          "Build an automated welcome sequence that engages new visitors with personalized communication within hours of their first visit.",
      },
      {
        icon: "calendar",
        title: "Event Management Workflows",
        description:
          "Automate event registration, reminders, check-in, and post-event follow-up to eliminate manual coordination overhead.",
      },
      {
        icon: "creditCard",
        title: "Donation Tracking Systems",
        description:
          "Set up automated donation acknowledgment, recurring gift management, and year-end tax statement generation.",
      },
      {
        icon: "clipboardList",
        title: "Volunteer Scheduling",
        description:
          "Create self-service volunteer scheduling with automated reminders, swap requests, and coverage gap alerts.",
      },
    ],
    quote: {
      text: "Automation should make your church feel more personal, not less. When the logistics run themselves, your team is free to focus on people.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Identify Your Biggest Time Drains",
        description:
          "Survey your staff and volunteers to identify which administrative tasks consume the most time and cause the most frustration.",
      },
      {
        number: 2,
        title: "Select Your Automation Platform",
        description:
          "Choose an automation tool that fits your budget and technical capacity using the comparison guide included in the resources.",
      },
      {
        number: 3,
        title: "Build Your First Workflow",
        description:
          "Start with visitor follow-up automation — it has the highest impact-to-effort ratio and delivers visible results quickly.",
      },
      {
        number: 4,
        title: "Train Your Team",
        description:
          "Walk your staff through the automation workflows so they understand what happens automatically and where human input is needed.",
      },
      {
        number: 5,
        title: "Expand Gradually",
        description:
          "Add one new automation workflow per month. This pace allows your team to adapt and ensures each workflow is properly tested.",
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "Keep It Simple",
        body: "The best automation is the one your team actually uses. Resist the urge to build complex workflows. Start with straightforward automations and add sophistication only when the simple version is running smoothly.",
      },
      {
        type: "example",
        title: "Real Results",
        body: "A 200-member church implemented the visitor follow-up automation from this guide and saw their guest return rate increase by 40% within three months — without adding any staff time.",
      },
    ],
    conclusion:
      "Smart automation transforms church operations from a source of stress into a foundation for growth. By implementing the workflows in this guide, you will reclaim hours every week for the work that called you to ministry in the first place.",
  },
  "v-017": {
    heroSubtitle:
      "A strategic framework for faith-based leaders in an age of intelligent systems.",
    overview:
      "Generative AI is no longer experimental. It is embedded. From sermon drafting and content generation to predictive analytics, workflow automation, and conversational agents, AI systems are rapidly becoming part of the operational fabric of modern organizations. Faith-based institutions are not exempt from this shift — and perhaps feel its weight more profoundly than most.\n\nThis is not merely a conversation about tools. It is a conversation about stewardship, theology, trust, and moral leadership. As ministries adopt generative AI technologies, they must confront a unique ethical landscape. The Church does not have the option of naïve enthusiasm nor reactionary retreat. We are called to lead.\n\nThis premium briefing outlines a governance framework for responsible AI adoption in ministry, focusing on three pillars: Data Stewardship, Bias Mitigation & Theological Integrity, and Congregational Transparency.",
    takeaways: [
      {
        icon: "shield",
        title: "Data as Sacred Trust",
        description:
          "Faith communities manage some of the most sensitive data in society — prayer requests, counseling notes, giving histories, and crisis disclosures. AI productivity should never come at the expense of pastoral confidentiality.",
      },
      {
        icon: "brain",
        title: "AI Is an Assistant, Not an Authority",
        description:
          "AI can accelerate research and draft communications, but it cannot interpret Scripture under divine guidance, replace pastoral discernment, or shepherd a congregation. Leadership must make this distinction clear.",
      },
      {
        icon: "eye",
        title: "Transparency Builds Trust",
        description:
          "If AI drafts communications, chatbots respond to inquiries, or analytics influence outreach — should members be informed? Preemptive clarity prevents reactive damage control. Secrecy erodes confidence; clarity strengthens it.",
      },
      {
        icon: "scale",
        title: "Theological Review Protocols",
        description:
          "Any AI-generated theological material — sermon outlines, discipleship curriculum, position papers — should undergo qualified human review. Confidence is not correctness.",
      },
    ],
    quote: {
      text: "Innovation without integrity erodes trust. Integrity without innovation forfeits influence. The moral frontier is here.",
      attribution: "Keith L. Odom",
    },
    steps: [
      {
        number: 1,
        title: "Establish Theological Alignment",
        description:
          "Before adopting any AI solution, ask: Does this tool align with our doctrinal convictions? Does it support discipleship or subtly replace it? Technology must serve theology — not reshape it.",
      },
      {
        number: 2,
        title: "Implement Operational Safeguards",
        description:
          "Develop role-based access permissions, content review requirements, data handling standards, security audits, and incident response planning. AI governance should sit alongside cybersecurity, not outside of it.",
      },
      {
        number: 3,
        title: "Build Community Trust",
        description:
          "Ask: Are we prepared to explain our AI usage publicly? Are we protecting member data responsibly? Do we have a response plan if misuse occurs? Trust is easier to preserve than to rebuild.",
      },
      {
        number: 4,
        title: "Formalize an AI Usage Policy",
        description:
          "Every ministry should adopt a written AI policy addressing acceptable use cases, prohibited data categories, required human oversight, approval workflows, and security expectations. Policy does not restrict innovation — it protects it.",
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Ignorance Is Not Neutrality",
        body: "Executive and pastoral leadership must understand where data is stored, whether it is retained, whether it contributes to model training, and how access controls are enforced. There is a substantial difference between public consumer AI, enterprise-secured AI, and custom-built solutions.",
      },
      {
        type: "tip",
        title: "Protect the Church's Voice",
        body: "Overreliance on generative systems can gradually homogenize communication style. When ministries sound like aggregated internet summaries rather than Spirit-formed conviction, identity erodes. AI can help draft — but voice must remain human.",
      },
    ],
    conclusion:
      "Faith-based organizations stand at a moral frontier. The path forward is not withdrawal, nor is it reckless adoption — it is disciplined engagement. The Church has navigated printing presses, radio, television, and the internet. Generative AI is simply the next frontier. But unlike previous revolutions, this one interacts directly with cognition, language, and decision-making — the very domains that shape belief and behavior. The question is not whether ministries will encounter generative AI. The question is whether we will lead through it — wisely, courageously, and faithfully.",
  },
};

export function getVaultContent(
  itemId: string
): VaultItemContent | undefined {
  return vaultContent[itemId];
}
