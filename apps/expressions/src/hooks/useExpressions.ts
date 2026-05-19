"use client";

import { useEffect, useState } from "react";
import type { Expression, Tag } from "@/lib/types";
import { getRepos } from "@/lib/repositories";
import type { ListExpressionsFilter } from "@/lib/repositories/types";

export function useExpressions(filters?: ListExpressionsFilter) {
  const [items, setItems] = useState<Expression[]>([]);
  const [loading, setLoading] = useState(true);
  const key = JSON.stringify(filters ?? {});
  useEffect(() => {
    let alive = true;
    setLoading(true);
    getRepos()
      .expressions.list(filters)
      .then((r) => {
        if (alive) setItems(r);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { items, loading };
}

export function useSearchExpressions(query: string) {
  const [items, setItems] = useState<Expression[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!query.trim()) {
      setItems([]);
      return;
    }
    let alive = true;
    setLoading(true);
    getRepos()
      .expressions.search(query)
      .then((r) => alive && setItems(r))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [query]);
  return { items, loading };
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    getRepos().expressions.listTags().then(setTags);
  }, []);
  return tags;
}
