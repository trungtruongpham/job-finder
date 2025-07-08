"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, ExternalLink, Sparkles } from "lucide-react";
import { jobBoardsSchema } from "@/lib/validations/job-search";
import { POPULAR_JOB_BOARDS } from "@/lib/constants/job-search";
import type { JobBoard, StepProps } from "@/types";

type JobBoardsFormData = {
  jobBoards: JobBoard[];
};

export function JobBoardsForm({ data, updateData }: StepProps) {
  const form = useForm<JobBoardsFormData>({
    resolver: zodResolver(jobBoardsSchema),
    defaultValues: {
      jobBoards: data.step2.jobBoards || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "jobBoards",
  });

  // Update parent data when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.jobBoards && Array.isArray(value.jobBoards)) {
        const validJobBoards = value.jobBoards.filter(
          (board): board is JobBoard =>
            board !== undefined &&
            typeof board.id === "string" &&
            typeof board.name === "string" &&
            typeof board.url === "string" &&
            typeof board.isActive === "boolean"
        );
        updateData("step2", { jobBoards: validJobBoards });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  const addJobBoard = (name: string = "", url: string = "") => {
    append({
      id: Date.now().toString(),
      name,
      url,
      isActive: true,
    });
  };

  const addPopularJobBoard = (jobBoard: { name: string; url: string }) => {
    const exists = fields.some((field) => field.url === jobBoard.url);
    if (!exists) {
      addJobBoard(jobBoard.name, jobBoard.url);
    }
  };

  const getUrlDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Job Boards & Sources
        </h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll search for jobs on the boards you select. You can add
          custom job boards or use our &quot;Quick Add&quot; suggestions.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          {/* Quick Add Popular Job Boards */}
          <Card className="glass glass-hover border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-primary">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Popular Job Boards
              </CardTitle>
              <CardDescription>
                Quick add commonly used job search platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {POPULAR_JOB_BOARDS.map((jobBoard) => {
                  const isAdded = fields.some(
                    (field) => field.url === jobBoard.url
                  );
                  return (
                    <Button
                      key={jobBoard.url}
                      type="button"
                      variant={isAdded ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => addPopularJobBoard(jobBoard)}
                      disabled={isAdded}
                      className="text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {jobBoard.name}
                      {isAdded && " ✓"}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Custom Job Boards */}
          <Card className="glass glass-hover border-0 bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-primary">
                  Your Job Boards
                </CardTitle>
                <CardDescription>
                  Manage your job search sources
                </CardDescription>
              </div>
              <Button type="button" onClick={() => addJobBoard()} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Board
              </Button>
            </CardHeader>
            <CardContent>
              {fields.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No job boards added yet.</p>
                  <p className="text-sm">
                    Add some popular ones above or create your own.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="glass rounded-lg p-4 space-y-4 border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          {field.url && (
                            <Badge variant="secondary" className="text-xs">
                              {getUrlDomain(field.url)}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormField
                            control={form.control}
                            name={`jobBoards.${index}.isActive`}
                            render={({ field: switchField }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormLabel className="text-sm">
                                  Active
                                </FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={switchField.value ?? true}
                                    onCheckedChange={switchField.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`jobBoards.${index}.name`}
                          render={({ field: nameField }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., LinkedIn Jobs"
                                  {...nameField}
                                  value={nameField.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`jobBoards.${index}.url`}
                          render={({ field: urlField }) => (
                            <FormItem>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <div className="flex space-x-2">
                                  <Input
                                    placeholder="https://example.com/jobs"
                                    {...urlField}
                                    value={urlField.value || ""}
                                  />
                                  {urlField.value && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        window.open(urlField.value, "_blank")
                                      }
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {fields.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <FormDescription>
                    You have {fields.filter((f) => f.isActive).length} active
                    job board
                    {fields.filter((f) => f.isActive).length !== 1
                      ? "s"
                      : ""}{" "}
                    configured.
                  </FormDescription>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="glass glass-hover border-0 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-primary">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <p>
                  • Include both general job boards (LinkedIn, Indeed) and niche
                  ones specific to your industry
                </p>
                <p>• Company career pages can be added as custom job boards</p>
                <p>
                  • Use the &quot;Active&quot; toggle to temporarily disable job
                  boards without removing them
                </p>
                <p>• You can always come back and edit this list later</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  );
}
