"use client";

import { useEffect } from "react";
import { Funnel, Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { storeGeneral } from "./store/storeGeneral.store";
import { useProducts } from "./hooks/useProducts";
import { ProductCardSkeleton } from "./components/productCardSkeleton";
import { ProductCard } from "./components/productCard";
import { Pagination } from "./components/pagination";
export const ProductGeneralPage = () => {
  //store
  const { products, categories, loadingProducts } = storeGeneral();
  //hooks
  const { getAllProducts, getAllCategories, page, setPage, totalPages } =
    useProducts();

  //states
  const [filteredAplied, setFilteredAplied] = useState<{
    category: string;
    search: string;
  }>({
    category: "",
    search: "",
  });

  //
  const debouncedTerm = useDebounce(filteredAplied.search, 500);
  //effects
  useEffect(() => {
    getAllProducts({
      limit: 4,
      skip: (page - 1) * 4,
      category: filteredAplied.category,
      search: debouncedTerm,
    });
  }, [getAllProducts, filteredAplied.category, debouncedTerm, page]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

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
            value={filteredAplied.search}
            onChange={(e) => {
              setFilteredAplied((prev) => ({
                ...prev,
                search: e.target.value,
              }));
              setPage(1);
            }}
            placeholder="Search products..."
            className="w-full p-2 pl-10 border border-gray-300 text-gray-500 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filteredAplied.category}
          onChange={(e) => {
            setFilteredAplied((prev) => ({
              ...prev,
              category: e.target.value,
            }));
            setPage(1);
          }}
          className="w-full sm:w-1/4 md:w-1/6 p-2 border border-gray-300 text-gray-700 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories?.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          className="w-full sm:w-1/6 p-2 bg-gray-200 text-gray-700 rounded-[10px] focus:outline-none cursor-pointer"
          onClick={() => setFilteredAplied({ category: "", search: "" })}
        >
          <Funnel className="inline-block mr-2" size={20} /> Filters{" "}
          {(() => {
            const activeFilters = Object.values(filteredAplied).filter(
              (v) => v && v !== ""
            ).length;
            return activeFilters > 0 ? ` (${activeFilters})` : "";
          })()}
        </button>
      </section>
      {loadingProducts ? (
        <section className="w-full">
          <ProductCardSkeleton />
        </section>
      ) : products?.length > 0 ? (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full gap-6">
            <ProductCard products={products} />
          </section>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </article>
  );
};
