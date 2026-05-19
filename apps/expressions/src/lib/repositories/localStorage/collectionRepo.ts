import type { Collection, CollectionItem } from "@/lib/types";
import type { CollectionRepository } from "@/lib/repositories/types";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { newId } from "@/lib/ids";
import { safeRead, safeWrite } from "./_storage";
import { SEED_COLLECTIONS, SEED_COLLECTION_ITEMS } from "@/lib/seed/collections.seed";

function readCollections(uid: string): Collection[] {
  return safeRead<Collection[]>(STORAGE_KEYS.collections(uid), []);
}
function writeCollections(uid: string, rows: Collection[]) {
  safeWrite(STORAGE_KEYS.collections(uid), rows);
}
function readItems(uid: string): CollectionItem[] {
  return safeRead<CollectionItem[]>(STORAGE_KEYS.collectionItems(uid), []);
}
function writeItems(uid: string, rows: CollectionItem[]) {
  safeWrite(STORAGE_KEYS.collectionItems(uid), rows);
}

export const collectionRepo: CollectionRepository = {
  async list(uid) {
    if (uid === null) return SEED_COLLECTIONS;
    return [...SEED_COLLECTIONS, ...readCollections(uid)];
  },
  async get(uid, id) {
    const seed = SEED_COLLECTIONS.find((c) => c.id === id);
    if (seed) return seed;
    if (uid) return readCollections(uid).find((c) => c.id === id) ?? null;
    return null;
  },
  async create(uid, input) {
    const row: Collection = {
      id: newId(),
      userId: uid,
      title: input.title.trim(),
      description: input.description?.trim() || undefined,
      pinned: false,
      createdAt: new Date().toISOString(),
      source: "user",
    };
    const rows = readCollections(uid);
    rows.push(row);
    writeCollections(uid, rows);
    return row;
  },
  async update(uid, id, patch) {
    const rows = readCollections(uid);
    const i = rows.findIndex((c) => c.id === id);
    if (i < 0) throw new Error("not found");
    rows[i] = { ...rows[i], ...patch };
    writeCollections(uid, rows);
    return rows[i];
  },
  async delete(uid, id) {
    writeCollections(uid, readCollections(uid).filter((c) => c.id !== id));
    writeItems(uid, readItems(uid).filter((it) => it.collectionId !== id));
  },
  async listItems(uid, collectionId) {
    const seedItems = SEED_COLLECTION_ITEMS.filter((it) => it.collectionId === collectionId);
    if (seedItems.length) return [...seedItems].sort((a, b) => a.sortOrder - b.sortOrder);
    if (!uid) return [];
    return readItems(uid)
      .filter((it) => it.collectionId === collectionId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },
  async addItem(uid, collectionId, ref) {
    const items = readItems(uid);
    if (items.some((it) => it.collectionId === collectionId && it.expressionId === ref.expressionId)) {
      return items.find((it) => it.collectionId === collectionId && it.expressionId === ref.expressionId)!;
    }
    const maxOrder = items
      .filter((it) => it.collectionId === collectionId)
      .reduce((m, it) => Math.max(m, it.sortOrder), -1);
    const row: CollectionItem = {
      collectionId,
      expressionId: ref.expressionId,
      sortOrder: maxOrder + 1,
    };
    items.push(row);
    writeItems(uid, items);
    return row;
  },
  async removeItem(uid, collectionId, expressionId) {
    writeItems(
      uid,
      readItems(uid).filter((it) => !(it.collectionId === collectionId && it.expressionId === expressionId))
    );
  },
  async reorder(uid, collectionId, orderedExpressionIds) {
    const items = readItems(uid);
    const order = new Map(orderedExpressionIds.map((id, i) => [id, i]));
    for (const it of items) {
      if (it.collectionId === collectionId && order.has(it.expressionId)) {
        it.sortOrder = order.get(it.expressionId)!;
      }
    }
    writeItems(uid, items);
  },
};
