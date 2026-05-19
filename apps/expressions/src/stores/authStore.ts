"use client";

import { create } from "zustand";
import type { User } from "@/lib/types";
import { getRepos } from "@/lib/repositories";

interface AuthState {
  user: User | null;
  hydrated: boolean;
  init: () => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

let initialized = false;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  init: () => {
    if (initialized) return;
    initialized = true;
    const repos = getRepos();
    set({ user: repos.auth.getCurrentUser(), hydrated: true });
    repos.auth.onAuthChanged((u) => set({ user: u }));
  },
  signIn: async () => {
    const u = await getRepos().auth.signInWithGoogleMock();
    set({ user: u });
  },
  signOut: async () => {
    await getRepos().auth.signOut();
    set({ user: null });
  },
}));
