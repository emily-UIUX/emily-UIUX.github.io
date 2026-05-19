"use client";

import * as React from "react";
import { Layers } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { CollectionCard } from "@/components/CollectionCard";
import { CollectionEditorDialog } from "@/components/CollectionEditorDialog";
import { EmptyState } from "@/components/EmptyState";
import { useCollections } from "@/hooks/useCollections";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { HydrationGate } from "@/components/HydrationGate";
import { getRepos } from "@/lib/repositories";

export default function CollectionsPage() {
  const { user } = useCurrentUser();
  const { collections, loading, refresh } = useCollections();
  const [counts, setCounts] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const repos = getRepos();
      const out: Record<string, number> = {};
      await Promise.all(
        collections.map(async (c) => {
          const items = await repos.collections.listItems(user?.uid ?? null, c.id);
          out[c.id] = items.length;
        })
      );
      if (alive) setCounts(out);
    })();
    return () => {
      alive = false;
    };
  }, [collections, user]);

  const seed = collections.filter((c) => c.source === "seed");
  const userCols = collections.filter((c) => c.source === "user");

  return (
    <AppShell>
      <TopBar title="컬렉션" right={<CollectionEditorDialog onCreated={refresh} />} />
      <div className="flex flex-col gap-5 px-4 py-4">
        <HydrationGate fallback={<div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>
          ) : (
            <>
              {seed.length > 0 ? (
                <section>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    추천 컬렉션
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {seed.map((c) => (
                      <CollectionCard
                        key={c.id}
                        collection={c}
                        itemCount={counts[c.id]}
                        href={`/collections/${c.id}`}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
              <section>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  내 컬렉션
                </h2>
                {userCols.length === 0 ? (
                  <EmptyState
                    icon={<Layers className="size-8" />}
                    title="아직 내 컬렉션이 없어요"
                    description="위 우측 + 버튼으로 새 컬렉션을 만들어 보세요."
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {userCols.map((c) => (
                      <CollectionCard
                        key={c.id}
                        collection={c}
                        itemCount={counts[c.id]}
                        href={`/collections/view?id=${encodeURIComponent(c.id)}`}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </HydrationGate>
      </div>
    </AppShell>
  );
}
