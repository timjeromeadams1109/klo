// Server component — fetches the active theme from Supabase and injects
// its color/typography/button tokens as CSS custom properties on :root.
// Rendered inside <head> in the root layout. Admin theme changes take
// effect on the next page load.

import { getActiveTheme, themeToCssVariables } from "@/lib/theme-server";

// Force dynamic rendering — always fetch the latest active theme
export const dynamic = "force-dynamic";

export default async function ThemeInjector() {
  const theme = await getActiveTheme();
  const css = themeToCssVariables(theme);
  const customCss = theme.custom_css ?? "";

  return (
    <style
      data-theme={theme.name}
      dangerouslySetInnerHTML={{ __html: `${css}\n${customCss}` }}
    />
  );
}
