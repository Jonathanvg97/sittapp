"use client";

import { ProductsShoppingCart } from "@/features/storeGeneral/types/product.interface";
import Dexie, { EntityTable } from "dexie";

let db:
  | (Dexie & { productShoppingCart: EntityTable<ProductsShoppingCart, "id"> })
  | null = null;

export const getDb = () => {
  if (typeof window === "undefined") return null;
  if (!db) {
    const DexieLib = require("dexie").default; 
    db = new DexieLib("market") as Dexie & {
      productShoppingCart: EntityTable<ProductsShoppingCart, "id">;
    };
    db.version(1).stores({
      productShoppingCart: "id",
    });
  }
  return db;
};
