"use client";

import * as React from "react";
import { Plus, Check } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCollections } from "@/hooks/useCollections";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getRepos } from "@/lib/repositories";
import { useAuthStore } from "@/stores/authStore";

interface Props {
  expressionId: string;
  trigger?: React.ReactNode;
}

export function AddToCollectionSheet({ expressionId, trigger }: Props) {
  const [open, setOpen] = React.useState(false);
  const { user } = useCurrentUser();
  const signIn = useAuthStore((s) => s.signIn);
  const { collections, refresh } = useCollections();
  const [newTitle, setNewTitle] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [memberships, setMemberships] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!open || !user) return;
    let alive = true;
    (async () => {
      const repos = getRepos();
      const next: Record<string, boolean> = {};
      const userCols = collections.filter((c) => c.source === "user");
      await Promise.all(
        userCols.map(async (c) => {
          const items = await repos.collections.listItems(user.uid, c.id);
          next[c.id] = items.some((i) => i.expressionId === expressionId);
        })
      );
      if (alive) setMemberships(next);
    })();
    return () => {
      alive = false;
    };
  }, [open, user, collections, expressionId]);

  const ensureUser = async () => {
    if (user) return user;
    if (!confirm("컬렉션에 추가하려면 로그인이 필요해요. 로그인할까요?")) return null;
    await signIn();
    return useAuthStore.getState().user;
  };

  const toggleMembership = async (collectionId: string) => {
    const u = await ensureUser();
    if (!u) return;
    setBusy(true);
    try {
      const repos = getRepos();
      await repos.userSaved.save(u.uid, expressionId);
      if (memberships[collectionId]) {
        await repos.collections.removeItem(u.uid, collectionId, expressionId);
        setMemberships((m) => ({ ...m, [collectionId]: false }));
      } else {
        await repos.collections.addItem(u.uid, collectionId, { expressionId });
        setMemberships((m) => ({ ...m, [collectionId]: true }));
      }
    } finally {
      setBusy(false);
    }
  };

  const createAndAdd = async () => {
    const title = newTitle.trim();
    if (!title) return;
    const u = await ensureUser();
    if (!u) return;
    setBusy(true);
    try {
      const repos = getRepos();
      const c = await repos.collections.create(u.uid, { title });
      await repos.userSaved.save(u.uid, expressionId);
      await repos.collections.addItem(u.uid, c.id, { expressionId });
      setNewTitle("");
      refresh();
      setMemberships((m) => ({ ...m, [c.id]: true }));
    } finally {
      setBusy(false);
    }
  };

  const userCols = collections.filter((c) => c.source === "user");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="outline">
            <Plus className="size-4" /> 컬렉션에 추가
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>컬렉션에 추가</SheetTitle>
          <SheetDescription>저장과 동시에 컬렉션으로 정리할 수 있어요.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="새 컬렉션 이름…"
              onKeyDown={(e) => {
                if (e.key === "Enter") void createAndAdd();
              }}
            />
            <Button size="lg" onClick={createAndAdd} disabled={!newTitle.trim() || busy}>
              만들기
            </Button>
          </div>
          {userCols.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              아직 컬렉션이 없어요. 위에서 새로 만들어 보세요.
            </p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {userCols.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => void toggleMembership(c.id)}
                    disabled={busy}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-secondary disabled:opacity-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{c.title}</p>
                      {c.description ? (
                        <p className="truncate text-xs text-muted-foreground">{c.description}</p>
                      ) : null}
                    </div>
                    <div className="ml-3 grid size-7 place-items-center rounded-full border border-border">
                      {memberships[c.id] ? <Check className="size-4 text-primary" /> : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
