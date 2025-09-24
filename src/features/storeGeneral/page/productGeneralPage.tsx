import { Suspense } from "react";
import { ProductGeneralContent } from "../components/productGeneralContent";
import { ProductCardSkeleton } from "../components/productCardSkeleton";

export const ProductGeneralPage = async () => {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <ProductGeneralContent />
    </Suspense>
  );
};
