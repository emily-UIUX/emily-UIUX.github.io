import type {
  Expression,
  ExpressionExample,
  ExpressionAudio,
  Tag,
  NewExpressionInput,
} from "@/lib/types";
import { normalizeText } from "@/lib/types";
import type { ExpressionRepository, ListExpressionsFilter } from "@/lib/repositories/types";
import { SEED_EXPRESSIONS, SEED_EXAMPLES, SEED_AUDIO } from "@/lib/seed/expressions.seed";
import { SEED_TAGS } from "@/lib/seed/tags.seed";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { newId } from "@/lib/ids";
import { safeRead, safeWrite } from "./_storage";

interface UserExpressionBundle {
  expression: Expression;
  examples: ExpressionExample[];
}

function readUserExpressions(uid: string): UserExpressionBundle[] {
  return safeRead<UserExpressionBundle[]>(STORAGE_KEYS.userExpressions(uid), []);
}

function readAllUserExpressions(): UserExpressionBundle[] {
  if (typeof window === "undefined") return [];
  const out: UserExpressionBundle[] = [];
  const prefix = "exp.userExpressions.";
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (!key || !key.startsWith(prefix)) continue;
    const uid = key.slice(prefix.length);
    out.push(...readUserExpressions(uid));
  }
  return out;
}

function applyFilters(items: Expression[], f?: ListExpressionsFilter): Expression[] {
  if (!f) return items;
  return items.filter((e) => {
    if (f.source && f.source !== "all" && e.source !== f.source) return false;
    if (f.authorUid && e.authorUid !== f.authorUid) return false;
    if (f.difficulty && f.difficulty.length && !f.difficulty.includes(e.difficulty)) return false;
    if (f.tagSlugs && f.tagSlugs.length && !f.tagSlugs.every((t) => e.tagSlugs.includes(t))) return false;
    return true;
  });
}

export const expressionRepo: ExpressionRepository = {
  async list(filters) {
    const all = [...SEED_EXPRESSIONS, ...readAllUserExpressions().map((b) => b.expression)];
    return applyFilters(all, filters).sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );
  },

  async getById(id) {
    const seed = SEED_EXPRESSIONS.find((e) => e.id === id);
    if (seed) return seed;
    return readAllUserExpressions().map((b) => b.expression).find((e) => e.id === id) ?? null;
  },

  async getByIds(ids) {
    const set = new Set(ids);
    const seed = SEED_EXPRESSIONS.filter((e) => set.has(e.id));
    const user = readAllUserExpressions().map((b) => b.expression).filter((e) => set.has(e.id));
    return [...seed, ...user];
  },

  async search(query) {
    const q = normalizeText(query);
    if (!q) return [];
    const all = [...SEED_EXPRESSIONS, ...readAllUserExpressions().map((b) => b.expression)];
    return all.filter(
      (e) =>
        e.normalizedText.includes(q) ||
        e.korean.includes(query.trim()) ||
        e.tagSlugs.some((t) => t.includes(q))
    );
  },

  async listExamples(expressionId) {
    const seed = SEED_EXAMPLES.filter((e) => e.expressionId === expressionId);
    if (seed.length) return seed;
    const userBundle = readAllUserExpressions().find((b) => b.expression.id === expressionId);
    return userBundle?.examples ?? [];
  },

  async listAudio(expressionId) {
    return SEED_AUDIO.filter((a) => a.expressionId === expressionId);
  },

  async listTags() {
    return SEED_TAGS;
  },

  async create(input: NewExpressionInput, authorUid: string): Promise<Expression> {
    const id = newId();
    const now = new Date().toISOString();
    const expression: Expression = {
      id,
      text: input.text.trim(),
      normalizedText: normalizeText(input.text),
      korean: input.korean.trim(),
      pronunciation: input.pronunciation?.trim() || undefined,
      difficulty: input.difficulty,
      tone: input.tone?.trim() || undefined,
      isPhrase: input.isPhrase,
      createdAt: now,
      updatedAt: now,
      source: "user",
      authorUid,
      tagSlugs: input.tagSlugs,
    };
    const examples: ExpressionExample[] = (input.examples ?? []).map((ex) => ({
      id: newId(),
      expressionId: id,
      english: ex.english.trim(),
      korean: ex.korean.trim(),
      sourceType: ex.sourceType,
      sourceUrl: ex.sourceUrl?.trim() || undefined,
      createdAt: now,
    }));
    const bundles = readUserExpressions(authorUid);
    bundles.push({ expression, examples });
    safeWrite(STORAGE_KEYS.userExpressions(authorUid), bundles);
    return expression;
  },
};
