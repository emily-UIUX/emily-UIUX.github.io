"use client";

import * as React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useIsSaved } from "@/hooks/useSavedExpressions";
import { getRepos } from "@/lib/repositories";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  expressionId: string;
  compact?: boolean;
  className?: string;
  onSaved?: () => void;
}

export function SaveButton({ expressionId, compact, className, onSaved }: SaveButtonProps) {
  const { user } = useCurrentUser();
  const { saved, refresh } = useIsSaved(expressionId);
  const [busy, setBusy] = React.useState(false);
  const signIn = useAuthStore((s) => s.signIn);

  const onClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      if (!user) {
        if (!confirm("저장하려면 로그인이 필요해요. 지금 로그인할까요?")) return;
        await signIn();
        const u = useAuthStore.getState().user;
        if (!u) return;
        await getRepos().userSaved.save(u.uid, expressionId);
        refresh();
        onSaved?.();
        return;
      }
      if (saved) await getRepos().userSaved.unsave(user.uid, expressionId);
      else await getRepos().userSaved.save(user.uid, expressionId);
      refresh();
      onSaved?.();
    } finally {
      setBusy(false);
    }
  };

  const Icon = saved ? BookmarkCheck : Bookmark;

  if (compact) {
    return (
      <Button
        variant={saved ? "default" : "outline"}
        size="sm"
        onClick={onClick}
        disabled={busy}
        aria-label={saved ? "저장 취소" : "저장"}
        className={cn("h-9 w-9 p-0", className)}
      >
        <Icon className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      variant={saved ? "default" : "outline"}
      onClick={onClick}
      disabled={busy}
      className={cn(className)}
      aria-pressed={saved}
    >
      <Icon className="size-4" />
      {saved ? "저장됨" : "저장하기"}
    </Button>
  );
}
