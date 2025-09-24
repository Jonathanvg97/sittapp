export interface Product {
  id: number;
  title: string;
  shippingInformation: string;
  price: number;
  description: string;
  category: string;
  images: [string];
}

export interface ProductsShoppingCart extends Product {
  quantity: number;
}
