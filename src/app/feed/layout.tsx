import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Intelligence Feed | KLO",
  description:
    "Stay ahead with the Executive Intelligence Feed — curated AI news, technology trends, leadership insights, and strategic analysis from Keith L. Odom.",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
