import { Suspense } from "react";
import { DetailClient } from "./DetailClient";

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-center text-sm text-muted-foreground">불러오는 중…</div>}>
      <DetailClient />
    </Suspense>
  );
}
