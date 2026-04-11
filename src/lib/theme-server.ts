// Server-side theme loader — fetches the active theme from Supabase
// and returns it for CSS variable injection at the root layout level.
//
// Runs on every request (no cache) so admin changes reflect immediately.
// In production, consider wrapping with Next.js revalidateTag and triggering
// revalidation from the theme activate endpoint for better performance.

import { getServiceSupabase } from "@/lib/supabase";

export interface ActiveThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  gold: string;
  [key: string]: string;
}

export interface ActiveTheme {
  id: string;
  name: string;
  colors: ActiveThemeColors;
  typography: {
    bodyFont?: string;
    displayFont?: string;
    baseSizeRem?: number;
    scaleRatio?: number;
    weights?: { body?: number; heading?: number };
  };
  buttons: {
    radiusPx?: number;
    shadowPx?: number;
    hoverScale?: number;
    variant?: string;
  };
  dark_mode: boolean;
  custom_css: string | null;
}

// Fallback theme — used when no active theme is set in the DB
export const DEFAULT_THEME: ActiveTheme = {
  id: "default",
  name: "KLO Default",
  colors: {
    primary: "#2764FF",
    secondary: "#21B8CD",
    accent: "#2764FF",
    background: "#0D1117",
    surface: "#161B22",
    text: "#E6EDF3",
    muted: "#8B949E",
    gold: "#C8A84E",
  },
  typography: {
    bodyFont: "Geist Sans, Inter, sans-serif",
    displayFont: "Playfair Display, serif",
    baseSizeRem: 1,
    scaleRatio: 1.25,
    weights: { body: 400, heading: 700 },
  },
  buttons: {
    radiusPx: 12,
    shadowPx: 0,
    hoverScale: 1.02,
    variant: "solid",
  },
  dark_mode: true,
  custom_css: null,
};

/**
 * Fetch the currently active theme from Supabase.
 * Returns DEFAULT_THEME if no theme is active or on error.
 */
export async function getActiveTheme(): Promise<ActiveTheme> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("theme_config")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (error || !data) return DEFAULT_THEME;

    return {
      id: data.id,
      name: data.name,
      colors: { ...DEFAULT_THEME.colors, ...(data.colors ?? {}) },
      typography: { ...DEFAULT_THEME.typography, ...(data.typography ?? {}) },
      buttons: { ...DEFAULT_THEME.buttons, ...(data.buttons ?? {}) },
      dark_mode: data.dark_mode ?? true,
      custom_css: data.custom_css,
    };
  } catch (err) {
    console.error("[getActiveTheme] fallback to default:", err);
    return DEFAULT_THEME;
  }
}

/**
 * Build a CSS :root block with all theme variables as custom properties.
 * Injected into the page <head> by the ThemeInjector component.
 */
export function themeToCssVariables(theme: ActiveTheme): string {
  const { colors, typography, buttons } = theme;
  const vars: string[] = [];

  // Colors — every theme color becomes a --color-<name> custom property
  for (const [key, value] of Object.entries(colors)) {
    vars.push(`--color-${key}: ${value};`);
  }

  // Typography
  if (typography.bodyFont) vars.push(`--theme-font-body: ${typography.bodyFont};`);
  if (typography.displayFont) vars.push(`--theme-font-display: ${typography.displayFont};`);
  if (typography.baseSizeRem) vars.push(`--theme-base-size: ${typography.baseSizeRem}rem;`);
  if (typography.scaleRatio) vars.push(`--theme-scale-ratio: ${typography.scaleRatio};`);
  if (typography.weights?.body) vars.push(`--theme-weight-body: ${typography.weights.body};`);
  if (typography.weights?.heading) vars.push(`--theme-weight-heading: ${typography.weights.heading};`);

  // Buttons
  if (buttons.radiusPx != null) vars.push(`--theme-button-radius: ${buttons.radiusPx}px;`);
  if (buttons.shadowPx != null) vars.push(`--theme-button-shadow: ${buttons.shadowPx}px;`);
  if (buttons.hoverScale != null) vars.push(`--theme-button-hover-scale: ${buttons.hoverScale};`);

  return `:root { ${vars.join(" ")} }`;
}
