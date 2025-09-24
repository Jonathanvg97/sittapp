import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { Product } from "../types/product.interface";

type ProductCardProps = {
  products: Product[];
};

export const ProductCard = ({ products }: ProductCardProps) => {
  return (
    <>
      {products?.map((product) => (
        <article
          key={product?.id}
          className="ProductCard text-black w-full h-96 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <div className="w-full h-60 relative rounded-t-lg overflow-hidden">
            <Image
              src={product.image}
              alt="Product Image"
              fill
              className="object-centerE rounded-t-lg"
            />
          </div>

          <div className="flex flex-col justify-between flex-1 p-4 mt-4">
            <section className="min-h-[64px]">
              <h2 className="font-bold text-base line-clamp-1">
                {product?.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product?.slug}
              </p>
            </section>

            <section className="flex items-center justify-between mt-4">
              <span className="font-bold text-xl">$ {product?.price}</span>
              <button className="flex items-center justify-center bg-blue-500 p-2 text-white rounded w-1/4 h-10 hover:bg-blue-600 font-bold cursor-pointer">
                <PlusIcon size={16} className="text-white font-extrabold" />
                Add
              </button>
            </section>
          </div>
        </article>
      ))}
    </>
  );
};
