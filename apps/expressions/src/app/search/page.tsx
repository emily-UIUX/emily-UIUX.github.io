"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { Input } from "@/components/ui/input";
import { ExpressionCard } from "@/components/ExpressionCard";
import { EmptyState } from "@/components/EmptyState";
import { useSearchExpressions } from "@/hooks/useExpressions";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const { items, loading } = useSearchExpressions(query);

  return (
    <AppShell>
      <TopBar title="검색" />
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="영어, 한국어, 태그로 검색"
            className="pl-10"
            autoFocus
            inputMode="search"
          />
        </div>
        {!query.trim() ? (
          <EmptyState
            icon={<SearchIcon className="size-8" />}
            title="검색어를 입력해보세요"
            description="영어 표현, 한국어 의미, 태그 슬러그(예: idioms, business) 모두 찾을 수 있어요."
          />
        ) : loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">검색 중…</div>
        ) : items.length === 0 ? (
          <EmptyState title={`"${query}" 결과 없음`} description="다른 키워드로 시도해보세요." />
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((e) => (
              <li key={e.id}>
                <ExpressionCard expression={e} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
