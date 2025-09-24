import { create } from "zustand";
import { Product } from "../types/product.interface";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useStoreGeneral = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
