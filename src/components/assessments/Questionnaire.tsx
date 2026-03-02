"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import Button from "@/components/shared/Button";
import ProgressBar from "./ProgressBar";
import { useAssessment } from "@/hooks/useAssessment";
import type { AssessmentQuestion } from "@/lib/assessment-questions";
import type { AssessmentSavedResult } from "@/hooks/useAssessment";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

interface QuestionnaireProps {
  assessmentId: string;
  questions: AssessmentQuestion[];
  onComplete: (result: AssessmentSavedResult) => void;
}

// ------------------------------------------------------------
// Slide animation variants
// ------------------------------------------------------------

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export default function Questionnaire({
  assessmentId,
  questions,
  onComplete,
}: QuestionnaireProps) {
  const {
    currentStep,
    answers,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    submitAssessment,
  } = useAssessment(assessmentId, questions);

  const currentQuestion = questions[currentStep];
  const isFirstQuestion = currentStep === 0;
  const isLastQuestion = currentStep === questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  // Track direction for animation
  const direction =
    typeof window !== "undefined"
      ? (window as unknown as Record<string, number>).__kloSlideDir ?? 1
      : 1;

  const handleNext = useCallback(() => {
    (window as unknown as Record<string, number>).__kloSlideDir = 1;
    nextQuestion();
  }, [nextQuestion]);

  const handlePrev = useCallback(() => {
    (window as unknown as Record<string, number>).__kloSlideDir = -1;
    prevQuestion();
  }, [prevQuestion]);

  const handleSubmit = useCallback(() => {
    const result = submitAssessment();
    onComplete(result);
  }, [submitAssessment, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Progress */}
      <ProgressBar
        currentStep={currentStep}
        totalSteps={questions.length}
        categoryName={currentQuestion.category}
      />

      {/* Question */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            {/* Question text */}
            <h2 className="font-display text-xl md:text-2xl font-semibold text-klo-text leading-snug">
              {currentQuestion.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      answerQuestion(currentQuestion.id, option.value)
                    }
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-klo-gold bg-klo-gold/10 shadow-md shadow-klo-gold/5"
                        : "border-klo-slate bg-klo-dark hover:border-klo-gold/30 hover:bg-klo-slate/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-klo-gold bg-klo-gold"
                            : "border-klo-muted/40"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-klo-dark" />
                        )}
                      </div>
                      <span
                        className={`text-sm leading-relaxed ${
                          isSelected ? "text-klo-text" : "text-klo-muted"
                        }`}
                      >
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-klo-slate">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrev}
          disabled={isFirstQuestion}
        >
          <ChevronLeft size={18} />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={!hasAnswered}
          >
            Submit
            <Send size={16} />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            disabled={!hasAnswered}
          >
            Next
            <ChevronRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
