export interface JobDetails {
  yearsOfExperience: number;
  salaryMin?: number;
  salaryMax?: number;
  currency: "USD" | "EUR" | "GBP" | "CAD";
  techStacks: string[];
  softSkills: string[];
  qualifications: string[];
  jobType: "full-time" | "part-time" | "contract" | "remote";
  location?: string;
}

export interface JobBoard {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
}

export interface JobSearchFormData {
  step1: JobDetails;
  step2: {
    jobBoards: JobBoard[];
  };
}

export interface StepProps {
  data: JobSearchFormData;
  updateData: (
    step: keyof JobSearchFormData,
    data: JobDetails | { jobBoards: JobBoard[] }
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  isLoading?: boolean;
}
