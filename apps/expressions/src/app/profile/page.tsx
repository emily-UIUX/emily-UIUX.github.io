"use client";

import * as React from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/EmptyState";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/stores/authStore";
import { HydrationGate } from "@/components/HydrationGate";

export default function ProfilePage() {
  const { user, hydrated } = useCurrentUser();
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <AppShell>
      <TopBar title="프로필" back />
      <div className="flex flex-col gap-5 px-4 py-4">
        <HydrationGate fallback={<div className="py-12 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
          {!hydrated ? null : !user ? (
            <EmptyState
              title="아직 로그인하지 않았어요"
              description="(프로토타입 단계에서는 Google 계정 정보를 가져오지 않고 가상 사용자로 시작해요.)"
              action={<GoogleSignInButton />}
            />
          ) : (
            <>
              <section className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <UserAvatar user={user} size={56} />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-foreground">{user.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  계정 (Prototype)
                </h3>
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex items-start gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      현재는 데이터를 브라우저(localStorage)에 저장해요. 다른 기기와 동기화하려면 Firebase 연동
                      이후에 가능해요.
                    </span>
                  </div>
                  <Button variant="outline" onClick={() => void signOut()}>
                    <LogOut className="size-4" /> 로그아웃
                  </Button>
                </div>
              </section>
            </>
          )}

          <section className="rounded-2xl border border-border bg-card p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">정보</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-foreground">버전</span>
                <span className="text-muted-foreground">0.1.0 prototype</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-foreground">데이터 저장소</span>
                <span className="text-muted-foreground">LocalStorage</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-foreground">예정 백엔드</span>
                <span className="text-muted-foreground inline-flex items-center gap-1">
                  Firebase <ExternalLink className="size-3" />
                </span>
              </li>
            </ul>
          </section>
        </HydrationGate>
      </div>
    </AppShell>
  );
}
