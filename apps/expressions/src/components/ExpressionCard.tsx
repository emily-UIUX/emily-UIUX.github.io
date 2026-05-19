"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TagChip } from "@/components/TagChip";
import { DifficultyDots } from "@/components/DifficultyDots";
import { AudioPlayButton } from "@/components/AudioPlayButton";
import { SaveButton } from "@/components/SaveButton";
import type { Expression } from "@/lib/types";

export function ExpressionCard({ expression }: { expression: Expression }) {
  return (
    <Link href={`/detail?id=${encodeURIComponent(expression.id)}`} className="block focus:outline-none">
      <Card className="gap-3 hover:border-primary/40 active:scale-[0.99] transition-transform animate-fade-in">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-snug text-foreground">{expression.text}</h3>
            {expression.pronunciation ? (
              <p className="mt-0.5 text-xs text-muted-foreground">/{expression.pronunciation}/</p>
            ) : null}
            <p className="mt-1.5 text-sm text-muted-foreground">{expression.korean}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <AudioPlayButton text={expression.text} size="sm" />
            <SaveButton expressionId={expression.id} compact />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyDots level={expression.difficulty} className="mr-1" />
          {expression.tagSlugs.slice(0, 3).map((slug) => (
            <TagChip key={slug} slug={slug} />
          ))}
        </div>
      </Card>
    </Link>
  );
}
