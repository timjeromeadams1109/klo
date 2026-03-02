import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insight Vault | KLO",
  description:
    "Access the premium content library from Keith L. Odom. Curated insights, frameworks, and resources on AI strategy, leadership, digital transformation, and organizational readiness.",
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
