"use client";

import { useState } from "react";
import {
  ImageIcon,
  Sparkles,
  LayoutGrid,
  Music,
  Palette,
  FileStack,
  Info,
} from "lucide-react";
import type { StudioPanel } from "@/types/creative-studio";
import MediaLibraryPanel from "./media-library/MediaLibraryPanel";
import AnimationBuilderPanel from "./animation-builder/AnimationBuilderPanel";
import ThemeDesignerPanel from "./theme-designer/ThemeDesignerPanel";
import MusicManagerPanel from "./music-manager/MusicManagerPanel";
import LayoutEditorPanel from "./layout-editor/LayoutEditorPanel";
import PageComposerPanel from "./page-composer/PageComposerPanel";

const panels: {
  id: StudioPanel;
  label: string;
  icon: React.ElementType;
  description: string;
  howto: string;
}[] = [
  {
    id: "media-library",
    label: "Media",
    icon: ImageIcon,
    description: "Upload images, videos, and graphics you want to use on your pages.",
    howto: "Drag files onto the drop zone or click Upload. Organize files into folders by typing a folder name and uploading. Click any file to rename it, add tags, or delete it.",
  },
  {
    id: "animation-builder",
    label: "Animations",
    icon: Sparkles,
    description: "Pick or create entrance animations to add motion to your pages.",
    howto: "Browse the 7 built-in presets. Click any preset to preview it live. Click New Preset to build your own with custom timing and easing. Animations get assigned to pages in the Pages tab.",
  },
  {
    id: "layout-editor",
    label: "Layout",
    icon: LayoutGrid,
    description: "Reorder sections on your pages and control grid spacing.",
    howto: "Pick a page from the dropdown. Drag sections by the grip handle to reorder. Toggle the eye icon to hide a section. Adjust columns, spacing, and padding in the controls bar. Click Save Layout.",
  },
  {
    id: "music-manager",
    label: "Music",
    icon: Music,
    description: "Upload background audio and assign it to specific pages.",
    howto: "Click Upload Audio and pick an MP3, WAV, OGG, or AAC file. Click any audio to edit its assigned pages, volume, loop, and autoplay settings. Click play to preview in the browser.",
  },
  {
    id: "theme-designer",
    label: "Theme",
    icon: Palette,
    description: "Change the colors, fonts, and buttons across the whole app.",
    howto: "Click New Theme and give it a name. Click the theme card to edit colors — each color applies to a part of the app (primary, accent, background, etc.). When you're ready, click Activate. The whole site updates on the next page load.",
  },
  {
    id: "page-composer",
    label: "Pages",
    icon: FileStack,
    description: "Edit the hero, background, animation, and audio for each page.",
    howto: "Pick a page from the dropdown. Type a new headline and subheadline — these replace what visitors see at the top of the page. Pick a background color or paste an image URL. Assign an animation and background audio. Click Save Page.",
  },
];

interface CreativeStudioTabProps {
  /** Pre-select a panel on mount (e.g. "page-composer" from a deep-link). */
  initialPanel?: StudioPanel;
  /** Pre-select a page slug inside PageComposerPanel (only used when initialPanel="page-composer"). */
  initialPage?: string;
}

export default function CreativeStudioTab({ initialPanel, initialPage }: CreativeStudioTabProps = {}) {
  const [activePanel, setActivePanel] = useState<StudioPanel>(initialPanel ?? "media-library");
  const currentPanel = panels.find((p) => p.id === activePanel)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-semibold text-klo-text">
          Creative Studio
        </h2>
        <p className="text-sm text-klo-muted mt-1">
          Design your app visually — media, animations, layout, music, and themes.
          Every change you save here updates the live site on the next page load.
        </p>
      </div>

      {/* Segmented Control */}
      <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-klo-dark/50 border border-white/5">
        {panels.map((panel) => {
          const Icon = panel.icon;
          return (
            <button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer min-h-[44px] ${
                activePanel === panel.id
                  ? "bg-klo-slate text-klo-text shadow-md"
                  : "text-klo-muted hover:text-klo-text"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{panel.label}</span>
            </button>
          );
        })}
      </div>

      {/* Per-panel help banner */}
      <div className="glass rounded-2xl p-5 border border-white/5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-klo-accent/10 shrink-0">
            <Info size={18} className="text-klo-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-klo-text mb-1">
              {currentPanel.label}
            </h3>
            <p className="text-xs text-klo-muted mb-2">{currentPanel.description}</p>
            <p className="text-xs text-klo-text/80 leading-relaxed">
              <span className="text-klo-gold font-medium">How to use:</span>{" "}
              {currentPanel.howto}
            </p>
          </div>
        </div>
      </div>

      {/* Panel Content */}
      {activePanel === "media-library" && <MediaLibraryPanel />}
      {activePanel === "animation-builder" && <AnimationBuilderPanel />}
      {activePanel === "layout-editor" && <LayoutEditorPanel />}
      {activePanel === "music-manager" && <MusicManagerPanel />}
      {activePanel === "theme-designer" && <ThemeDesignerPanel />}
      {activePanel === "page-composer" && <PageComposerPanel initialPage={initialPage} />}
    </div>
  );
}
