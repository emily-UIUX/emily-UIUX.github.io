"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TagChip } from "@/components/TagChip";
import { useTags } from "@/hooks/useExpressions";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/stores/authStore";
import { getRepos } from "@/lib/repositories";
import type { Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Difficulty[] = [1, 2, 3, 4, 5];

interface ExampleDraft {
  english: string;
  korean: string;
}

export function NewExpressionForm() {
  const router = useRouter();
  const tags = useTags();
  const { user } = useCurrentUser();
  const signIn = useAuthStore((s) => s.signIn);

  const [text, setText] = React.useState("");
  const [korean, setKorean] = React.useState("");
  const [pronunciation, setPronunciation] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<Difficulty>(2);
  const [tagSlugs, setTagSlugs] = React.useState<string[]>([]);
  const [examples, setExamples] = React.useState<ExampleDraft[]>([{ english: "", korean: "" }]);
  const [busy, setBusy] = React.useState(false);

  const toggleTag = (slug: string) =>
    setTagSlugs((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]));

  const canSubmit = text.trim() && korean.trim();

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    try {
      let u = user;
      if (!u) {
        if (!confirm("표현을 저장하려면 로그인이 필요해요. 로그인할까요?")) return;
        await signIn();
        u = useAuthStore.getState().user;
        if (!u) return;
      }
      const created = await getRepos().expressions.create(
        {
          text,
          korean,
          pronunciation: pronunciation.trim() || undefined,
          difficulty,
          isPhrase: text.trim().split(/\s+/).length > 1,
          tagSlugs,
          examples: examples
            .filter((ex) => ex.english.trim() && ex.korean.trim())
            .map((ex) => ({ english: ex.english, korean: ex.korean, sourceType: "manual" as const })),
        },
        u.uid
      );
      router.push(`/detail?id=${encodeURIComponent(created.id)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 px-4 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <section className="flex flex-col gap-2">
        <Label htmlFor="text">영어 표현 *</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Spill the tea"
          required
        />
      </section>
      <section className="flex flex-col gap-2">
        <Label htmlFor="korean">한국어 의미 *</Label>
        <Input
          id="korean"
          value={korean}
          onChange={(e) => setKorean(e.target.value)}
          placeholder="예: 비밀 좀 풀어봐"
          required
        />
      </section>
      <section className="flex flex-col gap-2">
        <Label htmlFor="pron">발음 (선택)</Label>
        <Input
          id="pron"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          placeholder="spɪl ðə tiː"
        />
      </section>

      <section className="flex flex-col gap-2">
        <Label>난이도</Label>
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                difficulty === d
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Label>태그</Label>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <TagChip
              key={t.slug}
              slug={t.slug}
              asButton
              active={tagSlugs.includes(t.slug)}
              onClick={() => toggleTag(t.slug)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>예문</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExamples((cur) => [...cur, { english: "", korean: "" }])}
          >
            <Plus className="size-4" /> 추가
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {examples.map((ex, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">예문 {i + 1}</span>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => setExamples((cur) => cur.filter((_, j) => j !== i))}
                  aria-label="예문 삭제"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <Textarea
                value={ex.english}
                onChange={(e) =>
                  setExamples((cur) => cur.map((x, j) => (j === i ? { ...x, english: e.target.value } : x)))
                }
                placeholder="English example sentence"
                className="mt-2"
                rows={2}
              />
              <Textarea
                value={ex.korean}
                onChange={(e) =>
                  setExamples((cur) => cur.map((x, j) => (j === i ? { ...x, korean: e.target.value } : x)))
                }
                placeholder="한국어 번역"
                className="mt-2"
                rows={2}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-20 -mx-4 mt-2 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
        <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || busy}>
          {busy ? "저장 중…" : "표현 추가"}
        </Button>
      </div>
    </form>
  );
}
