"use client";
import { shoppingCartStore } from "@/features/shoppingCart/store/shoppingCart.store";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  //hooks
  const router = useRouter();
  //store
  const { products } = shoppingCartStore();

  return (
    <header className="NavBar text-black flex items-center justify-between gap-2 p-4 border-b border-gray-200">
      <button
        className="font-bold text-xl ml-4 sm:ml-16 cursor-pointer"
        onClick={() => router.push("/")}
      >
        ShopCaralog
      </button>
      <button
        onClick={() => router.push("/shopping")}
        className="relative flex items-center justify-center sm:mr-20 cursor-pointer"
      >
        <ShoppingCartIcon size={32} className="text-gray-500" />

        {products?.length > 0 && (
          <span className="absolute -top-2 -right-2 sm:-top-2 sm:-right-2 bg-blue-600 text-white text-xs sm:text-sm font-bold w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
            {products.length}
          </span>
        )}
      </button>
    </header>
  );
};
