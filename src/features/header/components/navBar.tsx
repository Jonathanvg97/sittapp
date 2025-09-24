import { ShoppingCartIcon } from "lucide-react";

export const NavBar = () => {
  return (
    <header className="NavBar text-black flex items-center justify-between gap-2 p-4 border-b border-gray-200">
      <h1 className="font-bold text-xl ml-4 sm:ml-16">ShopCaralog</h1>
      <ShoppingCartIcon
        size={24}
        className="cursor-pointer mr-4 sm:mr-20 text-gray-500"
      />
    </header>
  );
};
