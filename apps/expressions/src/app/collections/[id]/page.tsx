import { SEED_COLLECTIONS } from "@/lib/seed/collections.seed";
import { CollectionDetailClient } from "./CollectionDetailClient";

export function generateStaticParams() {
  return SEED_COLLECTIONS.map((c) => ({ id: c.id }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CollectionDetailClient id={id} />;
}
