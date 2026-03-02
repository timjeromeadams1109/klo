import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Plans | KLO",
  description:
    "Explore KLO's pricing tiers and subscription plans. Access AI advisory, leadership assessments, the Insight Vault, and exclusive strategy rooms at every level.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
