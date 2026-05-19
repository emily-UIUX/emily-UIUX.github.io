import type { User } from "@/lib/types";
import type { AuthService } from "@/lib/repositories/types";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { newId } from "@/lib/ids";
import { safeRead, safeWrite, safeRemove } from "./_storage";

type Listener = (u: User | null) => void;
const listeners = new Set<Listener>();

function readUser(): User | null {
  return safeRead<User | null>(STORAGE_KEYS.auth, null);
}

function emit(u: User | null) {
  for (const cb of listeners) cb(u);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEYS.auth) emit(readUser());
  });
}

const SAMPLE_NAMES = ["Alex Kim", "Jamie Park", "Robin Lee", "Sam Choi", "Taylor Han"];

export const authService: AuthService = {
  getCurrentUser() {
    return readUser();
  },
  async signInWithGoogleMock() {
    const existing = readUser();
    if (existing) return existing;
    const displayName = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    const user: User = {
      uid: `mock-google-${newId().slice(0, 8)}`,
      email: `${displayName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      displayName,
      createdAt: new Date().toISOString(),
    };
    safeWrite(STORAGE_KEYS.auth, user);
    emit(user);
    return user;
  },
  async signOut() {
    safeRemove(STORAGE_KEYS.auth);
    emit(null);
  },
  onAuthChanged(cb) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
};
