"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Lock, Play, FileText, Layout, Shield, Layers, Video } from "lucide-react";
import Badge from "@/components/shared/Badge";
import type { VaultItem, VaultType } from "@/lib/vault-data";
import { getTypeLabel } from "@/lib/vault-data";

interface ContentCardProps {
  item: VaultItem;
  index?: number;
}

const typeIcons: Record<VaultType, React.ReactNode> = {
  video: <Play size={14} />,
  briefing: <FileText size={14} />,
  template: <Layout size={14} />,
  policy: <Shield size={14} />,
  framework: <Layers size={14} />,
  replay: <Video size={14} />,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: "easeOut" as const,
    },
  }),
};

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <Link href={`/vault/${item.slug}`} className="block group">
        <div className="bg-[#011A5E] border border-[#0E3783] rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#68E9FA]/30 group-hover:shadow-lg group-hover:shadow-[#68E9FA]/5">
          {/* Thumbnail */}
          <div
            className={`relative h-40 bg-gradient-to-br ${item.thumbnailGradient} flex items-center justify-center`}
          >
            {/* Type badge overlay */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-black/50 text-white backdrop-blur-sm">
                {typeIcons[item.type]}
                {getTypeLabel(item.type)}
              </span>
            </div>

            {/* Premium lock overlay */}
            {item.isPremium && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <Lock size={18} className="text-white/80" />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Badges row */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="muted">{item.category}</Badge>
              <Badge variant="blue">{item.level}</Badge>
              {item.isPremium ? (
                <Badge variant="gold">Premium</Badge>
              ) : (
                <Badge variant="green">Free</Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="font-display text-base font-semibold text-klo-text mb-2 line-clamp-2 group-hover:text-[#68E9FA] transition-colors duration-200">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-klo-muted leading-relaxed line-clamp-2 mb-4">
              {item.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-klo-muted">
                <Clock size={13} />
                <span>{item.duration}</span>
              </div>
              <span className="text-xs text-klo-muted">
                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
