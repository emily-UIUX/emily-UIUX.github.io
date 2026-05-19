"use client";

import { useCallback, useEffect, useState } from "react";
import type { UserSavedExpression, Expression } from "@/lib/types";
import { getRepos } from "@/lib/repositories";
import { useCurrentUser } from "./useCurrentUser";

export function useSavedExpressions() {
  const { user } = useCurrentUser();
  const [saved, setSaved] = useState<UserSavedExpression[]>([]);
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    if (!user) {
      setSaved([]);
      setExpressions([]);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    const repos = getRepos();
    repos.userSaved.list(user.uid).then(async (rows) => {
      if (!alive) return;
      setSaved(rows);
      const exps = await repos.expressions.getByIds(rows.map((r) => r.expressionId));
      if (!alive) return;
      setExpressions(exps);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [user, version]);

  return { saved, expressions, loading, refresh };
}

export function useIsSaved(expressionId: string | null | undefined) {
  const { user } = useCurrentUser();
  const [saved, setSaved] = useState(false);
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    if (!user || !expressionId) {
      setSaved(false);
      return;
    }
    let alive = true;
    getRepos()
      .userSaved.get(user.uid, expressionId)
      .then((r) => {
        if (alive) setSaved(!!r);
      });
    return () => {
      alive = false;
    };
  }, [user, expressionId, version]);

  return { saved, refresh };
}
