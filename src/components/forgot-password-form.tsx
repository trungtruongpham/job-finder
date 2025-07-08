"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "@/lib/actions/auth";
import { useFormStatus } from "react-dom";

function ResetButton() {
  const { pending } = useFormStatus();

  return (
    <div className="glass-subtle rounded-xl p-1 glass-hover">
      <Button
        type="submit"
        className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm"
        disabled={pending}
      >
        {pending ? "Sending..." : "Send reset link"}
      </Button>
    </div>
  );
}

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);

    try {
      const response = await resetPasswordAction(formData);

      if (response.error) {
        setErrorMessage(response.error.message);
        return;
      }

      // Successfully sent reset email
      setIsSubmitted(true);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Reset Password
        </h1>
        <p className="text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      {isSubmitted ? (
        <div className="space-y-4 text-center">
          <div className="glass-subtle rounded-xl p-4 border border-green-500/20 bg-green-500/5">
            <p className="text-green-700 dark:text-green-300 font-medium">
              We&apos;ve sent you an email with a link to reset your password.
            </p>
          </div>
          <div className="glass-subtle rounded-xl p-1 glass-hover">
            <Button
              asChild
              className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm"
            >
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Error message with glasmorphism */}
          {errorMessage && (
            <div className="glass-subtle rounded-xl p-4 border border-destructive/20">
              <p className="text-sm text-destructive font-medium">
                {errorMessage}
              </p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
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
            <ResetButton />
          </form>
        </>
      )}

      {!isSubmitted && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            <Link
              href="/login"
              className="underline text-primary hover:text-primary/80 transition-colors"
            >
              Back to login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
