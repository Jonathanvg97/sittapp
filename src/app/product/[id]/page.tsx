import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProducById } from "@/features/detailProduct/service/cardDetail.service";
import { CardDetailProduct } from "@/features/detailProduct/components/cardDetailProduct";

interface DetailProductPageProps {
  params: {
    id: string;
  };
}

export default async function DetailProductPage({
  params,
}: DetailProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  //
  const { id } = resolvedParams;
  //
  const response = await getProducById(id);

  if (!response || response.status !== 200) {
    return notFound();
  }

  const product = response.data;
  //
  return (
    <Suspense fallback={<div>Cargando producto...</div>}>
      <CardDetailProduct product={product} />
    </Suspense>
  );
}
