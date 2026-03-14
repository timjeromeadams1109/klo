# KLO Site Content Map — Quick Reference for Tim

> When Keith asks to change something, find the file here, edit, push. Under 10 minutes.

---

## Homepage (`/`)

| Section | File | What to Edit |
|---------|------|--------------|
| Hero headline | `src/components/home/HeroBanner.tsx:80` | "Keith L. Odom" |
| Hero tagline | `src/components/home/HeroBanner.tsx:88-89` | "Empowering organizations with AI-driven..." |
| Hero label | `src/components/home/HeroBanner.tsx:72` | "Technology Innovator • Strategic Advisor • Speaker" |
| Hero CTA buttons | `src/components/home/HeroBanner.tsx:101,110` | "KLO Intelligence", "Book a Consultation" |
| Hero image | `src/components/home/HeroBanner.tsx:32` | `/images/keith/KO.jpg` |
| Latest Brief title | `src/components/home/LatestBrief.tsx:9` | Brief title text |
| Latest Brief excerpt | `src/components/home/LatestBrief.tsx:11-12` | Brief description |
| Latest Brief image | `src/components/home/LatestBrief.tsx:38` | `/images/keith/b.jpg` |
| Live Events heading | `src/components/home/UpcomingKeynote.tsx:59` | "Live Events" |

## About Page (`/about`)

| Section | File | What to Edit |
|---------|------|--------------|
| Badge label | `src/app/about/page.tsx:106` | "Technology Innovator · Speaker · Pastor" |
| Name heading | `src/app/about/page.tsx:115` | "Keith L. Odom" |
| Tagline | `src/app/about/page.tsx:123-124` | "Bridging faith, technology..." |
| Portrait image | `src/app/about/page.tsx:166` | `/images/keith/KO.jpg` |
| Bio paragraphs | `src/app/about/page.tsx:178-251` | 6 paragraphs of bio text |
| Services cards | `src/app/about/page.tsx:51-84` | IT Consulting, CTO, PM, Speaking |
| Services CTA | `src/app/about/page.tsx:317` | "Work With Keith" |

## Assessments (`/assessments`)

| Section | File | What to Edit |
|---------|------|--------------|
| Page title | `src/app/assessments/page.tsx:74-76` | "Digital Readiness Assessments" |
| Page description | `src/app/assessments/page.tsx:77-80` | Intro paragraph |
| Assessment cards | `src/lib/constants.ts:204-246` | Titles, descriptions for all 4 assessments |

## Vault (`/vault`)

| Section | File | What to Edit |
|---------|------|--------------|
| Page title | `src/app/vault/page.tsx:117-119` | "Insight Vault" |
| Page description | `src/app/vault/page.tsx:128-130` | "A curated library..." |
| Vault content items | `src/lib/vault-data.ts` | All vault articles/resources |

## Book a Consultation (`/booking`)

| Section | File | What to Edit |
|---------|------|--------------|
| Hero heading | `src/app/booking/page.tsx:98` | "Book Keith L. Odom" |
| Hero tagline | `src/app/booking/page.tsx:106-107` | "Keynotes, workshops..." |
| Quick stats | `src/app/booking/page.tsx:47-68` | "50+ Organizations", "20+ Years", etc. |
| Form title | `src/app/booking/page.tsx:165` | "Submit a Booking Inquiry" |

## Consult Page (`/consult`)

| Section | File | What to Edit |
|---------|------|--------------|
| Hero heading | `src/app/consult/page.tsx:240` | "Consult with Keith" |
| Hero tagline | `src/app/consult/page.tsx:248-250` | "One-on-one strategic guidance..." |
| Consultation topics | `src/app/consult/page.tsx:56-147` | 6 topic cards with bullets |
| Form title | `src/app/consult/page.tsx:302` | "Request a Consultation" |

## Events (`/events`)

| Section | File | What to Edit |
|---------|------|--------------|
| Hero heading | `src/app/events/page.tsx:268` | "Live Events" |
| Hero description | `src/app/events/page.tsx:276-277` | "Conferences, keynotes..." |
| CTA heading | `src/app/events/page.tsx:613` | "Want Keith at Your Event?" |
| CTA button | `src/app/events/page.tsx:623` | "Invite Keith To Speak" |

## KLO Intelligence / Advisor (`/advisor`)

| Section | File | What to Edit |
|---------|------|--------------|
| Title | `src/app/advisor/page.tsx:81` | "Ask Keith" |
| Subtitle | `src/app/advisor/page.tsx:88` | "AI Strategic Advisor" |
| AI system prompt | `src/lib/constants.ts:13-37` | Keith's background for AI |
| Disclaimer | `src/app/advisor/page.tsx:124-125` | "AI-generated guidance..." |

## Pricing (`/pricing`)

| Section | File | What to Edit |
|---------|------|--------------|
| Page heading | `src/app/pricing/page.tsx:261-262` | "Choose Your Plan" |
| Tier names/prices | `src/lib/constants.ts:146-196` | Explorer ($0), Pro ($29), Executive ($99) |
| FAQs | `src/app/pricing/page.tsx:94-120` | 5 FAQ items |

## Navigation & Footer

| Section | File | What to Edit |
|---------|------|--------------|
| Nav links | `src/components/layout/TopNav.tsx:18-27` | Link labels and paths |
| Footer bio | `src/components/layout/Footer.tsx:31-42` | Bio text |
| Footer links | `src/components/layout/Footer.tsx:45-62` | Quick links list |
| Social links | `src/components/layout/Footer.tsx:64-82` | LinkedIn, Twitter, Instagram URLs |
| Copyright | `src/components/layout/Footer.tsx:143-148` | Copyright text |

## SEO & Metadata

| Section | File | What to Edit |
|---------|------|--------------|
| Site title | `src/app/layout.tsx:37` | "Keith L. Odom \| AI Strategist..." |
| Site description | `src/app/layout.tsx:38-39` | Meta description |
| OG image | `src/app/layout.tsx:49` | `/images/og-image.png` |
| Site constants | `src/lib/constants.ts:253-258` | SITE_NAME, SITE_URL, CONTACT_EMAIL |

## Images

All in `/public/images/`:
| Image | Used For |
|-------|----------|
| `keith/KO.jpg` | Main portrait (hero, about) |
| `keith/a.jpg` | IT Consulting card |
| `keith/b.jpg` | CTO Services / Latest Brief |
| `keith/c.jpg` | Project Management card |
| `keith/d.jpg` | Conference Speaking card |
| `logo-white.png` | Nav and footer logo |
| `og-image.png` | Social media preview |

---

## Workflow

1. Keith requests a change
2. Find the section in this map
3. Open the file, edit the text/image
4. `git add <file> && git commit -m "Update <section>" && git push`
5. Vercel auto-deploys (or `npx vercel --prod`)
6. Reply to Keith with confirmation
