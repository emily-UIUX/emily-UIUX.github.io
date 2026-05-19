import type { UserSavedExpression } from "@/lib/types";
import type { UserSavedRepository } from "@/lib/repositories/types";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { newId } from "@/lib/ids";
import { safeRead, safeWrite } from "./_storage";

function read(uid: string): UserSavedExpression[] {
  return safeRead<UserSavedExpression[]>(STORAGE_KEYS.userSaved(uid), []);
}
function write(uid: string, rows: UserSavedExpression[]) {
  safeWrite(STORAGE_KEYS.userSaved(uid), rows);
}

export const userSavedRepo: UserSavedRepository = {
  async list(uid, opts) {
    const rows = read(uid);
    return rows.filter((r) => {
      if (opts?.archived !== undefined && r.archived !== opts.archived) return false;
      if (opts?.favorite !== undefined && r.favorite !== opts.favorite) return false;
      return true;
    });
  },
  async get(uid, expressionId) {
    return read(uid).find((r) => r.expressionId === expressionId) ?? null;
  },
  async save(uid, expressionId, opts) {
    const rows = read(uid);
    const existing = rows.find((r) => r.expressionId === expressionId);
    if (existing) return existing;
    const row: UserSavedExpression = {
      id: newId(),
      userId: uid,
      expressionId,
      note: opts?.note,
      savedFrom: opts?.savedFrom ?? "manual",
      savedAt: new Date().toISOString(),
      reviewCount: 0,
      favorite: opts?.favorite ?? false,
      archived: false,
    };
    rows.push(row);
    write(uid, rows);
    return row;
  },
  async unsave(uid, expressionId) {
    const rows = read(uid).filter((r) => r.expressionId !== expressionId);
    write(uid, rows);
  },
  async update(uid, expressionId, patch) {
    const rows = read(uid);
    const i = rows.findIndex((r) => r.expressionId === expressionId);
    if (i < 0) throw new Error("not found");
    rows[i] = { ...rows[i], ...patch };
    write(uid, rows);
    return rows[i];
  },
  async incrementReviewCount(uid, expressionId) {
    const rows = read(uid);
    const i = rows.findIndex((r) => r.expressionId === expressionId);
    if (i < 0) return;
    rows[i] = { ...rows[i], reviewCount: rows[i].reviewCount + 1, lastViewedAt: new Date().toISOString() };
    write(uid, rows);
  },
};
