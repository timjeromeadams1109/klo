import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Keith L. Odom | KLO",
  description:
    "Schedule a consultation, speaking engagement, or strategy session with Keith L. Odom. Expert guidance on AI, digital transformation, and technology leadership.",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
