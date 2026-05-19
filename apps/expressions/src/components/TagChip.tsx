"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SEED_TAG_BY_SLUG } from "@/lib/seed/tags.seed";

interface TagChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  slug: string;
  active?: boolean;
  asButton?: boolean;
  size?: "sm" | "md";
}

export function TagChip({ slug, active, asButton = false, size = "sm", className, ...rest }: TagChipProps) {
  const tag = SEED_TAG_BY_SLUG[slug];
  const label = tag?.name ?? slug;
  const color = tag?.color ?? "var(--primary)";
  const Comp = asButton ? "button" : "span";
  return (
    <Comp
      data-slot="tag-chip"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors",
        size === "md" && "px-3 py-1 text-xs",
        active
          ? "border-transparent text-background"
          : "border-border/80 bg-card text-foreground hover:bg-secondary",
        asButton && "cursor-pointer",
        className
      )}
      style={active ? { background: color } : { color }}
      {...rest}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", active && "bg-background/80")}
        style={!active ? { background: color } : undefined}
      />
      {label}
    </Comp>
  );
}
