"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Church, Brain, Shield, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AssessmentCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const assessments: AssessmentCard[] = [
  {
    icon: Church,
    title: "Church Readiness",
    description:
      "Evaluate your ministry's digital maturity and readiness for technology-driven transformation.",
    href: "/assessments/church-readiness",
  },
  {
    icon: Brain,
    title: "AI Readiness",
    description:
      "Gauge your organization's preparedness to adopt and scale artificial intelligence initiatives.",
    href: "/assessments/ai-readiness",
  },
  {
    icon: Shield,
    title: "Governance",
    description:
      "Assess your governance framework for compliance, risk management, and policy alignment.",
    href: "/assessments/governance",
  },
  {
    icon: Lock,
    title: "Cyber Risk",
    description:
      "Identify vulnerabilities and measure your cybersecurity posture against current threat landscapes.",
    href: "/assessments/cyber-risk",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function QuickAssessmentCTA() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-3">
        <span className="w-8 h-0.5 bg-klo-gold rounded-full" />
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-klo-text">
          Assess Your Readiness
        </h2>
      </div>
      <p className="text-sm text-klo-muted mb-8 ml-12">
        Quick, targeted assessments to benchmark where you stand.
      </p>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {assessments.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} variants={cardVariants}>
              <Link href={item.href} className="block group h-full">
                <div className="h-full bg-klo-dark border border-klo-slate rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-klo-gold/40 group-hover:shadow-[0_0_20px_rgba(200,168,78,0.1)]">
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-klo-slate mb-4 transition-colors duration-300 group-hover:bg-klo-gold/10">
                    <Icon className="w-5 h-5 text-klo-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-klo-text mb-2 group-hover:text-klo-gold transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-klo-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
