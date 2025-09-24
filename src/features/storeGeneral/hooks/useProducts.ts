import { toast } from "react-toastify";
import { getCategories, getProducts } from "../service/product.service";
import { useCallback } from "react";
import { storeGeneral } from "../store/storeGeneral.store";
import { useState } from "react";

export const useProducts = () => {
  //store
  const {
    categories,
    setCategories,
    setProducts,
    setLoadingProducts,
    productsCache,
    setProductsCache,
  } = storeGeneral();

  //states
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  //
  const getAllProducts = useCallback(
    async ({
      limit = 4,
      skip = 0,
      category,
      search,
    }: {
      limit?: number;
      skip?: number;
      category?: string;
      search?: string;
    }) => {
      const cacheKey = `category:${category}|search:${search}`;

      if (productsCache[cacheKey]?.[page]) {
        const cached = productsCache[cacheKey][page];
        setProducts(cached.products);
        setTotalPages(Math.ceil(cached.total / limit)); 
        return cached;
      }

      setLoadingProducts(true);
      try {
        const res = await getProducts({
          limit,
          skip,
          category,
          search,
        });

        if (res.status === 200) {
          const newProducts = res.data.products;

          // guarda en cache por categoria+search+pagina
          setProductsCache({
            ...productsCache,
            [cacheKey]: {
              ...(productsCache[cacheKey] || {}),
              [page]: {
                products: newProducts,
                total: res.data.total,
              },
            },
          });

          setProducts(newProducts);
          setTotalPages(Math.ceil(res.data.total / res.data.limit));
          return res.data;
        } else {
          toast.error("Error fetching products");
          return [];
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
        return [];
      } finally {
        setLoadingProducts(false);
      }
    },
    [
      productsCache,
      setProducts,
      setProductsCache,
      setLoadingProducts,
      totalPages,
      page,
    ]
  );
  //
  const getAllCategories = useCallback(async () => {
    if (categories && categories.length > 0) {
      return categories;
    }
    try {
      const res = await getCategories();
      if (res.status === 200) {
        setCategories(res.data);
        return res.data;
      } else {
        toast.error("Error fetching categories");
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
      return [];
    }
  }, [categories, setCategories]);

  return {
    getAllProducts,
    getAllCategories,
    totalPages,
    page,
    setPage,
  };
};
