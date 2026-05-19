"use client";

import { useCallback, useEffect, useState } from "react";
import type { Collection, CollectionItem, Expression } from "@/lib/types";
import { getRepos } from "@/lib/repositories";
import { useCurrentUser } from "./useCurrentUser";

export function useCollections() {
  const { user } = useCurrentUser();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getRepos()
      .collections.list(user?.uid ?? null)
      .then((r) => {
        if (alive) setCollections(r);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [user, version]);

  return { collections, loading, refresh };
}

export function useCollection(id: string | null | undefined) {
  const { user } = useCurrentUser();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    const repos = getRepos();
    (async () => {
      const c = await repos.collections.get(user?.uid ?? null, id);
      if (!alive) return;
      setCollection(c);
      if (!c) {
        setItems([]);
        setExpressions([]);
        setLoading(false);
        return;
      }
      const its = await repos.collections.listItems(user?.uid ?? null, id);
      if (!alive) return;
      setItems(its);
      const exps = await repos.expressions.getByIds(its.map((it) => it.expressionId));
      if (!alive) return;
      const order = new Map(its.map((it) => [it.expressionId, it.sortOrder]));
      exps.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
      setExpressions(exps);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [id, user, version]);

  return { collection, items, expressions, loading, refresh };
}
