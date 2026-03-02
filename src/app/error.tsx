"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  // Sanitize error message — only show generic info in production
  const displayMessage =
    process.env.NODE_ENV === "development"
      ? error.message
      : "An unexpected error occurred. Please try again or return home.";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
    >
      {/* Icon */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertTriangle size={40} className="text-red-400" aria-hidden="true" />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-3xl sm:text-4xl font-bold text-klo-text mb-4"
      >
        Something Went Wrong
      </motion.h1>

      {/* Error message */}
      <motion.p
        variants={itemVariants}
        className="text-klo-muted text-lg max-w-md mb-10"
      >
        {displayMessage}
      </motion.p>

      {/* Action buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-3 bg-klo-gold text-klo-navy font-bold rounded-lg hover:bg-klo-gold/90 transition-colors duration-200"
        >
          <RefreshCw size={18} aria-hidden="true" />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 border border-klo-slate text-klo-text rounded-lg hover:text-klo-gold hover:border-klo-gold/50 transition-colors duration-200"
        >
          <Home size={18} aria-hidden="true" />
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
