import type {
  Expression,
  ExpressionExample,
  ExpressionAudio,
  Tag,
  User,
  UserSavedExpression,
  Collection,
  CollectionItem,
  UserRecording,
  NewExpressionInput,
  Difficulty,
  SourceType,
} from "@/lib/types";

export interface ListExpressionsFilter {
  tagSlugs?: string[];
  difficulty?: Difficulty[];
  source?: "seed" | "user" | "all";
  authorUid?: string;
}

export interface ExpressionRepository {
  list(filters?: ListExpressionsFilter): Promise<Expression[]>;
  getById(id: string): Promise<Expression | null>;
  getByIds(ids: string[]): Promise<Expression[]>;
  search(query: string): Promise<Expression[]>;
  listExamples(expressionId: string): Promise<ExpressionExample[]>;
  listAudio(expressionId: string): Promise<ExpressionAudio[]>;
  listTags(): Promise<Tag[]>;
  create(input: NewExpressionInput, authorUid: string): Promise<Expression>;
}

export interface UserSavedRepository {
  list(uid: string, opts?: { archived?: boolean; favorite?: boolean }): Promise<UserSavedExpression[]>;
  get(uid: string, expressionId: string): Promise<UserSavedExpression | null>;
  save(
    uid: string,
    expressionId: string,
    opts?: { note?: string; savedFrom?: SourceType; favorite?: boolean }
  ): Promise<UserSavedExpression>;
  unsave(uid: string, expressionId: string): Promise<void>;
  update(uid: string, expressionId: string, patch: Partial<UserSavedExpression>): Promise<UserSavedExpression>;
  incrementReviewCount(uid: string, expressionId: string): Promise<void>;
}

export interface CollectionRepository {
  list(uid: string | null): Promise<Collection[]>;
  get(uid: string | null, id: string): Promise<Collection | null>;
  create(uid: string, input: { title: string; description?: string }): Promise<Collection>;
  update(uid: string, id: string, patch: Partial<Collection>): Promise<Collection>;
  delete(uid: string, id: string): Promise<void>;
  listItems(uid: string | null, collectionId: string): Promise<CollectionItem[]>;
  addItem(uid: string, collectionId: string, ref: { expressionId: string }): Promise<CollectionItem>;
  removeItem(uid: string, collectionId: string, expressionId: string): Promise<void>;
  reorder(uid: string, collectionId: string, orderedExpressionIds: string[]): Promise<void>;
}

export interface AuthService {
  getCurrentUser(): User | null;
  signInWithGoogleMock(): Promise<User>;
  signOut(): Promise<void>;
  onAuthChanged(cb: (u: User | null) => void): () => void;
}

export interface RecordingRepository {
  list(uid: string, savedExpressionId: string): Promise<UserRecording[]>;
}

export interface Repositories {
  expressions: ExpressionRepository;
  userSaved: UserSavedRepository;
  collections: CollectionRepository;
  auth: AuthService;
  recordings: RecordingRepository;
}
