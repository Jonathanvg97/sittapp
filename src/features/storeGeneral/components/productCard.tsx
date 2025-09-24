import { PlusIcon } from "lucide-react";
import Image from "next/image";

export const ProductCard = () => {
  return (
    <article className="ProductCard text-black max-w-xs h-96 flex flex-col justify-between p-4 rounded-lg shadow-md bg-white">
      <div className="relative w-full h-64">
        <Image
          src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png"
          alt="Product Image"
          fill
          className="object-contain"
        />
      </div>

      <h2 className="font-bold">Product Card</h2>
      <p className="text-sm mb-4">This is a product card</p>

      <section className="flex items-center justify-between">
        <span className="font-bold text-xl">$90.99</span>
        <button className="flex items-center justify-center bg-blue-500 p-2 text-white rounded w-16 h-8 hover:bg-blue-600 font-bold cursor-pointer">
          <PlusIcon size={16} className="text-white font-extrabold" />
          Add
        </button>
      </section>
    </article>
  );
};
