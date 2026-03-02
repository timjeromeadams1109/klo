"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, BookOpen, MessageSquare } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      ease: "easeOut" as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const popularLinks = [
  { label: "AI Advisor", href: "/advisor", icon: MessageSquare },
  { label: "Content Vault", href: "/vault", icon: BookOpen },
  { label: "Assessments", href: "/assessments", icon: Search },
];

export default function NotFound() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
    >
      {/* Large 404 with gold gradient */}
      <motion.div variants={itemVariants} className="mb-8">
        <span className="text-[10rem] sm:text-[14rem] font-display font-bold leading-none bg-gradient-to-br from-klo-gold via-yellow-400 to-klo-gold bg-clip-text text-transparent select-none">
          404
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-3xl sm:text-4xl font-bold text-klo-text mb-4"
      >
        Page Not Found
      </motion.h1>

      {/* Message */}
      <motion.p
        variants={itemVariants}
        className="text-klo-muted text-lg max-w-md mb-10"
      >
        The page you are looking for does not exist or has been moved. Try one of
        the links below or head back home.
      </motion.p>

      {/* Popular page links */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-4 mb-10"
      >
        {popularLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-klo-slate text-klo-text hover:text-klo-gold hover:border-klo-gold/50 transition-colors duration-200"
            >
              <Icon size={16} aria-hidden="true" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          );
        })}
      </motion.div>

      {/* Go Home button */}
      <motion.div variants={itemVariants}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-klo-gold text-klo-navy font-bold rounded-lg hover:bg-klo-gold/90 transition-colors duration-200"
        >
          <Home size={18} aria-hidden="true" />
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
