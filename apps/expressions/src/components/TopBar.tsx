"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title?: React.ReactNode;
  back?: boolean | string;
  right?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function TopBar({ title, back, right, className, sticky = true }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => {
    if (typeof back === "string") {
      router.push(back);
      return;
    }
    if (window.history.length > 1) router.back();
    else router.push("/");
  };
  return (
    <header
      className={cn(
        "z-30 flex h-14 items-center justify-between gap-2 border-b border-border bg-background/80 px-3 backdrop-blur safe-top",
        sticky && "sticky top-0",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-1">
        {back ? (
          <Button variant="ghost" size="icon" aria-label="뒤로" onClick={handleBack}>
            <ChevronLeft className="size-5" />
          </Button>
        ) : null}
        <h1 className="truncate text-base font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-1">{right}</div>
    </header>
  );
}

export function BrandTopBar({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-border bg-background/80 px-4 backdrop-blur safe-top">
      <Link href="/" className="flex items-center gap-2 text-foreground">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
          <span className="text-base font-bold">E</span>
        </span>
        <span className="text-base font-semibold tracking-tight">Expressions</span>
      </Link>
      <div className="flex items-center gap-1">{right}</div>
    </header>
  );
}
