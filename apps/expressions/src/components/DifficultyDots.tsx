import * as React from "react";
import type { Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DifficultyDots({
  level,
  className,
}: {
  level: Difficulty;
  className?: string;
}) {
  const color = `var(--difficulty-${level})`;
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} aria-label={`difficulty ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="block size-1.5 rounded-full"
          style={{ background: i <= level ? color : "var(--border)" }}
        />
      ))}
    </div>
  );
}
