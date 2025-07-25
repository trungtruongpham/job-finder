"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupAction, oauthLogin } from "@/lib/actions/auth";
import { useFormStatus } from "react-dom";

// This will be implemented in the next step
function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <div className="glass-subtle rounded-xl p-1 glass-hover">
      <Button
        type="submit"
        className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm"
        disabled={pending}
      >
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </div>
  );
}

export function SignupForm() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Handle Google login
  async function handleGoogleLogin() {
    await oauthLogin("google");
  }

  // This function will be implemented with Supabase in the next step
  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);

    try {
      const response = await signupAction(formData);

      // If there's an error, show it (successful signup will redirect automatically)
      if (response?.error) {
        setErrorMessage(response.error.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Sign Up
        </h1>
        <p className="text-muted-foreground">
          Create an account to start your job search
        </p>
      </div>

      {/* Google OAuth Button with glasmorphism */}
      <div className="glass-subtle rounded-xl p-1 glass-hover">
        <Button
          variant="outline"
          type="button"
          className="w-full bg-transparent border-border/50 backdrop-blur-sm hover:bg-accent/50"
          onClick={handleGoogleLogin}
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Continue with Google
        </Button>
      </div>

      {/* Divider with glasmorphism */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-4 text-muted-foreground glass-subtle rounded-lg py-1">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Error message with glasmorphism */}
      {errorMessage && (
        <div className="glass-subtle rounded-xl p-4 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">{errorMessage}</p>
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Name
          </label>
          <div className="glass-subtle rounded-lg p-[1px]">
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="bg-transparent border-0 focus:ring-1 focus:ring-primary/50 backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <div className="glass-subtle rounded-lg p-[1px]">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              required
              autoComplete="email"
              className="bg-transparent border-0 focus:ring-1 focus:ring-primary/50 backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <div className="glass-subtle rounded-lg p-[1px]">
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="bg-transparent border-0 focus:ring-1 focus:ring-primary/50 backdrop-blur-sm"
            />
          </div>
        </div>
        <SignupButton />
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline text-primary hover:text-primary/80 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
