"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, User } from "lucide-react";
import Badge from "@/components/shared/Badge";
import { getTypeLabel } from "@/lib/vault-data";
import type { VaultItem } from "@/lib/vault-data";

interface DetailHeroProps {
  item: VaultItem;
  heroSubtitle: string;
}

export default function DetailHero({ item, heroSubtitle }: DetailHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailGradient} opacity-20`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D1117]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <Badge variant="muted">{getTypeLabel(item.type)}</Badge>
            <Badge variant="muted">{item.category}</Badge>
            <Badge variant="blue">{item.level}</Badge>
            {item.isPremium ? (
              <Badge variant="gold">Premium</Badge>
            ) : (
              <Badge variant="green">Free</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-klo-text leading-tight mb-4 max-w-4xl">
            {item.title}
          </h1>

          {/* Subtitle */}
          <p className="text-klo-muted text-lg leading-relaxed mb-8 max-w-3xl">
            {heroSubtitle}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-klo-muted">
            <div className="flex items-center gap-2">
              <User size={15} className="text-klo-gold" />
              <span>{item.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-klo-gold" />
              <span>
                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-klo-gold" />
              <span>{item.duration}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
