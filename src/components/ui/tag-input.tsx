"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { TagInputProps } from "@/types";

export function TagInput({
  value,
  onChange,
  placeholder = "Add tags...",
  suggestions = [],
  maxTags,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  );

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (
      trimmedTag &&
      !value.includes(trimmedTag) &&
      (!maxTags || value.length < maxTags)
    ) {
      onChange([...value, trimmedTag]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      handleRemoveTag(value[value.length - 1]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const canAddMore = !maxTags || value.length < maxTags;

  return (
    <div className={cn("w-full", className)}>
      <div className="min-h-10 border border-input rounded-md px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1 items-center">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs flex items-center"
            >
              <span className="mr-1">{tag}</span>
              <span
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRemoveTag(tag);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </span>
            </Badge>
          ))}
          {canAddMore && (
            <Input
              ref={inputRef}
              type="text"
              placeholder={value.length === 0 ? placeholder : ""}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(inputValue.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="border-0 shadow-none focus-visible:ring-0 h-6 px-0 text-sm flex-1 min-w-[120px]"
            />
          )}
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="relative">
          <div className="absolute top-1 left-0 right-0 z-50 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2">
                Suggestions:
              </div>
              <div className="flex flex-wrap gap-1">
                {filteredSuggestions.slice(0, 10).map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleAddTag(suggestion)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {maxTags && (
        <div className="text-xs text-muted-foreground mt-1">
          {value.length} / {maxTags} tags
        </div>
      )}
    </div>
  );
}
