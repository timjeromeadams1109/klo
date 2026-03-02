"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HeroBanner() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-klo-navy via-klo-navy/90 to-transparent" />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,168,78,0.4) 0%, rgba(200,168,78,0.1) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary subtle orb */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Overline accent */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <span className="inline-block w-12 h-0.5 bg-klo-gold rounded-full" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-klo-gold mb-6"
        >
          KEITH L. ODOM
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl text-klo-text/80 font-medium tracking-wide mb-4"
        >
          Technology Innovator{" "}
          <span className="text-klo-gold/60 mx-1">&bull;</span> Speaker{" "}
          <span className="text-klo-gold/60 mx-1">&bull;</span> Pastor
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-klo-muted leading-relaxed mb-10"
        >
          Empowering leaders and organizations at the intersection of
          technology, faith, and strategy.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/vault"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-klo-gold text-klo-navy font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:bg-klo-gold-light hover:shadow-lg hover:shadow-klo-gold/20 active:scale-[0.98] w-full sm:w-auto"
          >
            Explore the Vault
          </Link>
          <Link
            href="/advisor"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-klo-gold/50 text-klo-gold font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:border-klo-gold hover:bg-klo-gold/10 active:scale-[0.98] w-full sm:w-auto"
          >
            Ask the AI Advisor
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
