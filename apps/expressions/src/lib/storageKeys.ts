export const STORAGE_KEYS = {
  auth: "exp.auth",
  userSaved: (uid: string) => `exp.userSaved.${uid}`,
  collections: (uid: string) => `exp.collections.${uid}`,
  collectionItems: (uid: string) => `exp.collectionItems.${uid}`,
  userExpressions: (uid: string) => `exp.userExpressions.${uid}`,
  recordings: (uid: string) => `exp.recordings.${uid}`,
} as const;
