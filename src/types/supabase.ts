export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          avatar_url?: string | null;
        };
      };
      job_search_preferences: {
        Row: {
          id: string;
          user_id: string;
          years_of_experience: number;
          location: string | null;
          job_type: "full-time" | "part-time" | "contract" | "remote";
          currency: "USD" | "EUR" | "GBP" | "CAD";
          salary_min: number | null;
          salary_max: number | null;
          tech_stacks: Json;
          soft_skills: Json;
          qualifications: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          years_of_experience: number;
          location?: string | null;
          job_type: "full-time" | "part-time" | "contract" | "remote";
          currency?: "USD" | "EUR" | "GBP" | "CAD";
          salary_min?: number | null;
          salary_max?: number | null;
          tech_stacks?: Json;
          soft_skills?: Json;
          qualifications?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          years_of_experience?: number;
          location?: string | null;
          job_type?: "full-time" | "part-time" | "contract" | "remote";
          currency?: "USD" | "EUR" | "GBP" | "CAD";
          salary_min?: number | null;
          salary_max?: number | null;
          tech_stacks?: Json;
          soft_skills?: Json;
          qualifications?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      job_boards: {
        Row: {
          id: string;
          job_search_preference_id: string;
          name: string;
          url: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_search_preference_id: string;
          name: string;
          url: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_search_preference_id?: string;
          name?: string;
          url?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      currency_enum: "USD" | "EUR" | "GBP" | "CAD";
      job_type_enum: "full-time" | "part-time" | "contract" | "remote";
    };
  };
}
