import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProducById } from "@/features/detailProduct/service/cardDetail.service";
import { CardDetailProduct } from "@/features/detailProduct/components/cardDetailProduct";

export default async function DetailProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProducById(id);

  if (!response || response.status !== 200) {
    return notFound();
  }

  const product = response.data;

  return (
    <Suspense fallback={<div>Cargando producto...</div>}>
      <CardDetailProduct product={product} />
    </Suspense>
  );
}
