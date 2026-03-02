"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-0 left-0 z-[100] bg-klo-navy text-klo-gold font-bold px-6 py-3 border-b-2 border-klo-gold focus:outline-none focus:ring-2 focus:ring-klo-gold rounded-br-lg"
    >
      Skip to main content
    </a>
  );
}
