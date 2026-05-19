export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type SourceType =
  | "manual"
  | "instagram"
  | "youtube"
  | "web"
  | "book"
  | "movie"
  | "song"
  | "podcast";

export type TagType = "category" | "mood" | "level" | "topic" | "custom";

export type AudioProvider = "speechSynthesis" | "elevenlabs" | "google" | "manual";

/** EXPRESSIONS */
export interface Expression {
  /** id */
  id: string;
  /** text */
  text: string;
  /** normalized_text — lowercase, punctuation-stripped, for search */
  normalizedText: string;
  /** korean */
  korean: string;
  /** pronunciation — IPA or romanized */
  pronunciation?: string;
  /** difficulty — 1..5 */
  difficulty: Difficulty;
  /** tone — neutral|casual|formal|... */
  tone?: string;
  /** is_phrase — true for multi-word, false for single word */
  isPhrase: boolean;
  /** created_at ISO */
  createdAt: string;
  /** updated_at ISO */
  updatedAt: string;
  /** seed=public catalog, user=created via /new */
  source: "seed" | "user";
  /** author uid (user-source only) */
  authorUid?: string;
  /** denormalized tag slugs for cheap lookup */
  tagSlugs: string[];
}

/** EXPRESSION_EXAMPLES */
export interface ExpressionExample {
  id: string;
  expressionId: string;
  english: string;
  korean: string;
  sourceType: SourceType;
  sourceUrl?: string;
  createdAt: string;
}

/** EXPRESSION_AUDIO */
export interface ExpressionAudio {
  id: string;
  expressionId: string;
  provider: AudioProvider;
  voiceKey?: string;
  audioUrl?: string;
  durationMs?: number;
  accent?: "us" | "uk" | "au" | "in";
  gender?: "male" | "female" | "neutral";
  generatedAt: string;
}

/** TAGS */
export interface Tag {
  id: string;
  type: TagType;
  name: string;
  slug: string;
  /** color hex or var(--tag-...) token */
  color: string;
}

/** USERS */
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  createdAt: string;
}

/** USER_SAVED_EXPRESSIONS — composite key (userId, expressionId) */
export interface UserSavedExpression {
  id: string;
  userId: string;
  expressionId: string;
  note?: string;
  /** saved_from — where it was saved from */
  savedFrom: SourceType;
  savedAt: string;
  lastViewedAt?: string;
  reviewCount: number;
  favorite: boolean;
  archived: boolean;
}

/** COLLECTIONS — userId null = seed/system */
export interface Collection {
  id: string;
  userId: string | null;
  title: string;
  description?: string;
  coverImageUrl?: string;
  pinned: boolean;
  createdAt: string;
  source: "seed" | "user";
}

/** COLLECTION_ITEMS — seed collections reference expressionId directly */
export interface CollectionItem {
  collectionId: string;
  expressionId: string;
  sortOrder: number;
}

/** SOURCE_LINKS */
export interface SourceLink {
  id: string;
  userSavedExpressionId: string;
  platform: SourceType;
  url: string;
  title?: string;
  thumbnailUrl?: string;
  metadataJson?: Record<string, unknown>;
}

/** USER_RECORDINGS (스키마만, 구현은 추후) */
export interface UserRecording {
  id: string;
  userSavedExpressionId: string;
  audioUrl: string;
  durationMs: number;
  pronunciationScore?: number;
  createdAt: string;
}

/** Input for /new page */
export interface NewExpressionInput {
  text: string;
  korean: string;
  pronunciation?: string;
  difficulty: Difficulty;
  tone?: string;
  isPhrase: boolean;
  tagSlugs: string[];
  examples?: Array<{ english: string; korean: string; sourceType: SourceType; sourceUrl?: string }>;
}

export interface ExpressionWithRelations extends Expression {
  examples: ExpressionExample[];
  audio: ExpressionAudio[];
}

/** Normalize English text for search */
export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
