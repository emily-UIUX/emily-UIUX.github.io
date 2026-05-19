import type { Tag } from "@/lib/types";

export const SEED_TAGS: Tag[] = [
  { id: "tag-greetings", type: "category", name: "Greetings", slug: "greetings", color: "var(--tag-greetings)" },
  { id: "tag-business", type: "category", name: "Business", slug: "business", color: "var(--tag-business)" },
  { id: "tag-idioms", type: "category", name: "Idioms", slug: "idioms", color: "var(--tag-idioms)" },
  { id: "tag-daily", type: "category", name: "Daily", slug: "daily", color: "var(--tag-daily)" },
  { id: "tag-casual", type: "mood", name: "Casual", slug: "casual", color: "var(--tag-casual)" },
  { id: "tag-formal", type: "mood", name: "Formal", slug: "formal", color: "var(--tag-formal)" },
  { id: "tag-slang", type: "mood", name: "Slang", slug: "slang", color: "var(--tag-slang)" },
  { id: "tag-academic", type: "category", name: "Academic", slug: "academic", color: "var(--tag-academic)" },
  { id: "tag-travel", type: "topic", name: "Travel", slug: "travel", color: "var(--tag-travel)" },
  { id: "tag-emotions", type: "topic", name: "Emotions", slug: "emotions", color: "var(--tag-emotions)" },
];

export const SEED_TAG_BY_SLUG: Record<string, Tag> = Object.fromEntries(
  SEED_TAGS.map((t) => [t.slug, t])
);
