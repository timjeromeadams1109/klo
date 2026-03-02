"use client";

import { BrainCircuit } from "lucide-react";
import AssessmentPageWrapper from "@/components/assessments/AssessmentPageWrapper";
import { aiReadinessQuestions } from "@/lib/assessment-questions";

export default function AIReadinessPage() {
  return (
    <AssessmentPageWrapper
      assessmentId="ai-readiness"
      title="AI Readiness"
      description="Determine your organization's preparedness to adopt and leverage artificial intelligence, from data foundations to culture and governance."
      icon={BrainCircuit}
      category="Technology"
      questions={aiReadinessQuestions}
      estimatedMinutes={5}
    />
  );
}
