"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Library, Search, Bookmark, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "라이브러리", icon: Library, match: (p: string) => p === "/" },
  { href: "/search", label: "검색", icon: Search, match: (p: string) => p.startsWith("/search") },
  { href: "/saved", label: "저장", icon: Bookmark, match: (p: string) => p.startsWith("/saved") },
  { href: "/collections", label: "컬렉션", icon: Layers, match: (p: string) => p.startsWith("/collections") },
];

export function BottomNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-stretch justify-around border-t border-border bg-background/95 backdrop-blur safe-bottom">
      {ITEMS.map((it) => {
        const active = it.match(pathname);
        const Icon = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 px-2 py-2 text-[11px] font-medium transition-colors",
              active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon className={cn("size-5", active && "stroke-[2.5]")} />
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
