"use client";
import { ProductsShoppingCart } from "@/features/storeGeneral/types/product.interface";
import { shoppingCartStore } from "../store/shoppingCart.store";
import { toast } from "react-toastify";
import db from "@/config/db";
import { useEffect } from "react";

export const useShoppingCart = () => {
  //store
  const { products, setProducts } = shoppingCartStore();

  useEffect(() => {
    loadProductsFromDB();
  }, []);

  const loadProductsFromDB = async () => {
    try {
      const dbProducts = await db.productShoppingCart.toArray();
      setProducts(dbProducts);
    } catch (error) {
      console.error("Error loading products from DB:", error);
      toast.error("Error al cargar el carrito");
    }
  };

  const saveProductsToDB = async (updatedProducts: ProductsShoppingCart[]) => {
    try {
      // Limpiar la tabla y guardar los nuevos productos
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
    try {
      // Obtener productos actuales del store
      const currentProducts = products;
      const existingProduct = currentProducts.find((p) => p.id === product.id);

      let updatedProducts: ProductsShoppingCart[];

      if (existingProduct) {
        // Aumenta la cantidad si ya existe
        updatedProducts = currentProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      } else {
        // Agrega como nuevo producto
        updatedProducts = [...currentProducts, product];
      }

      // Actualizar store y Base de Datos
      setProducts(updatedProducts);
      await saveProductsToDB(updatedProducts);

      toast.success(
        existingProduct
          ? `Se aumentó la cantidad del producto ${product.title} en el carrito`
          : "Producto agregado al carrito"
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error al agregar producto al carrito");
    }
  };

  const decrementProductShoppingCart = async (productId: number) => {
    try {
      // Obtener productos actuales del store
      const currentProducts = products;
      const existingProduct = currentProducts.find((p) => p.id === productId);

      if (!existingProduct) {
        toast.error("Producto no encontrado en el carrito");
        return;
      }

      let updatedProducts: ProductsShoppingCart[];

      if (existingProduct.quantity > 1) {
        // Disminuir cantidad si es mayor a 1
        updatedProducts = currentProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
      } else {
        // Eliminar producto si la cantidad es 1
        updatedProducts = currentProducts.filter((p) => p.id !== productId);
      }

      // Actualizar store y Base de Datos
      setProducts(updatedProducts);
      await saveProductsToDB(updatedProducts);

      toast.info(
        existingProduct.quantity > 1
          ? `Se disminuyó la cantidad de ${existingProduct.title}`
          : `Se eliminó ${existingProduct.title} del carrito`
      );
    } catch (error) {
      console.error("Error decrementing product quantity:", error);
    }
  };

  const removeProductFromCart = async (productId: number) => {
    try {
      // Obtener productos actuales del store
      const currentProducts = products;
      const existingProduct = currentProducts.find((p) => p.id === productId);

      if (existingProduct) {
        const updatedProducts = currentProducts.filter(
          (p) => p.id !== productId
        );

        // Actualizar store y Base de Datos
        setProducts(updatedProducts);
        await saveProductsToDB(updatedProducts);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return {
    addProductShoppingCart,
    decrementProductShoppingCart,
    removeProductFromCart,
  };
};
