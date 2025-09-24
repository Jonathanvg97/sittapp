import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("market") as Dexie & {
  products: EntityTable<any, number>;
};

db.version(1).stores({
  products: "id",
});

export default db;
