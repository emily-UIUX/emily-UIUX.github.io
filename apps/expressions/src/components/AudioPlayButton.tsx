"use client";

import * as React from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTTS } from "@/hooks/useTTS";
import { cn } from "@/lib/utils";

interface AudioPlayButtonProps {
  text: string;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
}

export function AudioPlayButton({ text, size = "icon", className }: AudioPlayButtonProps) {
  const { supported, speaking, play, stop } = useTTS();
  if (!supported) {
    return (
      <Button variant="ghost" size={size} disabled aria-label="발음 미지원" className={className}>
        <VolumeX className="size-5" />
      </Button>
    );
  }
  return (
    <Button
      variant={speaking ? "default" : "outline"}
      size={size}
      aria-label="발음 듣기"
      onClick={(e) => {
        e.stopPropagation();
        if (speaking) stop();
        else void play(text);
      }}
      className={cn(className)}
    >
      {speaking ? <Loader2 className="size-5 animate-spin" /> : <Volume2 className="size-5" />}
    </Button>
  );
}
