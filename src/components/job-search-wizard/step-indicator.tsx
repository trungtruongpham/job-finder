"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { FormStep } from "@/types";

interface StepIndicatorProps {
  steps: FormStep[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Enhanced step indicator with glassmorphism */}
      <div className="glass-subtle rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Enhanced Step Circle */}
              <div className="relative flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-all duration-300 shadow-lg backdrop-blur-sm",
                    step.isCompleted
                      ? "bg-primary border-primary text-primary-foreground shadow-primary/20 scale-110"
                      : step.isActive
                      ? "border-primary text-primary bg-background/80 backdrop-blur-sm shadow-primary/10 scale-105"
                      : "border-muted-foreground/30 text-muted-foreground bg-background/50 backdrop-blur-sm"
                  )}
                >
                  {step.isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>

                {/* Step Info - Hidden on small screens */}
                <div className="ml-3 hidden sm:block">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      step.isActive
                        ? "text-primary font-semibold"
                        : "text-foreground"
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div
                    className={cn(
                      "h-0.5 w-full transition-colors",
                      step.isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Step Info */}
      <div className="sm:hidden mb-6">
        {steps.map(
          (step) =>
            step.isActive && (
              <div key={step.id} className="text-center">
                <div className="text-sm font-medium text-primary">
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
