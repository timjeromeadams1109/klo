-- ============================================================

-- Seed content: port hardcoded vault + feed data to Supabase

-- Auto-generated from src/lib/vault-data.ts and feed-data.ts

-- ============================================================


-- Vault content

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'The Pastor''s Guide to AI Adoption',
  'pastors-guide-ai-adoption',
  'briefing',
  'Church & Tech',
  'A plain-language introduction to artificial intelligence for faith leaders. Learn what AI can and cannot do, how to evaluate tools for your ministry, and how to communicate change to your congregation with clarity and confidence.',
  'A plain-language introduction to artificial intelligence for faith leaders. Learn what AI can and cannot do, how to evaluate tools for your ministry, and how to communicate change to your congregation with clarity and confidence.',
  'free',
  'published',
  'Keith L. Odom',
  '2026-02-15T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-001","level":"Beginner","duration":"12 min read","thumbnail_gradient":"from-amber-600 to-orange-800","is_premium":false,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Enterprise AI Governance Framework',
  'enterprise-ai-governance-framework',
  'framework',
  'Governance',
  'A comprehensive governance framework for organizations deploying AI at scale. Covers risk assessment matrices, accountability structures, audit protocols, and board-level reporting templates designed for enterprise leadership.',
  'A comprehensive governance framework for organizations deploying AI at scale. Covers risk assessment matrices, accountability structures, audit protocols, and board-level reporting templates designed for enterprise leadership.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-02-10T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-002","level":"Executive","duration":"35 min read","thumbnail_gradient":"from-blue-600 to-indigo-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Digital Ministry Playbook 2026',
  'digital-ministry-playbook-2026',
  'template',
  'Church & Tech',
  'A step-by-step operational playbook for churches ready to modernize their digital presence. Includes social media calendars, livestream checklists, CRM integration guides, and member engagement automation workflows.',
  'A step-by-step operational playbook for churches ready to modernize their digital presence. Includes social media calendars, livestream checklists, CRM integration guides, and member engagement automation workflows.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-01-28T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-003","level":"Intermediate","duration":"28 min read","thumbnail_gradient":"from-emerald-600 to-teal-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Cybersecurity Essentials for Churches',
  'cybersecurity-essentials-churches',
  'video',
  'AI & Ethics',
  'Protect your ministry from data breaches, phishing attacks, and ransomware. This video covers the fundamentals of cybersecurity hygiene every church administrator needs to know, with real-world case studies and actionable checklists.',
  'Protect your ministry from data breaches, phishing attacks, and ransomware. This video covers the fundamentals of cybersecurity hygiene every church administrator needs to know, with real-world case studies and actionable checklists.',
  'free',
  'published',
  'Keith L. Odom',
  '2026-01-20T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-004","level":"Beginner","duration":"45 min video","thumbnail_gradient":"from-purple-600 to-violet-900","is_premium":false,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Board-Level Technology Reporting Template',
  'board-level-tech-reporting-template',
  'template',
  'Leadership',
  'Present technology investments and digital transformation progress to your board with confidence. This template includes KPI dashboards, risk heat maps, ROI calculations, and narrative frameworks that translate technical progress into business language.',
  'Present technology investments and digital transformation progress to your board with confidence. This template includes KPI dashboards, risk heat maps, ROI calculations, and narrative frameworks that translate technical progress into business language.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-01-15T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-005","level":"Executive","duration":"15 min read","thumbnail_gradient":"from-rose-600 to-pink-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'AI Ethics in Youth Ministry',
  'ai-ethics-youth-ministry',
  'briefing',
  'Youth & Workforce',
  'Navigate the ethical complexities of deploying AI tools in youth-facing programs. Covers data privacy for minors, consent frameworks, algorithmic bias awareness, and building digital literacy into your youth curriculum.',
  'Navigate the ethical complexities of deploying AI tools in youth-facing programs. Covers data privacy for minors, consent frameworks, algorithmic bias awareness, and building digital literacy into your youth curriculum.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-02-01T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-006","level":"Intermediate","duration":"18 min read","thumbnail_gradient":"from-cyan-600 to-blue-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Leading Through Digital Disruption',
  'leading-through-digital-disruption',
  'video',
  'Leadership',
  'A masterclass on change management for leaders navigating technological transformation. Learn the psychological frameworks, communication strategies, and organizational design patterns that separate successful digital transformations from failed ones.',
  'A masterclass on change management for leaders navigating technological transformation. Learn the psychological frameworks, communication strategies, and organizational design patterns that separate successful digital transformations from failed ones.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-01-08T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-007","level":"Intermediate","duration":"52 min video","thumbnail_gradient":"from-yellow-600 to-amber-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Responsible AI Policy Starter Kit',
  'responsible-ai-policy-starter-kit',
  'policy',
  'AI & Ethics',
  'Get your organization''s AI policy off the ground with this comprehensive starter kit. Includes policy templates, acceptable use guidelines, vendor evaluation checklists, and incident response procedures ready for customization.',
  'Get your organization''s AI policy off the ground with this comprehensive starter kit. Includes policy templates, acceptable use guidelines, vendor evaluation checklists, and incident response procedures ready for customization.',
  'free',
  'published',
  'Keith L. Odom',
  '2026-02-05T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-008","level":"Beginner","duration":"20 min read","thumbnail_gradient":"from-fuchsia-600 to-purple-900","is_premium":false,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Workforce Upskilling in the Age of AI',
  'workforce-upskilling-age-of-ai',
  'framework',
  'Youth & Workforce',
  'Equip your team with the skills to thrive alongside AI. This framework provides competency maps, training program blueprints, mentorship models, and measurement tools for organizations committed to building an AI-ready workforce.',
  'Equip your team with the skills to thrive alongside AI. This framework provides competency maps, training program blueprints, mentorship models, and measurement tools for organizations committed to building an AI-ready workforce.',
  'professional',
  'published',
  'Keith L. Odom',
  '2025-12-18T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-009","level":"Intermediate","duration":"25 min read","thumbnail_gradient":"from-amber-600 to-orange-800","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'AI-Powered Community Engagement Strategies',
  'ai-powered-community-engagement',
  'replay',
  'Church & Tech',
  'Replay of a live workshop exploring how churches and nonprofits can leverage AI to deepen community engagement. Covers chatbot ministry tools, personalized outreach automation, and sentiment analysis for congregation feedback.',
  'Replay of a live workshop exploring how churches and nonprofits can leverage AI to deepen community engagement. Covers chatbot ministry tools, personalized outreach automation, and sentiment analysis for congregation feedback.',
  'professional',
  'published',
  'Keith L. Odom',
  '2025-12-10T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-010","level":"Intermediate","duration":"1h 15 min replay","thumbnail_gradient":"from-blue-600 to-indigo-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Data Privacy Compliance for Faith Organizations',
  'data-privacy-compliance-faith-orgs',
  'policy',
  'Governance',
  'Navigate GDPR, CCPA, and sector-specific data privacy requirements for religious organizations. Includes compliance checklists, data mapping exercises, consent form templates, and breach notification procedures.',
  'Navigate GDPR, CCPA, and sector-specific data privacy requirements for religious organizations. Includes compliance checklists, data mapping exercises, consent form templates, and breach notification procedures.',
  'professional',
  'published',
  'Keith L. Odom',
  '2025-11-25T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-011","level":"Intermediate","duration":"22 min read","thumbnail_gradient":"from-emerald-600 to-teal-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'The Executive''s AI Briefing: Q1 2026',
  'executives-ai-briefing-q1-2026',
  'briefing',
  'Leadership',
  'A quarterly intelligence briefing for senior leaders. Covers the latest AI developments, regulatory changes, market shifts, and strategic recommendations. Designed to be consumed in one sitting and shared with your leadership team.',
  'A quarterly intelligence briefing for senior leaders. Covers the latest AI developments, regulatory changes, market shifts, and strategic recommendations. Designed to be consumed in one sitting and shared with your leadership team.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-01-05T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-012","level":"Executive","duration":"14 min read","thumbnail_gradient":"from-purple-600 to-violet-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Building an AI Advisory Council',
  'building-ai-advisory-council',
  'framework',
  'Governance',
  'A practical guide to establishing an internal AI advisory council. Covers member selection criteria, charter development, meeting cadence, decision-making frameworks, and how to balance innovation velocity with responsible oversight.',
  'A practical guide to establishing an internal AI advisory council. Covers member selection criteria, charter development, meeting cadence, decision-making frameworks, and how to balance innovation velocity with responsible oversight.',
  'free',
  'published',
  'Keith L. Odom',
  '2026-02-20T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-013","level":"Executive","duration":"16 min read","thumbnail_gradient":"from-rose-600 to-pink-900","is_premium":false,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Youth Tech Mentorship Program Blueprint',
  'youth-tech-mentorship-blueprint',
  'template',
  'Youth & Workforce',
  'Launch a technology mentorship program for young people in your community. This blueprint includes curriculum outlines, mentor matching frameworks, progress tracking tools, and partnership templates for local tech companies.',
  'Launch a technology mentorship program for young people in your community. This blueprint includes curriculum outlines, mentor matching frameworks, progress tracking tools, and partnership templates for local tech companies.',
  'free',
  'published',
  'Keith L. Odom',
  '2026-02-12T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-014","level":"Beginner","duration":"19 min read","thumbnail_gradient":"from-cyan-600 to-blue-900","is_premium":false,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'AI Risk Assessment for Nonprofit Leaders',
  'ai-risk-assessment-nonprofit-leaders',
  'video',
  'AI & Ethics',
  'A video deep-dive into identifying, quantifying, and mitigating AI-related risks for nonprofit organizations. Covers reputational risk, operational dependencies, vendor lock-in, and bias auditing methodologies with real-world examples.',
  'A video deep-dive into identifying, quantifying, and mitigating AI-related risks for nonprofit organizations. Covers reputational risk, operational dependencies, vendor lock-in, and bias auditing methodologies with real-world examples.',
  'professional',
  'published',
  'Keith L. Odom',
  '2025-12-02T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-015","level":"Executive","duration":"38 min video","thumbnail_gradient":"from-yellow-600 to-amber-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Smart Church Operations: Automation Guide',
  'smart-church-operations-automation',
  'video',
  'Church & Tech',
  'Streamline your church operations with practical automation. This video walks through setting up automated visitor follow-ups, event management workflows, donation tracking, and volunteer scheduling using affordable tools.',
  'Streamline your church operations with practical automation. This video walks through setting up automated visitor follow-ups, event management workflows, donation tracking, and volunteer scheduling using affordable tools.',
  'free',
  'published',
  'Keith L. Odom',
  '2026-01-22T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-016","level":"Beginner","duration":"33 min video","thumbnail_gradient":"from-fuchsia-600 to-purple-900","is_premium":false,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO vault_content (title, slug, content_type, category, body, excerpt, tier_required, visibility, author_name, published_at, metadata) VALUES (
  'Navigating the Moral Frontier of Generative AI in Ministry',
  'moral-frontier-gen-ai-ministry',
  'briefing',
  'AI & Ethics',
  'A strategic framework for faith-based leaders navigating the ethical landscape of generative AI. Covers data stewardship as sacred trust, bias mitigation with theological integrity, and building congregational transparency in an age of automation.',
  'A strategic framework for faith-based leaders navigating the ethical landscape of generative AI. Covers data stewardship as sacred trust, bias mitigation with theological integrity, and building congregational transparency in an age of automation.',
  'professional',
  'published',
  'Keith L. Odom',
  '2026-03-05T00:00:00Z'::timestamptz,
  '{"legacy_id":"v-017","level":"Executive","duration":"20 min read","thumbnail_gradient":"from-blue-600 to-indigo-900","is_premium":true,"conference_name":null,"conference_location":null,"files":[]}'::jsonb
) ON CONFLICT (slug) DO NOTHING;


-- Feed posts

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'Why the EU AI Act Matters for Every Church Leader', 'The EU AI Act is the most comprehensive piece of AI legislation the world has seen — and if you think it doesn''t apply to your ministry, think again. Any organization that processes data from EU citizens, uses AI tools built by EU-based companies, or deploys automated decision-making that affects people falls under its umbrella. That includes churches with global congregations, mission organizations with European partnerships, and even U.S.-based ministries using EU-developed software.

What concerns me most is the Act''s classification of "high-risk" AI systems. Automated tools that influence decisions about people — hiring, membership screening, pastoral care triage — could fall into categories that require transparency documentation, human oversight, and bias auditing. Most church leaders I speak with have never considered their tech stack through this lens.

The practical takeaway: audit every AI tool your organization uses today. Know where your data flows. Understand who built the models you rely on. The EU AI Act isn''t just European regulation — it''s a signal of what''s coming globally. The organizations that prepare now will lead; the rest will scramble.

This is a moment for proactive governance, not reactive compliance. I''m urging every leader in my network to treat this as a strategic priority, not a legal footnote.', 'insight', ARRAY['Regulatory Shifts']::text[], 'published', '2026-02-27T00:00:00Z'::timestamptz, '{"legacy_id":"post-01","category":"Regulatory Shifts","read_time":"6 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-01'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'OpenAI''s Latest Model: What It Means for Enterprise Strategy', 'OpenAI''s newest model release represents a genuine inflection point for enterprise adoption. The improvements in reasoning, context retention, and multimodal capability aren''t incremental — they''re architectural. For executives who''ve been cautiously piloting AI, this changes the calculus on what''s possible at scale.

What stands out to me is the leap in structured output reliability. Previous models could generate plausible text but struggled with consistent, structured data extraction — the kind enterprises need for workflow automation, reporting pipelines, and decision support systems. That gap is closing fast.

For church and nonprofit leaders specifically, this means AI-powered administrative tools are about to get dramatically more capable. Think sermon series planning that actually understands theological nuance, volunteer coordination that accounts for relational dynamics, and donor communication that feels genuinely personal rather than templated.

The strategic question isn''t whether to adopt anymore. It''s how fast you can build the internal capability to adopt responsibly. That means training your team, establishing governance frameworks, and choosing partners who understand both the technology and your mission.', 'insight', ARRAY['AI Breakthroughs']::text[], 'published', '2026-02-25T00:00:00Z'::timestamptz, '{"legacy_id":"post-02","category":"AI Breakthroughs","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-02'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'The Ethical Blind Spot in Automated Ministry Tools', 'I''ve been reviewing several "AI-powered ministry platforms" over the past few weeks, and I keep encountering the same troubling pattern: these tools optimize for engagement metrics while ignoring pastoral ethics entirely. Click-through rates on prayer request follow-ups. Open rates on grief support emails. Conversion funnels for small group signups. The language of Silicon Valley has colonized the language of care.

The ethical blind spot is this: when we automate pastoral touchpoints, we''re making an implicit promise that a human cared enough to reach out — when in reality, an algorithm decided it was statistically optimal. That''s not ministry. That''s marketing wearing a clerical collar.

I''m not anti-technology. Far from it. But I am insistent that we draw clear lines between automation that supports human ministry and automation that replaces it while pretending otherwise. A well-designed system flags people who need human attention. A poorly designed one makes humans feel attended to when they aren''t.

Every ministry leader deploying these tools needs to ask: if my congregants knew exactly how this works, would they feel cared for or deceived? That''s the test. And too many tools fail it.', 'insight', ARRAY['Tech Ethics']::text[], 'published', '2026-02-22T00:00:00Z'::timestamptz, '{"legacy_id":"post-03","category":"Tech Ethics","read_time":"4 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-03'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, '5 Signs Your Organization Isn''t Ready for AI', 'After consulting with dozens of organizations on AI readiness, I''ve identified five reliable indicators that an organization will struggle with AI adoption — regardless of budget or enthusiasm. These aren''t technical barriers. They''re cultural and structural ones.

**1. No data governance framework.** If you can''t answer "where is our data, who owns it, and who can access it?" you aren''t ready. AI amplifies existing data chaos.

**2. Decision-making is personality-driven, not process-driven.** AI augments processes. If your organization runs on the intuition of two or three key people, AI has nothing systematic to enhance.

**3. Your team fears measurement.** AI surfaces patterns, including uncomfortable ones. Organizations that resist transparency will resist the insights AI provides.

**4. Technology decisions are made by vendors, not strategy.** If your tech stack is a collection of whatever the last salesperson recommended, you lack the strategic coherence AI integration requires.

**5. You haven''t defined what "success" means.** AI is extraordinarily good at optimizing toward a goal. If you haven''t articulated your goals with precision, you''ll optimize toward the wrong things — fast.

The good news: every one of these is fixable. But they must be fixed *before* you sign an AI contract, not after.', 'insight', ARRAY['Leadership']::text[], 'published', '2026-02-20T00:00:00Z'::timestamptz, '{"legacy_id":"post-04","category":"Leadership","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-04'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'How One Megachurch Built an AI Governance Board', 'Last month I had the privilege of advising a 12,000-member church in Texas as they established what I believe is the first formal AI governance board in American church history. The process was instructive — and replicable.

The board includes seven members: the lead pastor, the executive pastor, the IT director, a congregant who works in tech ethics at a major university, a data privacy attorney from the congregation, a youth ministry representative, and an outside advisor (full disclosure — that''s me). The diversity is intentional. AI governance can''t live solely in the IT department.

Their charter covers four domains: data stewardship (how congregant data is collected, stored, and used), tool evaluation (a rubric for approving new AI-powered tools), transparency standards (what the congregation is told about AI use), and incident response (what happens when something goes wrong).

What impressed me most was the lead pastor''s framing. He told his board: "We are stewards of trust. Every piece of technology we deploy either honors that trust or erodes it. This board exists to make sure we choose wisely." That''s the posture every organization needs.', 'insight', ARRAY['Church Implications']::text[], 'published', '2026-02-18T00:00:00Z'::timestamptz, '{"legacy_id":"post-05","category":"Church Implications","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-05'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'The Hidden Cost of Free AI Tools', 'There''s a maxim in technology that remains stubbornly true: if you''re not paying for the product, you are the product. This applies with particular force to the wave of "free" AI tools flooding the church and nonprofit market.

I''ve analyzed the terms of service for eleven popular free AI platforms marketed to churches. Nine of them retain broad rights to use input data for model training. Seven share aggregated usage data with third parties. Four have terms that could allow congregant prayer requests, counseling notes, or pastoral communications to be incorporated into training datasets.

The financial math is simple: running large language models is expensive. A company offering free AI services to churches is subsidizing that cost somehow. Usually, the subsidy comes from data — your data. Your congregation''s data.

This doesn''t mean every free tool is predatory. Some are genuinely philanthropic. But the default posture should be skepticism, not gratitude. Read the terms of service. Ask where the data goes. Demand clear answers. And if an organization can''t tell you exactly how they fund their free tier, assume the answer is "with your information."', 'insight', ARRAY['Tech Ethics']::text[], 'published', '2026-02-15T00:00:00Z'::timestamptz, '{"legacy_id":"post-06","category":"Tech Ethics","read_time":"4 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-06'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'AI-Powered Giving Platforms: Promise and Peril', 'Several new platforms are using AI to optimize charitable giving — predicting donor capacity, personalizing ask amounts, timing solicitations based on behavioral data, and even adjusting messaging tone based on psychological profiles. The results are impressive: some organizations report 30-40% increases in giving after implementing these tools.

But I want to press on the ethics here, because "it works" is not the same as "it''s right." When an AI system analyzes a congregant''s financial behavior, social media activity, and engagement patterns to determine the optimal moment and amount for a giving request, we''ve crossed from stewardship into manipulation — even if the cause is good.

The biblical model of generosity is rooted in cheerful, voluntary giving — not algorithmically optimized extraction. There''s a meaningful difference between making it easy for people to give and engineering situations designed to maximize the amount they give.

My recommendation: use AI to remove friction from giving (better platforms, easier processes, clearer communication). Don''t use AI to manufacture urgency, exploit emotional moments, or personalize pressure. The line matters, and the organizations that respect it will build deeper trust over the long term.', 'insight', ARRAY['Church Implications']::text[], 'published', '2026-02-13T00:00:00Z'::timestamptz, '{"legacy_id":"post-07","category":"Church Implications","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-07'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'Anthropic''s Constitutional AI: A Framework Leaders Should Understand', 'Anthropic''s approach to AI safety — what they call Constitutional AI — deserves serious attention from organizational leaders, not just technologists. The core idea is that AI systems should be governed by explicit, written principles rather than implicit training biases. The model is given a "constitution" of values and trained to self-correct against them.

Why does this matter for non-technical leaders? Because it mirrors exactly what effective organizations do: they articulate their values explicitly and build systems of accountability around them. The parallel between Constitutional AI and organizational governance is striking — and instructive.

If your organization were to write a "constitution" for its AI use, what would it say? I''d suggest starting with three principles: transparency (we will tell people when AI is involved), proportionality (we will use the least invasive tool that achieves our goal), and reversibility (we will maintain the ability to undo AI-driven decisions). These aren''t just AI principles — they''re good governance principles.

The organizations that thrive in the AI era will be those that approach AI governance with the same seriousness they bring to financial governance. Anthropic''s framework shows what that looks like at the model level. The question is whether leaders will apply the same rigor at the organizational level.', 'insight', ARRAY['AI Breakthroughs']::text[], 'published', '2026-02-10T00:00:00Z'::timestamptz, '{"legacy_id":"post-08","category":"AI Breakthroughs","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-08'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'State-Level AI Legislation: What''s Coming in 2026', 'While the federal government debates comprehensive AI legislation, the states aren''t waiting. I''m tracking 47 active AI-related bills across 23 states, and several will have direct implications for how organizations deploy AI tools. Here''s what leaders need to know.

**California''s AB-331** would require any organization using AI in "consequential decisions" to conduct annual impact assessments and maintain detailed records. The definition of "consequential" is broad enough to include hiring, volunteer screening, and program eligibility determinations — all common church and nonprofit activities.

**Texas SB-1742** focuses on AI transparency, requiring organizations to disclose when AI is used in communications. If your church uses AI to generate newsletters, respond to inquiries, or draft pastoral communications, you''d need to say so.

**New York''s proposed AI Accountability Act** would create a state registry of "high-impact AI systems" with mandatory bias auditing. The compliance costs alone could be significant for smaller organizations.

My advice: don''t wait for legislation to force your hand. Adopt transparency and accountability practices now. Organizations that build good governance proactively will find compliance straightforward. Those that wait will find it expensive and disruptive.', 'insight', ARRAY['Regulatory Shifts']::text[], 'published', '2026-02-08T00:00:00Z'::timestamptz, '{"legacy_id":"post-09","category":"Regulatory Shifts","read_time":"6 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-09'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'Building AI Literacy in Your Leadership Team', 'The single highest-leverage investment any organization can make right now is building AI literacy among its senior leaders. Not technical proficiency — literacy. The ability to ask the right questions, evaluate vendor claims, understand risk, and make informed strategic decisions about AI adoption.

I''ve developed a simple framework I call the "Four Cs" of AI literacy for leaders: **Capability** (what can AI actually do today, stripped of hype?), **Constraints** (what are the real limitations, failure modes, and risks?), **Cost** (what does responsible deployment actually require in terms of money, time, and expertise?), and **Culture** (how will AI change your organizational culture, and is that change aligned with your values?).

Most AI education for leaders focuses exclusively on capability — the exciting demos, the impressive outputs, the transformative potential. That''s the easy part. The hard part is building genuine understanding of constraints, costs, and cultural impact. Leaders who only understand capability will make enthusiastic but reckless decisions.

Start with a half-day workshop for your senior team. Not a vendor pitch — an honest educational session that covers all four Cs equally. Bring in someone who will tell you what AI can''t do, not just what it can. That foundation will pay dividends in every AI decision that follows.', 'insight', ARRAY['Leadership']::text[], 'published', '2026-02-05T00:00:00Z'::timestamptz, '{"legacy_id":"post-10","category":"Leadership","read_time":"4 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-10'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'When AI Gets Pastoral Care Wrong: Three Case Studies', 'I want to share three anonymized case studies from organizations that deployed AI in pastoral care contexts with troubling results. These aren''t hypotheticals — they''re real situations I''ve encountered in my consulting work.

**Case 1: The grief chatbot.** A church deployed an AI chatbot to provide initial grief support resources. When a congregant expressed suicidal ideation, the bot responded with generic encouragement and a link to a resource page rather than triggering an immediate human escalation. The congregant later reported feeling "dismissed by the church." Fortunately, they reached out to a friend separately. The system had no crisis detection protocol.

**Case 2: The automated follow-up.** A ministry used AI to generate personalized follow-up messages after pastoral counseling sessions. The AI, trained on general conversation patterns, sent a cheerful "checking in!" message to someone processing a traumatic experience. The tone mismatch caused the person to disengage from counseling entirely.

**Case 3: The prayer analysis.** A church ran submitted prayer requests through an AI analysis tool to identify "trends" for sermon planning. Congregants discovered their deeply personal prayers were being aggregated and analyzed. The breach of perceived confidentiality was devastating to trust.

Each case shares a common failure: the absence of pastoral wisdom in system design. Technology teams built what was technically possible without consulting those who understood the human dynamics involved.', 'insight', ARRAY['Tech Ethics']::text[], 'published', '2026-02-02T00:00:00Z'::timestamptz, '{"legacy_id":"post-11","category":"Tech Ethics","read_time":"6 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-11'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'The Executive''s 90-Day AI Readiness Roadmap', 'After years of helping organizations navigate AI adoption, I''ve distilled the process into a 90-day roadmap that any executive can follow. This isn''t about deploying AI — it''s about building the organizational foundation that makes responsible deployment possible.

**Days 1-30: Assessment.** Audit your current technology stack. Interview department heads about pain points. Survey staff attitudes toward AI. Review your data governance policies (or acknowledge you don''t have any). Document everything. The goal is an honest picture of where you are today.

**Days 31-60: Framework.** Develop your AI governance principles. Define decision-making authority for AI adoption. Create an evaluation rubric for AI tools. Draft your transparency policy. Identify training needs. Build your governance board or committee. The goal is a clear structure for making AI decisions.

**Days 61-90: Pilot.** Select one low-risk, high-visibility use case. Deploy a single AI tool within your governance framework. Document lessons learned. Gather feedback from all stakeholders. Refine your framework based on real experience. The goal is organizational learning, not transformation.

Notice what''s absent from this roadmap: vendor selection, budget allocation, and technical implementation. Those come later. The 90-day roadmap is about organizational readiness — the prerequisite that most organizations skip, to their lasting regret.', 'insight', ARRAY['Leadership']::text[], 'published', '2026-01-30T00:00:00Z'::timestamptz, '{"legacy_id":"post-12","category":"Leadership","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-12'
);

INSERT INTO feed_posts (author_id, title, body, post_type, tags, visibility, published_at, metadata)
SELECT NULL, 'Google DeepMind''s Gemini and the Multimodal Future', 'Google DeepMind''s Gemini models represent something genuinely new: AI that processes text, images, audio, and video natively rather than through bolted-on adapters. For organizations still thinking about AI as "a better search engine" or "a writing assistant," this is a wake-up call about the pace of change.

The multimodal capability that interests me most for organizational leaders is real-time document understanding. Imagine feeding your entire policy manual, org chart, financial reports, and strategic plan into a system that can answer questions across all of them simultaneously. Not keyword search — genuine comprehension of how your budget allocation connects to your strategic priorities connects to your staffing plan.

For churches and ministries, the implications extend to worship planning (AI that understands liturgical calendars, sermon arcs, musical themes, and congregational feedback simultaneously), facility management (systems that correlate usage data, maintenance schedules, and budget constraints), and community engagement (platforms that synthesize attendance patterns, small group dynamics, and pastoral care needs into actionable insights).

The technology is moving faster than most leaders'' mental models. The gap between what''s possible and what leaders think is possible is widening, not narrowing. Closing that gap — through education, experimentation, and strategic reflection — is now a leadership imperative.', 'insight', ARRAY['AI Breakthroughs']::text[], 'published', '2026-01-27T00:00:00Z'::timestamptz, '{"legacy_id":"post-13","category":"AI Breakthroughs","read_time":"5 min read","is_premium":false}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM feed_posts WHERE metadata->>'legacy_id' = 'post-13'
);
