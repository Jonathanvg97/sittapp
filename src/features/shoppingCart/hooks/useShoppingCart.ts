"use client"; // importante para que todo sea client component

import { useEffect } from "react";
import { ProductsShoppingCart } from "@/features/storeGeneral/types/product.interface";
import { shoppingCartStore } from "../store/shoppingCart.store";
import { toast } from "react-toastify";
import { getDb } from "@/config/db";

export const useShoppingCart = () => {
  const { products, setProducts } = shoppingCartStore();

  useEffect(() => {
    const loadProductsFromDB = async () => {
      const db = getDb();
      if (!db) return;

      try {
        const dbProducts = await db.productShoppingCart.toArray();
        setProducts(dbProducts);
      } catch (error) {
        console.error("Error loading products from DB:", error);
        toast.error("Error al cargar el carrito");
      }
    };

    loadProductsFromDB();
  }, []);

  const saveProductsToDB = async (updatedProducts: ProductsShoppingCart[]) => {
    const db = getDb();
    if (!db) return;

    try {
      await db.productShoppingCart.clear();
      if (updatedProducts.length > 0) {
        await db.productShoppingCart.bulkAdd(updatedProducts);
      }
    } catch (error) {
      console.error("Error saving products to DB:", error);
      toast.error("Error al guardar el carrito");
    }
  };

  const addProductShoppingCart = async (product: ProductsShoppingCart) => {
    const currentProducts = products;
    const existingProduct = currentProducts.find((p) => p.id === product.id);

    let updatedProducts: ProductsShoppingCart[];
    if (existingProduct) {
      updatedProducts = currentProducts.map((p) =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + product.quantity }
          : p
      );
    } else {
      updatedProducts = [...currentProducts, product];
    }

    setProducts(updatedProducts);
    await saveProductsToDB(updatedProducts);

    toast.success(
      existingProduct
        ? `Se aumentó la cantidad del producto ${product.title} en el carrito`
        : "Producto agregado al carrito"
    );
  };

  const decrementProductShoppingCart = async (productId: number) => {
    const currentProducts = products;
    const existingProduct = currentProducts.find((p) => p.id === productId);
    if (!existingProduct) return;

    let updatedProducts: ProductsShoppingCart[];
    if (existingProduct.quantity > 1) {
      updatedProducts = currentProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      );
    } else {
      updatedProducts = currentProducts.filter((p) => p.id !== productId);
    }

    setProducts(updatedProducts);
    await saveProductsToDB(updatedProducts);
  };

  const removeProductFromCart = async (productId: number) => {
    const currentProducts = products;
    const updatedProducts = currentProducts.filter((p) => p.id !== productId);

    setProducts(updatedProducts);
    await saveProductsToDB(updatedProducts);
  };

  return {
    addProductShoppingCart,
    decrementProductShoppingCart,
    removeProductFromCart,
  };
};
