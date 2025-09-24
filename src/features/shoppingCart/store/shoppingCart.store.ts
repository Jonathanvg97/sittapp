import { ProductsShoppingCart } from "@/features/storeGeneral/types/product.interface";
import { create } from "zustand";

interface ShoppingCartState {
  products: ProductsShoppingCart[];
  setProducts: (products: ProductsShoppingCart[]) => void;
}

export const shoppingCartStore = create<ShoppingCartState>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
