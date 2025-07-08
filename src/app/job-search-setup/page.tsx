"use client";

import { JobSearchWizard } from "@/components/job-search-wizard";
import { Toaster } from "sonner";
import type { JobSearchFormData } from "@/types";

export default function JobSearchSetupPage() {
  const handleComplete = async (data: JobSearchFormData) => {
    console.log("Job search preferences:", data);
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background with gradient and animated elements */}
        <div className="absolute inset-0">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

          {/* Animated background orbs */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-chart-2/10 to-chart-3/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 container mx-auto py-8 px-4">
          <JobSearchWizard onComplete={handleComplete} />
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
