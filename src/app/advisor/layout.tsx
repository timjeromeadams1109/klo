import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Strategic Advisor | KLO",
  description:
    "Engage with KLO's AI-powered strategic advisor. Get personalized guidance on technology adoption, digital transformation, AI governance, and organizational strategy.",
};

export default function AdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
