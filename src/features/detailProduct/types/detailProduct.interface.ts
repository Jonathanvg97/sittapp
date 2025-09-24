export interface ProductDetail {
  id: number;
  title: string;
  shippingInformation: string;
  price: number;
  description: string;
  category: string;
  images: [string];
  rating: number;
  reviews: [];
}
