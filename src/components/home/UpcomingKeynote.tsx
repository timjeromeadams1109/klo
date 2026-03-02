"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const mockEvent = {
  date: "April 18, 2026",
  name: "Future of Faith & Technology Summit",
  location: "Atlanta, GA",
};

export default function UpcomingKeynote() {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-8">
        <span className="w-8 h-0.5 bg-klo-gold rounded-full" />
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-klo-text">
          Upcoming Keynote
        </h2>
      </div>

      {/* Keynote card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-klo-dark border border-klo-slate rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Gold left accent bar */}
            <div className="hidden sm:block w-1.5 bg-klo-gold shrink-0" />
            {/* Mobile top accent bar */}
            <div className="sm:hidden h-1 bg-klo-gold" />

            {/* Content */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Event details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-klo-gold font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{mockEvent.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-klo-text">
                  {mockEvent.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-klo-muted">
                  <MapPin className="w-4 h-4" />
                  <span>{mockEvent.location}</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-klo-gold text-klo-navy font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:bg-klo-gold-light hover:shadow-lg hover:shadow-klo-gold/20 active:scale-[0.98] shrink-0 w-full sm:w-auto"
              >
                Request Keith to Speak
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
