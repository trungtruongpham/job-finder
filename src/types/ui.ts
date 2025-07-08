import type { FormStep } from "./form";

export interface MultiSelectOption {
  value: string;
  label: string;
  category?: string;
}

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
  className?: string;
}

export interface StepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  maxDisplayed?: number;
}
