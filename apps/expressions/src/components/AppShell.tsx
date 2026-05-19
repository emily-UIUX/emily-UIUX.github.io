import * as React from "react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
}

export function AppShell({ children, className, withBottomNav = true }: AppShellProps) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-background",
        withBottomNav && "pb-20",
        className
      )}
    >
      {children}
    </div>
  );
}
