"use client";
import { ProductsShoppingCart } from "@/features/storeGeneral/types/product.interface";
import { useShoppingCart } from "@/features/shoppingCart/hooks/useShoppingCart";
import Image from "next/image";
import { shoppingCartStore } from "../store/shoppingCart.store";
import { ArrowLeft, Lock, TrashIcon } from "lucide-react"; // Cambié LockIcon por Lock
import { useRouter } from "next/navigation";

export const ShoppingCart = () => {
  //store
  const { products } = shoppingCartStore();
  //hooks
  const {
    addProductShoppingCart,
    decrementProductShoppingCart,
    removeProductFromCart,
  } = useShoppingCart();
  const router = useRouter();

  //
  const handleIncrement = (product: ProductsShoppingCart) => {
    addProductShoppingCart({ ...product, quantity: 1 });
  };

  const handleDecrement = (product: ProductsShoppingCart) => {
    decrementProductShoppingCart(product.id);
  };

  // calculos
  const totalItems = products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  //
  return (
    <article className="ShoppingCart flex flex-col w-full bg-gray-100 min-h-screen">
      <button
        onClick={() => router.back()}
        className="flex w-full max-w-[85%] p-4 md:p-5 mx-auto items-center gap-2 mb-2 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <ArrowLeft size={20} /> Continue Shopping
      </button>

      <section className="w-full max-w-[85%] p-4 md:p-5 mx-auto bg-white rounded-lg">
        <h1 className="text-gray-950 text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="flex flex-col w-full mx-auto gap-4 md:gap-6 mb-4">
          {products?.map((product) => (
            <section
              key={product.id}
              className="flex flex-col md:flex-row md:items-center justify-between w-full p-4 border border-gray-100 shadow-2xs rounded gap-4 md:gap-0"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={120}
                  height={120}
                  className="rounded w-full max-w-[120px] mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <h2 className="font-bold text-gray-950 text-lg sm:text-base">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {product.shippingInformation}
                  </p>
                  <button
                    onClick={() => removeProductFromCart(product.id)}
                    className="flex cursor-pointer mt-4 gap-2 items-center text-red-700 hover:text-red-900 text-sm"
                  >
                    <TrashIcon size={15} /> Remove
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full md:w-auto">
                {/* Botones de cantidad */}
                <div className="flex items-center gap-3 text-gray-950 order-2 sm:order-1">
                  <button
                    onClick={() => handleDecrement(product)}
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 min-w-[40px]"
                  >
                    -
                  </button>
                  <span className="min-w-[30px] text-center font-medium">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(product)}
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 min-w-[40px]"
                  >
                    +
                  </button>
                </div>

                {/* Precio */}
                <div className="text-center sm:text-right order-1 sm:order-2">
                  <div className="font-bold text-gray-950 text-xl sm:text-lg">
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                  <div className="font-medium text-gray-400 text-sm">
                    ${product.price.toFixed(2)} each
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="bg-gray-100 rounded-2xl p-5">
          <h2 className="text-gray-950 font-semibold text-sm mb-4">
            Have a promo code?
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer">
              Apply
            </button>
          </div>
        </div>

        <hr className="border border-gray-100 my-6" />

        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <p className="font-medium text-gray-600">
                ${subtotal.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <p className="font-medium text-green-600">Free</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax</span>
              <p className="font-medium text-gray-600">${tax.toFixed(2)}</p>
            </div>

            <hr className="border-gray-200 my-4" />

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-lg">Total</span>
              <p className="font-bold text-gray-900 text-lg">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button className="w-full sm:flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>

            <button
              onClick={() => router.back()}
              className="w-full sm:flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          <hr className="border-gray-100 my-6" />

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Lock size={12} />© Secure Payment
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
