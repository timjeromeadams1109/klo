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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#011A5E] via-[#022886] to-[#022886]">
      {/* Animated gradient orb - cyan */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(104,233,250,0.45) 0%, rgba(104,233,250,0.12) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary orb - purple */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(136,64,255,0.35) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle particle/light dots */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-[#68E9FA]/30 blur-[1px] pointer-events-none"
        animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#68E9FA]/25 blur-[1px] pointer-events-none"
        animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[20%] w-1 h-1 rounded-full bg-[#8840FF]/30 blur-[1px] pointer-events-none"
        animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#68E9FA]/20 blur-[1px] pointer-events-none"
        animate={{ opacity: [0.1, 0.45, 0.1], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[40%] right-[8%] w-1 h-1 rounded-full bg-[#C8A84E]/20 blur-[1px] pointer-events-none"
        animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Overline accent - cyan bar */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <span className="inline-block w-16 h-1 bg-gradient-to-r from-[#68E9FA] to-[#37B1FF] rounded-full" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-white uppercase mb-6"
        >
          KEITH L. ODOM
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium tracking-wide mb-4"
        >
          Technology Innovator{" "}
          <span className="text-[#68E9FA]/60 mx-1">&bull;</span> Speaker{" "}
          <span className="text-[#68E9FA]/60 mx-1">&bull;</span> Pastor
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed mb-12"
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
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#68E9FA] to-[#37B1FF] text-[#022886] font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#68E9FA]/25 hover:scale-105 active:scale-[0.98] w-full sm:w-auto"
          >
            Explore the Vault
          </Link>
          <Link
            href="/advisor"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:border-white/60 hover:bg-white/5 active:scale-[0.98] w-full sm:w-auto"
          >
            Ask the AI Advisor
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
