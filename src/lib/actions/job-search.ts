"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ActionResponse } from "@/types/actions";
import { revalidatePath } from "next/cache";
import { jobSearchFormSchema } from "@/lib/validations/job-search";

// Types for database operations
type JobSearchPreferenceInsert = {
  user_id: string;
  years_of_experience: number;
  location?: string;
  job_type: "full-time" | "part-time" | "contract" | "remote";
  currency: "USD" | "EUR" | "GBP" | "CAD";
  salary_min?: number;
  salary_max?: number;
  tech_stacks: string[];
  soft_skills: string[];
  qualifications: string[];
};

type JobBoardInsert = {
  job_search_preference_id: string;
  name: string;
  url: string;
  is_active: boolean;
  sort_order: number;
};

export type JobSearchFormData = z.infer<typeof jobSearchFormSchema>;

export async function saveJobSearchPreferences(
  data: JobSearchFormData
): Promise<ActionResponse<{ preferenceId: string }>> {
  try {
    // Validate the input data
    const validationResult = jobSearchFormSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        data: null,
        error: {
          code: "validation_error",
          message: "Invalid job search data provided",
        },
      };
    }

    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        data: null,
        error: {
          code: "auth/unauthorized",
          message: "You must be logged in to save job search preferences",
        },
      };
    }

    const { step1, step2 } = validationResult.data;

    // Start a transaction by using the Supabase client
    // First, check if user already has preferences (for update vs insert)
    const { data: existingPreferences } = await supabase
      .from("job_search_preferences")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    let preferenceId: string;

    if (existingPreferences) {
      // Update existing preferences
      const { data: updatedPreference, error: updateError } = await supabase
        .from("job_search_preferences")
        .update({
          years_of_experience: step1.yearsOfExperience,
          location: step1.location || null,
          job_type: step1.jobType,
          currency: step1.currency,
          salary_min: step1.salaryMin || null,
          salary_max: step1.salaryMax || null,
          tech_stacks: step1.techStacks,
          soft_skills: step1.softSkills,
          qualifications: step1.qualifications,
        })
        .eq("id", existingPreferences.id)
        .select("id")
        .single();

      if (updateError) {
        console.error("Error updating job search preferences:", updateError);
        return {
          data: null,
          error: {
            code: "database/update_failed",
            message: "Failed to update job search preferences",
          },
        };
      }

      preferenceId = updatedPreference.id;

      // Delete existing job boards for this preference
      const { error: deleteError } = await supabase
        .from("job_boards")
        .delete()
        .eq("job_search_preference_id", preferenceId);

      if (deleteError) {
        console.error("Error deleting existing job boards:", deleteError);
        return {
          data: null,
          error: {
            code: "database/delete_failed",
            message: "Failed to update job boards",
          },
        };
      }
    } else {
      // Insert new preferences
      const preferenceData: JobSearchPreferenceInsert = {
        user_id: user.id,
        years_of_experience: step1.yearsOfExperience,
        location: step1.location || undefined,
        job_type: step1.jobType,
        currency: step1.currency,
        salary_min: step1.salaryMin || undefined,
        salary_max: step1.salaryMax || undefined,
        tech_stacks: step1.techStacks,
        soft_skills: step1.softSkills,
        qualifications: step1.qualifications,
      };

      const { data: newPreference, error: insertError } = await supabase
        .from("job_search_preferences")
        .insert(preferenceData)
        .select("id")
        .single();

      if (insertError) {
        console.error("Error inserting job search preferences:", insertError);
        return {
          data: null,
          error: {
            code: "database/insert_failed",
            message: "Failed to save job search preferences",
          },
        };
      }

      preferenceId = newPreference.id;
    }

    // Insert job boards
    if (step2.jobBoards.length > 0) {
      const jobBoardsData: JobBoardInsert[] = step2.jobBoards.map(
        (board, index) => ({
          job_search_preference_id: preferenceId,
          name: board.name,
          url: board.url,
          is_active: board.isActive,
          sort_order: index,
        })
      );

      const { error: jobBoardsError } = await supabase
        .from("job_boards")
        .insert(jobBoardsData);

      if (jobBoardsError) {
        console.error("Error inserting job boards:", jobBoardsError);
        return {
          data: null,
          error: {
            code: "database/insert_failed",
            message: "Failed to save job boards",
          },
        };
      }
    }

    // Revalidate relevant paths
    revalidatePath("/dashboard");
    revalidatePath("/job-search-setup");

    return {
      data: { preferenceId },
      error: null,
    };
  } catch (error) {
    console.error("Unexpected error saving job search preferences:", error);
    return {
      data: null,
      error: {
        code: "server/unexpected_error",
        message: "An unexpected error occurred while saving your preferences",
      },
    };
  }
}

export async function getJobSearchPreferences(): Promise<
  ActionResponse<JobSearchFormData | null>
> {
  try {
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        data: null,
        error: {
          code: "auth/unauthorized",
          message: "You must be logged in to view job search preferences",
        },
      };
    }

    // Get user's preferences with job boards
    const { data: preferences, error: preferencesError } = await supabase
      .from("job_search_preferences")
      .select(
        `
        *,
        job_boards (*)
      `
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (preferencesError) {
      console.error("Error fetching job search preferences:", preferencesError);
      return {
        data: null,
        error: {
          code: "database/fetch_failed",
          message: "Failed to load job search preferences",
        },
      };
    }

    if (!preferences) {
      return {
        data: null,
        error: null,
      };
    }

    // Transform database data to form data structure
    const formData: JobSearchFormData = {
      step1: {
        yearsOfExperience: preferences.years_of_experience,
        location: preferences.location || undefined,
        jobType: preferences.job_type,
        currency: preferences.currency,
        salaryMin: preferences.salary_min || undefined,
        salaryMax: preferences.salary_max || undefined,
        techStacks: preferences.tech_stacks as string[],
        softSkills: preferences.soft_skills as string[],
        qualifications: preferences.qualifications as string[],
      },
      step2: {
        jobBoards: (preferences.job_boards || [])
          .sort(
            (a: { sort_order: number }, b: { sort_order: number }) =>
              a.sort_order - b.sort_order
          )
          .map(
            (board: {
              id: string;
              name: string;
              url: string;
              is_active: boolean;
            }) => ({
              id: board.id,
              name: board.name,
              url: board.url,
              isActive: board.is_active,
            })
          ),
      },
    };

    return {
      data: formData,
      error: null,
    };
  } catch (error) {
    console.error("Unexpected error fetching job search preferences:", error);
    return {
      data: null,
      error: {
        code: "server/unexpected_error",
        message: "An unexpected error occurred while loading your preferences",
      },
    };
  }
}
