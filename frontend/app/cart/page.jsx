"use client";
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-20 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-6">
            <p className="text-2xl md:text-3xl text-white">
              Your <span className="font-medium text-blue-500">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-300">
              {getCartCount()} {getCartCount() === 1 ? "Item" : "Items"}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left border-b border-gray-700">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-300 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-300 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-300 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-300 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).length > 0 ? (
                  Object.keys(cartItems).map((itemId) => {
                    const product = products.find(
                      (product) => product._id === itemId,
                    );

                    if (!product || cartItems[itemId] <= 0) return null;

                    return (
                      <tr key={itemId} className="border-b border-gray-800">
                        <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                          <div>
                            <div className="rounded-lg overflow-hidden bg-gray-800/30 border border-blue-500/20 p-2">
                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                className="w-16 h-auto object-contain"
                                width={1280}
                                height={720}
                              />
                            </div>
                            <button
                              type="button"
                              className="md:hidden text-xs text-blue-400 mt-1"
                              onClick={() => updateCartQuantity(product._id, 0)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-sm">
                            <p className="text-white">{product.name}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {product.category}
                            </p>
                            <button
                              type="button"
                              className="text-xs text-blue-400 mt-1 hover:text-blue-300 hidden md:inline-block"
                              onClick={() => updateCartQuantity(product._id, 0)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="py-4 md:px-4 px-1 text-blue-400">
                          {product.offerPrice} SOL
                        </td>
                        <td className="py-4 md:px-4 px-1">
                          <div className="flex items-center md:gap-2 gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(
                                  product._id,
                                  cartItems[itemId] - 1,
                                )
                              }
                              className="bg-gray-800 hover:bg-gray-700 p-1 rounded"
                            >
                              <Image
                                src={assets.decrease_arrow}
                                alt="decrease"
                                className="w-4 h-4"
                              />
                            </button>
                            <input
                              onChange={(e) =>
                                updateCartQuantity(
                                  product._id,
                                  Number(e.target.value),
                                )
                              }
                              type="number"
                              value={cartItems[itemId]}
                              className="w-10 bg-gray-800 border border-gray-700 text-center text-white appearance-none rounded"
                            />
                            <button
                              type="button"
                              onClick={() => addToCart(product._id)}
                              className="bg-gray-800 hover:bg-gray-700 p-1 rounded"
                            >
                              <Image
                                src={assets.increase_arrow}
                                alt="increase"
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 md:px-4 px-1 text-blue-400">
                          {(product.offerPrice * cartItems[itemId]).toFixed(2)}{" "}
                          SOL
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-400">
                      Your cart is empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="continue shopping"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </Layout>
  );
};

export default Cart;
