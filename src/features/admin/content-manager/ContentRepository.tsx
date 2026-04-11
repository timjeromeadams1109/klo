"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Archive,
  RotateCcw,
  Trash2,
  BookOpen,
  Rss,
  RefreshCw,
  X,
  AlertTriangle,
} from "lucide-react";
import type { BaseContentItem } from "./useContent";

type ContentType = "vault" | "feed";

interface RepoItem extends BaseContentItem {
  _type: ContentType;
  title: string | null;
  body?: string;
  excerpt?: string | null;
  category?: string;
  content_type?: string;
  post_type?: string;
  published_at: string | null;
}

export default function ContentRepository() {
  const [vaultItems, setVaultItems] = useState<RepoItem[]>([]);
  const [feedItems, setFeedItems] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | ContentType>("all");
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<RepoItem | null>(null);

  const fetchArchived = useCallback(async () => {
    setLoading(true);
    try {
      const [vaultRes, feedRes] = await Promise.all([
        fetch("/api/admin/content-manager/vault?visibility=archived&limit=200"),
        fetch("/api/admin/content-manager/feed?visibility=archived&limit=200"),
      ]);
      const [vaultJson, feedJson] = await Promise.all([vaultRes.json(), feedRes.json()]);
      setVaultItems((vaultJson.data ?? []).map((d: BaseContentItem) => ({ ...d, _type: "vault" } as RepoItem)));
      setFeedItems((feedJson.data ?? []).map((d: BaseContentItem) => ({ ...d, _type: "feed" } as RepoItem)));
    } catch (err) {
      console.error("Failed to fetch archived content:", err);
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchArchived(); }, [fetchArchived]);

  const restore = async (item: RepoItem) => {
    try {
      const res = await fetch(`/api/admin/content-manager/${item._type}/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: "published" }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Restore failed");
      await fetchArchived();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Restore failed");
    }
  };

  const permanentDelete = async (item: RepoItem) => {
    try {
      const res = await fetch(`/api/admin/content-manager/${item._type}/${item.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Delete failed");
      setDeleteConfirm(null);
      await fetchArchived();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const allItems = [...vaultItems, ...feedItems].sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const filtered =
    filter === "all" ? allItems : filter === "vault" ? vaultItems : feedItems;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass rounded-2xl p-5 border border-white/5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-klo-accent/10">
            <Archive size={20} className="text-klo-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-klo-text">Content Repository</h3>
            <p className="text-xs text-klo-muted mt-1">
              Archived content is hidden from the app but preserved here as a reference library.
              KLO Intelligence can still use archived content when responding to users.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-300 flex-1">{error}</p>
          <button onClick={() => setError("")} className="min-h-[44px] min-w-[44px] flex items-center justify-center"><X size={14} className="text-red-400" /></button>
        </div>
      )}

      {/* Filter + Count */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl bg-klo-dark/30 border border-white/5">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium min-h-[36px] ${
              filter === "all" ? "bg-klo-slate text-klo-text shadow" : "text-klo-muted hover:text-klo-text"
            }`}
          >
            All ({allItems.length})
          </button>
          <button
            onClick={() => setFilter("vault")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium min-h-[36px] ${
              filter === "vault" ? "bg-klo-slate text-klo-text shadow" : "text-klo-muted hover:text-klo-text"
            }`}
          >
            <BookOpen size={12} /> Vault ({vaultItems.length})
          </button>
          <button
            onClick={() => setFilter("feed")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium min-h-[36px] ${
              filter === "feed" ? "bg-klo-slate text-klo-text shadow" : "text-klo-muted hover:text-klo-text"
            }`}
          >
            <Rss size={12} /> Feed ({feedItems.length})
          </button>
        </div>

        <button
          onClick={fetchArchived}
          className="p-2.5 rounded-xl bg-klo-dark/50 border border-white/5 text-klo-muted hover:text-klo-text min-h-[44px] min-w-[44px] flex items-center justify-center ml-auto"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <RefreshCw size={24} className="animate-spin text-klo-muted" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-klo-muted text-sm glass rounded-2xl border border-white/5">
          <Archive size={32} className="mx-auto mb-3 opacity-50" />
          <p>No archived content yet.</p>
          <p className="text-xs mt-1">Archive items from the Vault or Feed tabs to move them here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <RepoCard
              key={`${item._type}-${item.id}`}
              item={item}
              onRestore={() => restore(item)}
              onDelete={() => setDeleteConfirm(item)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={(e) => e.target === e.currentTarget && setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-klo-slate border border-white/10 p-6 text-center space-y-4"
            >
              <div className="inline-flex p-3 rounded-xl bg-red-500/10">
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-klo-text">Delete Permanently?</h3>
              <p className="text-sm text-klo-muted">
                This will permanently remove this {deleteConfirm._type} item from the database.
                KLO Intelligence will lose access to it. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-klo-dark/50 border border-white/5 text-klo-muted text-sm min-h-[44px]">Cancel</button>
                <button onClick={() => permanentDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-medium min-h-[44px]">Delete Forever</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RepoCard({
  item,
  onRestore,
  onDelete,
}: {
  item: RepoItem;
  onRestore: () => void;
  onDelete: () => void;
}) {
  const Icon = item._type === "vault" ? BookOpen : Rss;
  const typeLabel = item._type === "vault" ? "Vault" : "Feed";
  const preview = item.excerpt ?? item.body?.slice(0, 160) ?? "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-klo-dark/30 border border-white/5"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-klo-accent/10 text-klo-accent text-[10px]">
            <Icon size={10} /> {typeLabel}
          </span>
          {item.category && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-klo-dark text-klo-muted">{item.category}</span>
          )}
        </div>
        <h4 className="text-sm font-medium text-klo-text truncate">
          {item.title ?? <span className="text-klo-muted italic">(no title)</span>}
        </h4>
        <p className="text-xs text-klo-muted mt-1 line-clamp-2">{preview}</p>
      </div>

      <div className="flex gap-2 sm:flex-col sm:items-end">
        <button
          onClick={onRestore}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 min-h-[36px]"
        >
          <RotateCcw size={12} /> Restore
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 min-h-[36px]"
        >
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </motion.div>
  );
}
