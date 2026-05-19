"use client";

import { create } from "zustand";
import type { Difficulty } from "@/lib/types";

interface LibraryFiltersState {
  query: string;
  tagSlugs: string[];
  difficulty: Difficulty[];
  setQuery: (q: string) => void;
  toggleTag: (slug: string) => void;
  toggleDifficulty: (d: Difficulty) => void;
  reset: () => void;
}

export const useLibraryFilters = create<LibraryFiltersState>((set, get) => ({
  query: "",
  tagSlugs: [],
  difficulty: [],
  setQuery: (q) => set({ query: q }),
  toggleTag: (slug) => {
    const cur = get().tagSlugs;
    set({ tagSlugs: cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug] });
  },
  toggleDifficulty: (d) => {
    const cur = get().difficulty;
    set({ difficulty: cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d] });
  },
  reset: () => set({ query: "", tagSlugs: [], difficulty: [] }),
}));
