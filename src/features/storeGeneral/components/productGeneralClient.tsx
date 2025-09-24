"use client";

import { useEffect } from "react";
import { useStoreGeneral } from "../store/storeGeneral.store";
import { Product } from "../types/product.interface";
import { ProductCard } from "./productCard";
import { Search } from "lucide-react";

type ProductGeneralClientProps = {
  initialProducts: Product[];
};

export const ProductGeneralClient = ({
  initialProducts,
}: ProductGeneralClientProps) => {
  //store
  const { products, setProducts } = useStoreGeneral();
  //
  useEffect(() => {
    if (initialProducts?.length) {
      setProducts(initialProducts);
    }
  }, [initialProducts, setProducts]);

  return (
    <article className="ProductGeneralClient flex flex-col items-center w-full max-w-[85%] p-4 mx-auto">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 gap-4">
        <div className="relative w-full sm:w-1/2 md:w-2/2">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 pl-10 border border-gray-300 text-gray-500 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select className="w-full sm:w-1/4 md:w-1/6 p-2 border border-gray-300 text-gray-700 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>

        <button className="w-full sm:w-1/6 p-2 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        <ProductCard products={products} />
      </section>
    </article>
  );
};
