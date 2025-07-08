"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/types/actions";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export async function loginAction(
  formData: FormData
): Promise<ActionResponse<{ userId: string }>> {
  try {
    // Extract and validate form data
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Validate with Zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      return {
        data: null,
        error: {
          code: "validation_error",
          message:
            result.error.errors[0]?.message || "Invalid email or password",
        },
      };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        data: null,
        error: {
          code: error.code || "auth/unknown",
          message: error.message || "Failed to sign in",
        },
      };
    }

    // Revalidate and redirect after successful login
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Login error:", error);

    if (isRedirectError(error)) {
      redirect("/");
    }

    return {
      data: null,
      error: {
        code: "auth/unknown",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function oauthLogin(provider: "google") {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      scopes: "https://www.googleapis.com/auth/userinfo.email",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth login error:", error);
    return redirect("/login?error=oauth_failed");
  }

  return redirect(data.url);
}

export async function signupAction(
  formData: FormData
): Promise<ActionResponse<{ userId: string }>> {
  try {
    // Extract and validate form data
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Validate with Zod
    const result = signupSchema.safeParse({ name, email, password });

    if (!result.success) {
      return {
        data: null,
        error: {
          code: "validation_error",
          message: result.error.errors[0]?.message || "Invalid signup data",
        },
      };
    }

    const supabase = await createClient();

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (authError) {
      return {
        data: null,
        error: {
          code: authError.code || "auth/unknown",
          message: authError.message || "Failed to create account",
        },
      };
    }

    // Create profile in database
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: name,
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        // Continue anyway, the auth part succeeded
      }
    }

    // Revalidate and redirect after successful signup
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Signup error:", error);
    return {
      data: null,
      error: {
        code: "auth/unknown",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function resetPasswordAction(
  formData: FormData
): Promise<ActionResponse<{ email: string }>> {
  try {
    // Extract and validate form data
    const email = formData.get("email")?.toString() || "";

    // Validate with Zod
    const result = resetPasswordSchema.safeParse({ email });

    if (!result.success) {
      return {
        data: null,
        error: {
          code: "validation_error",
          message: result.error.errors[0]?.message || "Invalid email address",
        },
      };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      return {
        data: null,
        error: {
          code: error.code || "auth/unknown",
          message: error.message || "Failed to send password reset email",
        },
      };
    }

    return {
      data: { email },
      error: null,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      data: null,
      error: {
        code: "auth/unknown",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function signOut() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
      // Even if there's an error, try to clear local session
    }

    // Revalidate the current path to update server-side state
    revalidatePath("/");

    // Redirect to login page
    redirect("/login");
  } catch (error) {
    console.error("Unexpected sign out error:", error);
    // Fallback: still redirect to login
    redirect("/login");
  }
}
