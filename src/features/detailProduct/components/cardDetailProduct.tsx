"use client";
import { ArrowLeft, ShoppingCartIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useDetailproduct } from "../hooks/useDetailproduct";
import { useEffect } from "react";
import { ProductDetail } from "../types/detailProduct.interface";

export const CardDetailProduct = () => {
  //hooks
  const { id } = useParams();
  const router = useRouter();
  const { getDetailProduct, loadingDetailProduct } = useDetailproduct();

  //states
  const [quantity, setQuantity] = useState<number>(1);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );

  //
  useEffect(() => {
    if (!id) return router.push("/");

    const fetchProduct = async () => {
      const data = await getDetailProduct(id as string);
      if (data) setProductDetail(data);
    };

    fetchProduct();
  }, [id, router]);

  if (loadingDetailProduct) {
    return <p className="p-10 text-gray-600">Cargando producto...</p>;
  }

  // Si no hay producto cargado todavía
  if (!productDetail) {
    return <p className="p-10 text-gray-600">No se encontró el producto.</p>;
  }
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
            src={productDetail?.images[0] || ""}
            alt={productDetail?.title + " image"}
            width={600}
            height={400}
            className="rounded-lg object-cover flex mx-auto h-full"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <span className="text-gray-500">{productDetail?.category}</span>
          <h1 className="text-3xl font-bold text-gray-950">
            {productDetail?.title}
          </h1>
          {productDetail?.shippingInformation && (
            <p className="text-gray-700 font-medium">
              {productDetail?.shippingInformation}
            </p>
          )}

          <div className="flex items-center gap-2">
            <span className="text-yellow-400">
              {"★".repeat(Math.floor(productDetail?.rating || 0))}
              {"☆".repeat(5 - Math.floor(productDetail?.rating || 0))}
            </span>
            <span className="text-gray-500">
              ({productDetail?.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-3xl font-semibold text-gray-950">
            ${productDetail?.price}
          </p>

          <h1 className="font-bold text-gray-950">Key Features</h1>

          <p className="text-gray-700">{productDetail?.description}</p>

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
