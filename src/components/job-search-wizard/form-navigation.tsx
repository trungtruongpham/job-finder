"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { FormNavigationProps } from "@/types";

export function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isNextDisabled = false,
  isPrevDisabled = false,
  isSubmitting = false,
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <div className="flex gap-3 sm:ml-auto">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="secondary"
            onClick={onPrev}
            disabled={isPrevDisabled || isSubmitting}
            className="flex-1 sm:flex-none"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
        )}

        {isLastStep ? (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            className="flex-1 sm:flex-none"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
