"use client";

import { Church } from "lucide-react";
import AssessmentPageWrapper from "@/components/assessments/AssessmentPageWrapper";
import { churchReadinessQuestions } from "@/lib/assessment-questions";

export default function ChurchReadinessPage() {
  return (
    <AssessmentPageWrapper
      assessmentId="church-readiness"
      title="Church Readiness"
      description="Evaluate your church or ministry's technology maturity across infrastructure, communication, digital engagement, and data management."
      icon={Church}
      category="Ministry"
      questions={churchReadinessQuestions}
      estimatedMinutes={5}
    />
  );
}
