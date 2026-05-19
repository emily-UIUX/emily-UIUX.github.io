export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith("data:")) return path;
  if (!path.startsWith("/")) path = `/${path}`;
  if (!BASE_PATH) return path;
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
