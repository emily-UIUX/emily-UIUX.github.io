"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="size-5">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.5-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 45c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.8 26.8 37 24 37c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 41.6 16.2 45 24 45z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.3 5.3C40.8 35.5 45 30.3 45 24c0-1.2-.1-2.5-.4-3.5z"/>
    </svg>
  );
}

interface Props {
  className?: string;
  label?: string;
  size?: "default" | "lg";
}

export function GoogleSignInButton({ className, label = "Google로 계속하기", size = "lg" }: Props) {
  const signIn = useAuthStore((s) => s.signIn);
  const [busy, setBusy] = React.useState(false);
  return (
    <Button
      variant="outline"
      size={size}
      className={className}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await signIn();
        } finally {
          setBusy(false);
        }
      }}
    >
      <GoogleG />
      <span>{label}</span>
    </Button>
  );
}
