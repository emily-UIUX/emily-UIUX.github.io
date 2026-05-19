"use client";

import * as React from "react";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { ExpressionCard } from "@/components/ExpressionCard";
import { EmptyState } from "@/components/EmptyState";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSavedExpressions } from "@/hooks/useSavedExpressions";
import { HydrationGate } from "@/components/HydrationGate";

export default function SavedPage() {
  const { user, hydrated } = useCurrentUser();
  const { expressions, loading } = useSavedExpressions();

  return (
    <AppShell>
      <TopBar title="저장한 표현" />
      <div className="flex flex-col gap-4 px-4 py-4">
        <HydrationGate fallback={<div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
          {!hydrated ? null : !user ? (
            <EmptyState
              icon={<Bookmark className="size-8" />}
              title="로그인이 필요해요"
              description="기억하고 싶은 표현을 모아두려면 로그인하세요."
              action={<GoogleSignInButton />}
            />
          ) : loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>
          ) : expressions.length === 0 ? (
            <EmptyState
              icon={<Bookmark className="size-8" />}
              title="아직 저장한 표현이 없어요"
              description="라이브러리에서 마음에 드는 표현을 저장해보세요."
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {expressions.map((e) => (
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
