"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

import { jobDetailsSchema } from "@/lib/validations/job-search";
import {
  TECH_STACKS,
  SOFT_SKILLS,
  QUALIFICATIONS,
  CURRENCIES,
  JOB_TYPES,
} from "@/lib/constants/job-search";
import type { JobDetails, StepProps } from "@/types";
import { useEffect } from "react";

export function JobDetailsForm({ data, updateData }: StepProps) {
  const form = useForm<JobDetails>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      // Ensure all values are defined from the start
      yearsOfExperience: data.step1.yearsOfExperience || 0,
      salaryMin: data.step1.salaryMin || undefined,
      salaryMax: data.step1.salaryMax || undefined,
      currency: data.step1.currency || "USD",
      techStacks: data.step1.techStacks || [],
      softSkills: data.step1.softSkills || [],
      qualifications: data.step1.qualifications || [],
      jobType: data.step1.jobType || "full-time",
      location: data.step1.location || "",
    },
  });

  const watchedValues = form.watch();

  // Update parent data when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        updateData("step1", value as JobDetails);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Job Preferences
        </h2>
        <p className="text-muted-foreground mt-2">
          Tell us about your ideal job to help us match you with the best
          opportunities
        </p>
      </div>

      <Form {...form}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Experience */}
          <Card className="glass glass-hover border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Experience & Location
              </CardTitle>
              <CardDescription>
                Your professional background and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="50"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? 0 : Number(value));
                        }}
                        value={field.value?.toString() || "0"}
                      />
                    </FormControl>
                    <FormDescription>
                      Total years of professional experience
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., San Francisco, CA or Remote"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      City, state, or specify remote work preference
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "full-time"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Salary */}
          <Card className="glass glass-hover border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Compensation
              </CardTitle>
              <CardDescription>
                Your salary expectations and currency preference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "USD"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Salary (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          min="0"
                          step="1000"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                          value={field.value?.toString() || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Salary (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="100000"
                          min="0"
                          step="1000"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                          value={field.value?.toString() || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormDescription>
                Annual salary range in{" "}
                <span className="font-semibold text-primary bg-primary/10 px-1 py-0.5 rounded">
                  {watchedValues.currency || "your preferred currency"}
                </span>
              </FormDescription>
            </CardContent>
          </Card>
        </div>

        {/* Technical Skills */}
        <Card className="glass glass-hover border-0 bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg text-primary">
              Technical Skills
            </CardTitle>
            <CardDescription>
              Select the technologies and programming languages you work with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="techStacks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tech Stacks <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={TECH_STACKS}
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Select technologies..."
                      maxDisplayed={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Select all technologies you have experience with
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Soft Skills & Qualifications */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass glass-hover border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Soft Skills
              </CardTitle>
              <CardDescription>
                Highlight your interpersonal and professional skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="softSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={SOFT_SKILLS}
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Select soft skills..."
                        maxDisplayed={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Search and select your interpersonal and professional
                      skills
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="glass glass-hover border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Qualifications
              </CardTitle>
              <CardDescription>
                Your education and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education & Certifications</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={QUALIFICATIONS}
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Select qualifications..."
                        maxDisplayed={3}
                      />
                    </FormControl>
                    <FormDescription>
                      Select all that apply to your background
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  );
}
