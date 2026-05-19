"use client";

import { useEffect, useState } from "react";
import type { Expression, ExpressionExample, ExpressionAudio } from "@/lib/types";
import { getRepos } from "@/lib/repositories";

export function useExpression(id: string | null | undefined) {
  const [expression, setExpression] = useState<Expression | null>(null);
  const [examples, setExamples] = useState<ExpressionExample[]>([]);
  const [audio, setAudio] = useState<ExpressionAudio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setExpression(null);
      setExamples([]);
      setAudio([]);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    const repos = getRepos();
    Promise.all([
      repos.expressions.getById(id),
      repos.expressions.listExamples(id),
      repos.expressions.listAudio(id),
    ])
      .then(([e, ex, au]) => {
        if (!alive) return;
        setExpression(e);
        setExamples(ex);
        setAudio(au);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  return { expression, examples, audio, loading };
}
