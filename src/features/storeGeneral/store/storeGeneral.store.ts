import { create } from "zustand";
import { Product } from "../types/product.interface";

type ProductsCache = {
  [key: string]: {
    [page: number]: {
      products: Product[];
      total: number;
    };
  };
};
interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  productsCache: ProductsCache;
  setProductsCache: (productsCache: ProductsCache) => void;
  loadingProducts: boolean;
  setLoadingProducts: (loading: boolean) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export const storeGeneral = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  productsCache: {},
  setProductsCache: (productsCache) => set({ productsCache }),
  loadingProducts: false,
  setLoadingProducts: (loading) => set({ loadingProducts: loading }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
