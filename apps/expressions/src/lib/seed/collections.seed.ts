import type { Collection, CollectionItem } from "@/lib/types";

const NOW = "2024-01-01T00:00:00.000Z";

export const SEED_COLLECTIONS: Collection[] = [
  {
    id: "seed-col-interview",
    userId: null,
    title: "Job Interview Phrases",
    description: "면접에서 자주 쓰이는 영어 표현 모음",
    pinned: true,
    createdAt: NOW,
    source: "seed",
  },
  {
    id: "seed-col-smalltalk",
    userId: null,
    title: "Daily Small Talk",
    description: "일상에서 가볍게 주고받는 표현들",
    pinned: true,
    createdAt: NOW,
    source: "seed",
  },
  {
    id: "seed-col-idioms",
    userId: null,
    title: "Useful Idioms",
    description: "원어민이 자주 쓰는 관용표현",
    pinned: true,
    createdAt: NOW,
    source: "seed",
  },
];

export const SEED_COLLECTION_ITEMS: CollectionItem[] = [
  { collectionId: "seed-col-interview", expressionId: "seed-003", sortOrder: 0 },
  { collectionId: "seed-col-interview", expressionId: "seed-006", sortOrder: 1 },
  { collectionId: "seed-col-interview", expressionId: "seed-009", sortOrder: 2 },
  { collectionId: "seed-col-interview", expressionId: "seed-012", sortOrder: 3 },
  { collectionId: "seed-col-interview", expressionId: "seed-013", sortOrder: 4 },
  { collectionId: "seed-col-interview", expressionId: "seed-015", sortOrder: 5 },
  { collectionId: "seed-col-interview", expressionId: "seed-019", sortOrder: 6 },
  { collectionId: "seed-col-interview", expressionId: "seed-022", sortOrder: 7 },

  { collectionId: "seed-col-smalltalk", expressionId: "seed-004", sortOrder: 0 },
  { collectionId: "seed-col-smalltalk", expressionId: "seed-008", sortOrder: 1 },
  { collectionId: "seed-col-smalltalk", expressionId: "seed-011", sortOrder: 2 },
  { collectionId: "seed-col-smalltalk", expressionId: "seed-014", sortOrder: 3 },
  { collectionId: "seed-col-smalltalk", expressionId: "seed-020", sortOrder: 4 },
  { collectionId: "seed-col-smalltalk", expressionId: "seed-005", sortOrder: 5 },

  { collectionId: "seed-col-idioms", expressionId: "seed-001", sortOrder: 0 },
  { collectionId: "seed-col-idioms", expressionId: "seed-002", sortOrder: 1 },
  { collectionId: "seed-col-idioms", expressionId: "seed-007", sortOrder: 2 },
  { collectionId: "seed-col-idioms", expressionId: "seed-010", sortOrder: 3 },
  { collectionId: "seed-col-idioms", expressionId: "seed-016", sortOrder: 4 },
  { collectionId: "seed-col-idioms", expressionId: "seed-017", sortOrder: 5 },
  { collectionId: "seed-col-idioms", expressionId: "seed-018", sortOrder: 6 },
  { collectionId: "seed-col-idioms", expressionId: "seed-023", sortOrder: 7 },
];
