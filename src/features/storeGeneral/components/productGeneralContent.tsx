import { getProducts } from "../service/product.service";
import { ProductGeneralClient } from "./productGeneralClient";

export const ProductGeneralContent = async () => {
  //
  const res = await getProducts();

  return <ProductGeneralClient initialProducts={res.data} />;
};
