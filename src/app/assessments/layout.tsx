import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Readiness Assessments | KLO",
  description:
    "Evaluate your organization's readiness with expert assessments — AI readiness, church technology, governance maturity, and cyber risk. Actionable insights from Keith L. Odom.",
};

export default function AssessmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
