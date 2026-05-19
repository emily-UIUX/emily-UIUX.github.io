"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function useCurrentUser() {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return { user, hydrated };
}
