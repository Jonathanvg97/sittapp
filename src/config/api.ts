import { enviroments } from "./enviroments";

export const apiURLS = {
  products: `${enviroments.apiUrl}/products`,
  categories: `${enviroments.apiUrl}/products/category-list`,
  productsDetail: `${enviroments.apiUrlServer}/products`,
};
