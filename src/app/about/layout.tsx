import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Keith L. Odom | KLO",
  description:
    "Learn about Keith L. Odom — Technology Innovator, Speaker & Pastor with decades of experience in AI strategy, digital transformation, cybersecurity, and organizational leadership.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
