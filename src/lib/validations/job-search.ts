import { z } from "zod";

export const jobDetailsSchema = z
  .object({
    yearsOfExperience: z
      .number()
      .min(0, "Experience cannot be negative")
      .max(50, "Experience cannot exceed 50 years"),
    salaryMin: z.number().min(0, "Salary cannot be negative").optional(),
    salaryMax: z.number().min(0, "Salary cannot be negative").optional(),
    currency: z.enum(["USD", "EUR", "GBP", "CAD"]),
    techStacks: z
      .array(z.string())
      .min(1, "At least one tech stack is required"),
    softSkills: z.array(z.string()),
    qualifications: z.array(z.string()),
    jobType: z.enum(["full-time", "part-time", "contract", "remote"]),
    location: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.salaryMin && data.salaryMax) {
        return data.salaryMin <= data.salaryMax;
      }
      return true;
    },
    {
      message: "Minimum salary cannot be greater than maximum salary",
      path: ["salaryMax"],
    }
  );

export const jobBoardsSchema = z.object({
  jobBoards: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Job board name is required"),
        url: z.string().url("Please enter a valid URL"),
        isActive: z.boolean(),
      })
    )
    .min(1, "At least one job board is required"),
});

export const jobSearchFormSchema = z.object({
  step1: jobDetailsSchema,
  step2: jobBoardsSchema,
});

export type JobDetailsFormData = z.infer<typeof jobDetailsSchema>;
export type JobBoardsFormData = z.infer<typeof jobBoardsSchema>;
export type JobSearchFormData = z.infer<typeof jobSearchFormSchema>;
