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
  gradient: string;
  accentColor: string;
  hoverBorder: string;
  hoverShadow: string;
}

const assessments: AssessmentCard[] = [
  {
    icon: Church,
    title: "Church Readiness",
    description:
      "Evaluate your ministry's digital maturity and readiness for technology-driven transformation.",
    href: "/assessments/church-readiness",
    gradient: "bg-gradient-to-br from-[#8840FF]/20 to-[#8840FF]/5",
    accentColor: "text-[#8840FF]",
    hoverBorder: "group-hover:border-[#8840FF]/40",
    hoverShadow: "group-hover:shadow-[0_0_24px_rgba(136,64,255,0.15)]",
  },
  {
    icon: Brain,
    title: "AI Readiness",
    description:
      "Gauge your organization's preparedness to adopt and scale artificial intelligence initiatives.",
    href: "/assessments/ai-readiness",
    gradient: "bg-gradient-to-br from-[#68E9FA]/20 to-[#68E9FA]/5",
    accentColor: "text-[#68E9FA]",
    hoverBorder: "group-hover:border-[#68E9FA]/40",
    hoverShadow: "group-hover:shadow-[0_0_24px_rgba(104,233,250,0.15)]",
  },
  {
    icon: Shield,
    title: "Governance",
    description:
      "Assess your governance framework for compliance, risk management, and policy alignment.",
    href: "/assessments/governance",
    gradient: "bg-gradient-to-br from-[#C8A84E]/20 to-[#C8A84E]/5",
    accentColor: "text-[#C8A84E]",
    hoverBorder: "group-hover:border-[#C8A84E]/40",
    hoverShadow: "group-hover:shadow-[0_0_24px_rgba(200,168,78,0.15)]",
  },
  {
    icon: Lock,
    title: "Cyber Risk",
    description:
      "Identify vulnerabilities and measure your cybersecurity posture against current threat landscapes.",
    href: "/assessments/cyber-risk",
    gradient: "bg-gradient-to-br from-[#F77A81]/20 to-[#F77A81]/5",
    accentColor: "text-[#F77A81]",
    hoverBorder: "group-hover:border-[#F77A81]/40",
    hoverShadow: "group-hover:shadow-[0_0_24px_rgba(247,122,129,0.15)]",
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
        <span className="w-10 h-1 bg-gradient-to-r from-[#68E9FA] to-[#37B1FF] rounded-full" />
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
          Assess Your Readiness
        </h2>
      </div>
      <p className="text-sm text-white/50 mb-10 ml-14">
        Quick, targeted assessments to benchmark where you stand.
      </p>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
                <div
                  className={`h-full ${item.gradient} border border-[#0E3783] rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-1 ${item.hoverBorder} ${item.hoverShadow}`}
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 mb-4 transition-colors duration-300 group-hover:bg-white/10`}>
                    <Icon className={`w-5 h-5 ${item.accentColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#68E9FA] transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/55 leading-relaxed">
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
