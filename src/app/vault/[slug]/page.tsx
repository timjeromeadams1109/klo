"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import ContentCard from "@/components/vault/ContentCard";
import PremiumLock from "@/components/vault/PremiumLock";
import {
  getVaultItemBySlug,
  getRelatedItems,
  getTypeLabel,
  getMockArticleContent,
} from "@/lib/vault-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function VaultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const item = getVaultItemBySlug(slug);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <BookOpen size={28} className="text-klo-muted" />
          </div>
          <h1 className="font-display text-2xl font-bold text-klo-text mb-3">
            Resource Not Found
          </h1>
          <p className="text-klo-muted text-sm mb-6">
            The resource you are looking for does not exist or may have been
            moved.
          </p>
          <Button variant="secondary" href="/vault">
            <ArrowLeft size={16} />
            Back to Vault
          </Button>
        </motion.div>
      </div>
    );
  }

  const relatedItems = getRelatedItems(item, 3);
  const articleContent = getMockArticleContent(item);

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" as const }}
          className="mb-8"
        >
          <button
            onClick={() => router.push("/vault")}
            className="inline-flex items-center gap-2 text-sm text-klo-muted hover:text-klo-gold transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Vault
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex-1 min-w-0"
          >
            {/* Badges */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-2 flex-wrap mb-4"
            >
              <Badge variant="muted">{getTypeLabel(item.type)}</Badge>
              <Badge variant="muted">{item.category}</Badge>
              <Badge variant="blue">{item.level}</Badge>
              {item.isPremium ? (
                <Badge variant="gold">Premium</Badge>
              ) : (
                <Badge variant="green">Free</Badge>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl md:text-4xl font-bold text-klo-text leading-tight mb-4"
            >
              {item.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-klo-muted text-base leading-relaxed mb-6 max-w-3xl"
            >
              {item.description}
            </motion.p>

            {/* Meta row */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-6 text-sm text-klo-muted mb-10 pb-8 border-b border-klo-slate"
            >
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
            </motion.div>

            {/* Content body */}
            <motion.div variants={fadeUp} custom={4}>
              {item.isPremium ? (
                <PremiumLock />
              ) : (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:text-klo-text prose-p:text-klo-muted prose-p:leading-relaxed prose-strong:text-klo-text prose-a:text-klo-gold prose-a:no-underline hover:prose-a:underline prose-blockquote:border-klo-gold/30 prose-blockquote:text-klo-muted prose-li:text-klo-muted prose-hr:border-klo-slate">
                  <ReactMarkdown>{articleContent}</ReactMarkdown>
                </div>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="mt-12 p-8 rounded-xl bg-klo-dark border border-klo-slate"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-klo-gold/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={22} className="text-klo-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-klo-text mb-1">
                    Need personalized guidance?
                  </h3>
                  <p className="text-sm text-klo-muted">
                    Book a one-on-one consultation with Keith L. Odom to discuss
                    how these frameworks apply to your organization.
                  </p>
                </div>
                <Button variant="primary" href="/booking" size="md" className="shrink-0">
                  Book a Consultation
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          {relatedItems.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: "easeOut" as const,
              }}
              className="lg:w-80 xl:w-96 shrink-0"
            >
              <div className="lg:sticky lg:top-28">
                <h3 className="font-display text-sm font-semibold text-klo-muted uppercase tracking-wider mb-4">
                  Related Resources
                </h3>
                <div className="flex flex-col gap-4">
                  {relatedItems.map((related, i) => (
                    <ContentCard key={related.id} item={related} index={i} />
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </div>
  );
}
