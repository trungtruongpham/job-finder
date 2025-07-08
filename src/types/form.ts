export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface WizardProps {
  steps: FormStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  isSubmitting?: boolean;
}
