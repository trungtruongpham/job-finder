"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "./step-indicator";
import { JobDetailsForm } from "./job-details-form";
import { JobBoardsForm } from "./job-boards-form";
import { FormNavigation } from "./form-navigation";
import {
  jobDetailsSchema,
  jobBoardsSchema,
} from "@/lib/validations/job-search";
import { DEFAULT_JOB_BOARDS } from "@/lib/constants/job-search";
import type { JobSearchFormData, FormStep } from "@/types";
import { toast } from "sonner";
import {
  saveJobSearchPreferences,
  getJobSearchPreferences,
} from "@/lib/actions/job-search";

interface JobSearchWizardProps {
  onComplete?: (data: JobSearchFormData) => void;
  initialData?: Partial<JobSearchFormData>;
}

const STEPS: FormStep[] = [
  {
    id: 1,
    title: "Job Details",
    description: "Tell us about your ideal job",
    isActive: true,
    isCompleted: false,
  },
  {
    id: 2,
    title: "Job Boards",
    description: "Choose your job search sources",
    isActive: false,
    isCompleted: false,
  },
];

export function JobSearchWizard({
  onComplete,
  initialData,
}: JobSearchWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<FormStep[]>(STEPS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState<JobSearchFormData>(() => {
    // Initialize with default values
    const defaultData: JobSearchFormData = {
      step1: {
        yearsOfExperience: 0,
        currency: "USD",
        techStacks: [],
        softSkills: [],
        qualifications: [],
        jobType: "full-time",
      },
      step2: {
        jobBoards: DEFAULT_JOB_BOARDS,
      },
    };

    // Merge with initial data if provided
    if (initialData) {
      return {
        step1: { ...defaultData.step1, ...initialData.step1 },
        step2: { ...defaultData.step2, ...initialData.step2 },
      };
    }

    return defaultData;
  });

  // Load data from database and localStorage on component mount
  useEffect(() => {
    const loadExistingData = async () => {
      setIsLoadingData(true);

      try {
        // First try to load from database
        const result = await getJobSearchPreferences();
        let dataToUse: JobSearchFormData | null = null;

        if (result.data) {
          dataToUse = result.data;
          toast.success("Loaded your existing job search preferences");
        } else if (typeof window !== "undefined") {
          // If no database data, try localStorage
          const savedData = localStorage.getItem("job-search-wizard-data");
          if (savedData) {
            try {
              dataToUse = JSON.parse(savedData);
              toast.info("Loaded your draft from previous session");
            } catch (error) {
              console.error("Error parsing saved form data:", error);
            }
          }
        }

        // Update form data if we found any
        if (dataToUse) {
          setFormData(dataToUse);
        }
      } catch (error) {
        console.error("Error loading existing data:", error);
        // Silently fail and use default data
      } finally {
        setIsLoadingData(false);
      }
    };

    loadExistingData();
  }, []);

  // Save data to localStorage when form data changes (but not on initial load)
  useEffect(() => {
    if (!isLoadingData && typeof window !== "undefined") {
      localStorage.setItem("job-search-wizard-data", JSON.stringify(formData));
    }
  }, [formData, isLoadingData]);

  // Update form data
  const updateData = (
    step: keyof JobSearchFormData,
    data: JobSearchFormData[typeof step]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  // Validate current step
  const validateCurrentStep = (showErrors = false) => {
    try {
      if (currentStep === 1) {
        jobDetailsSchema.parse(formData.step1);
        return true;
      } else if (currentStep === 2) {
        jobBoardsSchema.parse(formData.step2);
        return true;
      }
      return false;
    } catch (error) {
      if (showErrors) {
        console.error("Validation error:", error);
        toast.error("Please fix the validation errors before proceeding");
      }
      return false;
    }
  };

  // Update steps state
  const updateSteps = (newCurrentStep: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({
        ...step,
        isActive: step.id === newCurrentStep,
        isCompleted: step.id < newCurrentStep,
      }))
    );
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateCurrentStep(true) && currentStep < STEPS.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateSteps(newStep);
      toast.success("Step completed successfully!");
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateSteps(newStep);
    }
  };

  // Handle form completion
  const handleComplete = async () => {
    if (!validateCurrentStep(true)) return;

    setIsLoading(true);

    try {
      const result = await saveJobSearchPreferences(formData);

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      // Clear localStorage on successful save
      if (typeof window !== "undefined") {
        localStorage.removeItem("job-search-wizard-data");
      }

      toast.success("Job search preferences saved successfully!");

      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete(formData);
      }
    } catch (error) {
      console.error("Error saving job search preferences:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    if (isLoadingData) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your preferences...</p>
          </div>
        </div>
      );
    }

    const stepProps = {
      data: formData,
      updateData,
      nextStep,
      prevStep,
      isLoading,
    };

    switch (currentStep) {
      case 1:
        return <JobDetailsForm {...stepProps} />;
      case 2:
        return <JobBoardsForm {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <StepIndicator steps={steps} />

      {/* Enhanced wizard container with glassmorphism */}
      <div className="glass-intense glass-pattern rounded-3xl p-1 shadow-2xl">
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-4 md:p-6">
            {renderCurrentStep()}

            {/* Move navigation to end of form content */}
            {!isLoadingData && (
              <FormNavigation
                currentStep={currentStep}
                totalSteps={STEPS.length}
                onPrev={prevStep}
                onNext={nextStep}
                onSubmit={handleComplete}
                isNextDisabled={!validateCurrentStep()}
                isSubmitting={isLoading}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
