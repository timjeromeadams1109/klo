"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  categoryName: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  categoryName,
}: ProgressBarProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-klo-muted">
          Question{" "}
          <span className="text-klo-text font-medium">{currentStep + 1}</span>{" "}
          of {totalSteps}
        </span>
        <span className="text-klo-gold font-medium text-xs uppercase tracking-wider">
          {categoryName}
        </span>
      </div>
      <div className="w-full h-2 bg-klo-slate rounded-full overflow-hidden">
        <div
          className="h-full bg-klo-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
