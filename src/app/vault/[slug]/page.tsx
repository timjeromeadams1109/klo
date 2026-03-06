"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import ContentCard from "@/components/vault/ContentCard";
import DetailHero from "@/components/vault/detail/DetailHero";
import OverviewSection from "@/components/vault/detail/OverviewSection";
import TakeawayCards from "@/components/vault/detail/TakeawayCards";
import PullQuote from "@/components/vault/detail/PullQuote";
import ImplementationSteps from "@/components/vault/detail/ImplementationSteps";
import InfoCallout from "@/components/vault/detail/InfoCallout";
import ConclusionCTA from "@/components/vault/detail/ConclusionCTA";
import {
  getVaultItemBySlug,
  getRelatedItems,
} from "@/lib/vault-data";
import type { VaultItem } from "@/lib/vault-data";
import { getVaultContent } from "@/lib/vault-content";
import { fetchEventItems } from "@/lib/vault-events";
import EventPresentation from "@/components/vault/detail/EventPresentation";

export default function VaultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [eventItem, setEventItem] = useState<VaultItem | null>(null);
  const [eventLoading, setEventLoading] = useState(false);

  const staticItem = getVaultItemBySlug(slug);

  // If not found in static data, try fetching from events
  useEffect(() => {
    if (!staticItem) {
      setEventLoading(true);
      fetchEventItems()
        .then((items) => {
          const found = items.find((i) => i.slug === slug) ?? null;
          setEventItem(found);
        })
        .finally(() => setEventLoading(false));
    }
  }, [slug, staticItem]);

  const item = staticItem ?? eventItem;

  if (eventLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-klo-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
  const content = getVaultContent(item.id);

  return (
    <div className="min-h-screen">
      {/* Full-width hero */}
      <DetailHero
        item={item}
        heroSubtitle={content?.heroSubtitle ?? item.description}
      />

      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="mb-8 mt-8"
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
            <div className="flex-1 min-w-0">
              {item.type === "event" ? (
                <EventPresentation item={item} />
              ) : content ? (
                <div className="space-y-10">
                  <OverviewSection overview={content.overview} />
                  <TakeawayCards takeaways={content.takeaways} />
                  <PullQuote quote={content.quote} />
                  <ImplementationSteps steps={content.steps} />
                  <InfoCallout callouts={content.callouts} />
                  <ConclusionCTA conclusion={content.conclusion} />
                </div>
              ) : (
                <p className="text-klo-muted">Content not available.</p>
              )}
            </div>

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
    </div>
  );
}
