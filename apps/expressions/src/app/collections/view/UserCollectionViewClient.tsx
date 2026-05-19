"use client";

import { useSearchParams } from "next/navigation";
import { CollectionDetailClient } from "../[id]/CollectionDetailClient";

export function UserCollectionViewClient() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  return <CollectionDetailClient id={id} />;
}
