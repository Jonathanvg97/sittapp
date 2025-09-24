import { ProductsShoppingCart } from "@/features/storeGeneral/types/product.interface";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("market") as Dexie & {
  productShoppingCart: EntityTable<ProductsShoppingCart, "id">;
};

db.version(1).stores({
  productShoppingCart: "id",
});

export default db;
