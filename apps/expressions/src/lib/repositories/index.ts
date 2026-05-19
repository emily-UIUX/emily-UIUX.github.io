import type { Repositories } from "./types";
import { expressionRepo } from "./localStorage/expressionRepo";
import { userSavedRepo } from "./localStorage/userSavedRepo";
import { collectionRepo } from "./localStorage/collectionRepo";
import { authService } from "./localStorage/authService";
import { recordingRepo } from "./localStorage/recordingRepo";

const EXPRESSIONS_BACKEND = (process.env.NEXT_PUBLIC_EXPRESSIONS_BACKEND ?? "local") as
  | "local"
  | "firebase";

const localRepos: Repositories = {
  expressions: expressionRepo,
  userSaved: userSavedRepo,
  collections: collectionRepo,
  auth: authService,
  recordings: recordingRepo,
};

export function getRepos(): Repositories {
  if (EXPRESSIONS_BACKEND === "firebase") {
    throw new Error("Firebase backend not implemented yet — see README for migration steps");
  }
  return localRepos;
}
