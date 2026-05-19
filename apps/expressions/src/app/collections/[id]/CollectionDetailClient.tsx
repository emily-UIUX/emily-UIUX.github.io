"use client";

import * as React from "react";
import { Pin, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { ExpressionCard } from "@/components/ExpressionCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/useCollections";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { getRepos } from "@/lib/repositories";
import { HydrationGate } from "@/components/HydrationGate";

export function CollectionDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useCurrentUser();
  const { collection, expressions, loading, refresh } = useCollection(id);

  const isOwner = collection?.source === "user" && collection.userId === user?.uid;

  const deleteCollection = async () => {
    if (!isOwner || !user || !collection) return;
    if (!confirm(`"${collection.title}" 컬렉션을 삭제할까요? 표현 자체는 저장 목록에 그대로 남아요.`)) return;
    await getRepos().collections.delete(user.uid, collection.id);
    router.push("/collections");
  };

  const togglePin = async () => {
    if (!isOwner || !user || !collection) return;
    await getRepos().collections.update(user.uid, collection.id, { pinned: !collection.pinned });
    refresh();
  };

  return (
    <AppShell>
      <TopBar
        title={collection?.title ?? "컬렉션"}
        back
        right={
          isOwner ? (
            <>
              <Button variant="ghost" size="icon" onClick={togglePin} aria-label="고정">
                <Pin className={collection?.pinned ? "size-5 fill-primary text-primary" : "size-5"} />
              </Button>
              <Button variant="ghost" size="icon" onClick={deleteCollection} aria-label="삭제">
                <Trash2 className="size-5 text-destructive" />
              </Button>
            </>
          ) : null
        }
      />
      <div className="flex flex-col gap-4 px-4 py-4">
        <HydrationGate fallback={<div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>
          ) : !collection ? (
            <EmptyState
              title="컬렉션을 찾을 수 없어요"
              description="삭제되었거나 다른 사용자의 컬렉션일 수 있어요."
              action={
                <Button variant="outline" onClick={() => router.push("/collections")}>
                  컬렉션 목록으로
                </Button>
              }
            />
          ) : (
            <>
              {collection.description ? (
                <p className="text-sm text-muted-foreground">{collection.description}</p>
              ) : null}
              {expressions.length === 0 ? (
                <EmptyState
                  title="아직 비어 있어요"
                  description="라이브러리에서 표현을 골라 이 컬렉션에 추가해보세요."
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
            </>
          )}
        </HydrationGate>
      </div>
    </AppShell>
  );
}
