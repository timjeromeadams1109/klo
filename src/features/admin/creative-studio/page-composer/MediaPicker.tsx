"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X, Check, RefreshCw } from "lucide-react";
import type { MediaAsset, AssetType } from "@/types/creative-studio";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  assetType?: AssetType; // filter by type
  label?: string;
}

/**
 * A compact picker that lets admins select an image (or other asset type)
 * from their uploaded Media Library instead of pasting a URL.
 */
export default function MediaPicker({
  value,
  onChange,
  assetType = "image",
  label = "Background Image",
}: Props) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (assetType) params.set("asset_type", assetType);
      params.set("limit", "100");
      const res = await fetch(`/api/admin/creative-studio/media?${params}`);
      if (res.ok) {
        const json = await res.json();
        setAssets(json.data ?? []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchAssets();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex gap-2">
        {/* Current selection preview */}
        {value ? (
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Selected"
              className="w-16 h-16 rounded-xl object-cover border border-white/10"
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Remove image"
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-klo-muted">
            <ImageIcon size={20} />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-klo-dark/50 border border-white/5 text-sm text-klo-text hover:border-klo-accent/30 transition-all min-h-[40px]"
          >
            <ImageIcon size={14} />
            {value ? "Change Image" : "Choose from Media Library"}
          </button>
          {value && (
            <p className="text-[10px] text-klo-muted truncate">{value}</p>
          )}
        </div>
      </div>

      {/* Picker Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              className="w-full max-w-3xl max-h-[80vh] rounded-2xl bg-klo-slate border border-white/10 p-6 space-y-4 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-klo-text">
                  Choose {label}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-klo-muted hover:text-klo-text"
                >
                  <X size={18} />
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <RefreshCw size={24} className="animate-spin text-klo-muted" />
                </div>
              ) : assets.length === 0 ? (
                <div className="text-center py-12 text-klo-muted text-sm">
                  <ImageIcon size={32} className="mx-auto mb-3 opacity-50" />
                  <p>No {assetType} files uploaded yet.</p>
                  <p className="text-xs mt-1">
                    Upload files in the Media tab first, then come back here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto flex-1">
                  {assets.map((asset) => {
                    const isSelected = value === asset.public_url;
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => {
                          onChange(asset.public_url);
                          setOpen(false);
                        }}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                          isSelected
                            ? "border-klo-accent"
                            : "border-white/5 hover:border-white/20"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset.public_url}
                          alt={asset.alt_text ?? asset.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-klo-accent/20 flex items-center justify-center">
                            <div className="p-2 rounded-full bg-klo-accent">
                              <Check size={16} className="text-white" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-[10px] text-white truncate">{asset.name}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
