import * as React from "react";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";

export function UserAvatar({ user, size = 36, className }: { user: User; size?: number; className?: string }) {
  const initials = (user.displayName || user.email || "?")
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn("grid place-items-center overflow-hidden rounded-full bg-primary/15 text-primary", className)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
      aria-label={user.displayName}
    >
      {user.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.photoUrl} alt={user.displayName} className="size-full object-cover" />
      ) : (
        <span className="font-semibold">{initials || "?"}</span>
      )}
    </div>
  );
}
