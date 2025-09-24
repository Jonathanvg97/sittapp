"use client";
import { ArrowLeft, ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductDetail } from "../types/detailProduct.interface";
import Image from "next/image";
import { useState } from "react";
type CardDetailProps = {
  product: ProductDetail;
};

export const CardDetailProduct = (product: CardDetailProps) => {
  //hooks
  const router = useRouter();

  //states
  const [quantity, setQuantity] = useState<number>(1);

  //
  return (
    <article className="CardDetailProduct flex flex-col w-full max-w-[85%] p-10 pl-20">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <ArrowLeft size={20} /> Back to Products
      </button>

      <section className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-gray-50 rounded-2xl mx-auto justify-center max-h-3/4">
          <Image
            src={product.product?.images[0]}
            alt={product?.product?.title + " image"}
            width={600}
            height={400}
            className="rounded-lg object-cover flex mx-auto h-full"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <span className="text-gray-500">{product.product.category}</span>
          <h1 className="text-3xl font-bold text-gray-950">
            {product.product.title}
          </h1>
          {product.product.shippingInformation && (
            <p className="text-gray-700 font-medium">
              {product.product.shippingInformation}
            </p>
          )}

          <div className="flex items-center gap-2">
            <span className="text-yellow-400">
              {"★".repeat(Math.floor(product.product.rating))}
              {"☆".repeat(5 - Math.floor(product.product.rating))}
            </span>
            <span className="text-gray-500">
              ({product.product.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-3xl font-semibold text-gray-950">
            ${product.product.price}
          </p>

          <h1 className="font-bold text-gray-950">Key Features</h1>

          <p className="text-gray-700">{product.product.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                className="px-3 py-1 text-gray-950 cursor-pointer"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 text-gray-950">{quantity}</span>
              <button
                className="px-3 py-1 text-gray-950 cursor-pointer"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button className="px-6 cursor-pointer w-full mx-auto justify-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2  font-semibold">
              <ShoppingCartIcon /> Add to Cart
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
