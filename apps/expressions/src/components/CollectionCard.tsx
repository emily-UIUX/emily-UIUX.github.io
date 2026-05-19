"use client";

import * as React from "react";
import Link from "next/link";
import { Layers, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Collection } from "@/lib/types";

export function CollectionCard({
  collection,
  itemCount,
  href,
}: {
  collection: Collection;
  itemCount?: number;
  href: string;
}) {
  const isSeed = collection.source === "seed";
  return (
    <Link href={href} className="block">
      <Card className={cn("relative gap-2 transition-colors hover:border-primary/40")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-9 place-items-center rounded-lg",
                isSeed ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"
              )}
            >
              <Layers className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{collection.title}</h3>
              {itemCount !== undefined ? (
                <p className="text-xs text-muted-foreground">{itemCount}개 표현</p>
              ) : null}
            </div>
          </div>
          {collection.pinned ? <Pin className="size-4 text-muted-foreground" /> : null}
        </div>
        {collection.description ? (
          <p className="text-xs text-muted-foreground line-clamp-2">{collection.description}</p>
        ) : null}
        {isSeed ? (
          <span className="absolute right-3 bottom-3 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
            추천
          </span>
        ) : null}
      </Card>
    </Link>
  );
}
