"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { TagChip } from "@/components/TagChip";
import { DifficultyDots } from "@/components/DifficultyDots";
import { AudioPlayButton } from "@/components/AudioPlayButton";
import { SaveButton } from "@/components/SaveButton";
import { AddToCollectionSheet } from "@/components/AddToCollectionSheet";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { useExpression } from "@/hooks/useExpression";
import { useSavedExpressions } from "@/hooks/useSavedExpressions";
import { HydrationGate } from "@/components/HydrationGate";

export function DetailClient() {
  const params = useSearchParams();
  const id = params.get("id");
  const { expression, examples, loading } = useExpression(id);
  const { refresh: refreshSaved } = useSavedExpressions();

  return (
    <AppShell>
      <TopBar title="표현 상세" back />
      <HydrationGate fallback={<div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
        {!id ? (
          <div className="px-4 py-8">
            <EmptyState title="잘못된 접근" description="URL에 표현 ID가 없어요." />
          </div>
        ) : loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>
        ) : !expression ? (
          <div className="px-4 py-8">
            <EmptyState title="표현을 찾을 수 없어요" description="삭제되었거나 잘못된 링크일 수 있어요." />
          </div>
        ) : (
          <article className="flex flex-col gap-5 px-4 py-4">
            <section className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold leading-tight text-foreground">{expression.text}</h2>
                  {expression.pronunciation ? (
                    <p className="mt-1 text-sm text-muted-foreground">/{expression.pronunciation}/</p>
                  ) : null}
                </div>
                <AudioPlayButton text={expression.text} size="icon" />
              </div>
              <p className="text-lg text-foreground/80">{expression.korean}</p>
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyDots level={expression.difficulty} />
                {expression.tone ? (
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                    {expression.tone}
                  </span>
                ) : null}
                {expression.tagSlugs.map((slug) => (
                  <TagChip key={slug} slug={slug} />
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-2">
              <SaveButton expressionId={expression.id} onSaved={refreshSaved} className="w-full" />
              <AddToCollectionSheet expressionId={expression.id} />
            </div>

            <Separator />

            <section className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">예문</h3>
              {examples.length === 0 ? (
                <p className="text-sm text-muted-foreground">아직 예문이 없어요.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {examples.map((ex) => (
                    <li key={ex.id} className="rounded-xl border border-border bg-card p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm leading-relaxed text-foreground">{ex.english}</p>
                        <AudioPlayButton text={ex.english} size="sm" />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{ex.korean}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </article>
        )}
      </HydrationGate>
    </AppShell>
  );
}
