import { Suspense } from "react";
import { UserCollectionViewClient } from "./UserCollectionViewClient";

export default function UserCollectionViewPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
      <UserCollectionViewClient />
    </Suspense>
  );
}
