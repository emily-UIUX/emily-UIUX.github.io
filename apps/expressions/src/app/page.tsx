"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Sparkles, User as UserIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BrandTopBar } from "@/components/TopBar";
import { LibraryFilters } from "@/components/LibraryFilters";
import { ExpressionCard } from "@/components/ExpressionCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { useExpressions } from "@/hooks/useExpressions";
import { useLibraryFilters } from "@/stores/libraryFiltersStore";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { HydrationGate } from "@/components/HydrationGate";

export default function LibraryPage() {
  const tagSlugs = useLibraryFilters((s) => s.tagSlugs);
  const difficulty = useLibraryFilters((s) => s.difficulty);
  const reset = useLibraryFilters((s) => s.reset);
  const { items, loading } = useExpressions({ tagSlugs, difficulty, source: "all" });
  const hasFilters = tagSlugs.length > 0 || difficulty.length > 0;
  const { user } = useCurrentUser();

  return (
    <AppShell>
      <BrandTopBar
        right={
          <>
            <Button asChild variant="ghost" size="sm" aria-label="새 표현 추가">
              <Link href="/new">
                <Plus className="size-4" />
              </Link>
            </Button>
            <Link href="/profile" className="grid place-items-center" aria-label="프로필">
              {user ? (
                <UserAvatar user={user} size={32} />
              ) : (
                <span className="grid size-9 place-items-center rounded-full bg-secondary text-muted-foreground">
                  <UserIcon className="size-4" />
                </span>
              )}
            </Link>
          </>
        }
      />
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Sparkles className="size-4 text-primary" />
          <p className="text-xs text-muted-foreground">
            기억하고 싶은 표현을 저장하고, 컬렉션으로 정리해보세요.
          </p>
        </div>
        <LibraryFilters />
        <HydrationGate fallback={<div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>
          ) : items.length === 0 ? (
            <EmptyState
              title="조건에 맞는 표현이 없어요"
              description={hasFilters ? "필터를 다시 설정해보세요." : "아직 추가된 표현이 없어요."}
              action={
                hasFilters ? (
                  <Button variant="outline" onClick={reset}>
                    필터 초기화
                  </Button>
                ) : null
              }
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((e) => (
                <li key={e.id}>
                  <ExpressionCard expression={e} />
                </li>
              ))}
            </ul>
          )}
        </HydrationGate>
      </div>
    </AppShell>
  );
}
