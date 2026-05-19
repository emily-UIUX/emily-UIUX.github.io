"use client";

import * as React from "react";
import { useLibraryFilters } from "@/stores/libraryFiltersStore";
import { useTags } from "@/hooks/useExpressions";
import { TagChip } from "@/components/TagChip";
import type { Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Difficulty[] = [1, 2, 3, 4, 5];

export function LibraryFilters() {
  const tags = useTags();
  const tagSlugs = useLibraryFilters((s) => s.tagSlugs);
  const toggleTag = useLibraryFilters((s) => s.toggleTag);
  const difficulty = useLibraryFilters((s) => s.difficulty);
  const toggleDifficulty = useLibraryFilters((s) => s.toggleDifficulty);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden px-3 -mx-3">
        {DIFFICULTIES.map((d) => {
          const active = difficulty.includes(d);
          return (
            <button
              key={d}
              onClick={() => toggleDifficulty(d)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              난이도 {d}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <TagChip
            key={t.slug}
            slug={t.slug}
            asButton
            active={tagSlugs.includes(t.slug)}
            onClick={() => toggleTag(t.slug)}
          />
        ))}
      </div>
    </div>
  );
}
