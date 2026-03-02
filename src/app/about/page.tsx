"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  BriefcaseBusiness,
  FolderKanban,
  Mic2,
  ArrowRight,
} from "lucide-react";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import AffiliationStrip from "@/components/affiliations/AffiliationStrip";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                   */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Service cards data                                                  */
/* ------------------------------------------------------------------ */

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

const services: ServiceCard[] = [
  {
    icon: Monitor,
    title: "IT Consulting",
    description:
      "Enterprise technology strategy, infrastructure modernization, and digital transformation guidance tailored for organizations seeking sustainable growth.",
    badge: "Strategy",
  },
  {
    icon: BriefcaseBusiness,
    title: "CTO Services",
    description:
      "Fractional and full-engagement CTO leadership, aligning technology vision with business objectives and driving innovation across the organization.",
    badge: "Leadership",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "End-to-end program delivery using agile and hybrid methodologies, ensuring complex initiatives ship on time and within budget.",
    badge: "Delivery",
  },
  {
    icon: Mic2,
    title: "Conference Speaking",
    description:
      "Compelling keynotes and workshops at the intersection of faith, technology, and leadership that inspire audiences to take bold action.",
    badge: "Speaking",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ====== Hero ====== */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-klo-gold/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge variant="gold" className="mb-6">
              Technology Innovator &middot; Speaker &middot; Pastor
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display text-4xl md:text-6xl font-bold text-klo-text leading-tight"
          >
            Keith L. Odom
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 text-lg md:text-xl text-klo-muted max-w-2xl mx-auto leading-relaxed"
          >
            Bridging faith, technology, and leadership to empower organizations
            and communities for the digital age.
          </motion.p>
        </motion.div>
      </section>

      {/* ====== About Keith ====== */}
      <section className="px-6 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-display text-3xl md:text-4xl font-bold text-klo-text mb-8"
          >
            About Keith
          </motion.h2>

          <div className="space-y-6 text-klo-muted leading-relaxed text-base md:text-lg">
            <motion.p variants={fadeUp} custom={1}>
              Keith L. Odom is a distinguished technology innovator, executive
              strategist, and faith leader whose career spans more than two
              decades at the convergence of enterprise technology and community
              transformation. With deep roots in both Silicon Valley-caliber
              innovation and ministry leadership, Keith brings a rare
              perspective that unites technical excellence with purpose-driven
              vision.
            </motion.p>

            <motion.p variants={fadeUp} custom={2}>
              Keith&rsquo;s journey through the technology landscape includes
              formative work connected to the MIT Media Lab, where he engaged
              with cutting-edge research in human-computer interaction, emerging
              media, and the future of digital ecosystems. This experience
              grounded his approach in rigorous, research-informed thinking
              while fueling a passion for making technology accessible and
              impactful for everyday people and organizations.
            </motion.p>

            <motion.p variants={fadeUp} custom={3}>
              As the founder of{" "}
              <span className="text-klo-gold font-medium">Axtegrity</span>,
              Keith leads a consultancy focused on IT strategy, governance, and
              digital transformation for enterprises, nonprofits, and
              faith-based organizations. Through Axtegrity, he has helped
              organizations modernize their technology infrastructure,
              strengthen their cybersecurity posture, and adopt AI-driven
              strategies that create lasting competitive advantage.
            </motion.p>

            <motion.p variants={fadeUp} custom={4}>
              A visionary at the intersection of faith and technology, Keith
              created{" "}
              <span className="text-klo-gold font-medium">TechChurch</span>
              &mdash;a pioneering initiative that equips churches and ministries
              with the tools, frameworks, and digital literacy needed to thrive
              in a rapidly evolving technological landscape. He also organizes
              the{" "}
              <span className="text-klo-gold font-medium">
                Church &amp; Tech Summit
              </span>
              , a premier gathering that convenes pastors, technologists, and
              leaders to explore how innovation can amplify ministry impact and
              community engagement.
            </motion.p>

            <motion.p variants={fadeUp} custom={5}>
              Beyond the boardroom and the conference stage, Keith serves as
              pastor at{" "}
              <span className="text-klo-gold font-medium">
                Place of Grace COGIC
              </span>
              , where he shepherds a vibrant congregation and models the
              integration of faith with forward-thinking leadership. His
              ministry work within the Church of God in Christ (COGIC)
              denomination reflects a deep commitment to spiritual growth,
              community empowerment, and service.
            </motion.p>

            <motion.p variants={fadeUp} custom={6}>
              Whether advising C-suite executives on digital strategy,
              delivering keynotes that challenge audiences to rethink the
              relationship between innovation and purpose, or mentoring the next
              generation of technology leaders, Keith L. Odom operates with a
              singular conviction: that technology, guided by wisdom and faith,
              has the power to transform lives, organizations, and communities.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ====== Services ====== */}
      <section className="px-6 py-16 md:py-24 bg-klo-dark/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-klo-text mb-4">
              Services
            </h2>
            <p className="text-klo-muted max-w-xl mx-auto">
              Comprehensive technology leadership and strategic advisory for
              organizations ready to transform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={fadeUp} custom={i + 1}>
                  <Card hoverable className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-lg bg-klo-gold/10 flex items-center justify-center">
                        <Icon size={22} className="text-klo-gold" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-klo-text">
                            {service.title}
                          </h3>
                          <Badge variant="gold">{service.badge}</Badge>
                        </div>
                        <p className="text-klo-muted text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            custom={6}
            className="mt-10 text-center"
          >
            <Button variant="secondary" size="lg" href="/booking">
              Work With Keith
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ====== Affiliations ====== */}
      <AffiliationStrip />
    </div>
  );
}
