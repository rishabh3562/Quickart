import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import EmptyCart from "../../public/png/empty-cart.png";
// import {
//   calculateDiscount,
//   calculateGrandTotal,
//   calculatePromoDiscount,
//   calculateShipping,
//   calculateTax,
//   calculateTotal,
//   calculateTotalBeforePromo,
// } from "@/lib/utilityFunctions";
import Link from "next/link";
import Router from "next/router";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [enterPromoCode, setEnterPromoCode] = useState(false);
  const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
  const [totalAmount, settotalAmount] = useState(0);
  useEffect(() => {
    // Fetch cart data from the API
    const fetchCart = async () => {
      const res = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res in the cart useEffect", res);
      const data = await res.json();
      console.log("data in the cart useEffect", data);
      console.log("data in the cart useEffect", data);
      if (res.ok) {
        setCart(data.cart.items); // Set the cart items in state
        settotalAmount(data.totalAmount);
      } else {
        toast.error(data.message || "Failed to fetch cart");
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (product, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== product._id)
    );
  };

  return (
    <div className="bg-white font-Lato">
      <div className="mx-auto max-w-6xl py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        {cart?.length > 0 ? (
          <form className="mt-12 flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-3/4">
              <h2 className="sr-only">Items in your shopping cart</h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {cart.map((product, productIdx) => (
                  <li key={product.product._id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        src={product.product.imageSrc}
                        alt={product.product.imageAlt}
                        className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                        width={96}
                        height={96}
                      />
                    </div>

                    <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div>
                        <div className="flex justify-between sm:grid sm:grid-cols-2">
                          <div className="pr-6">
                            <h3 className="text-sm">
                              <a
                                href={product.product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.product.name}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.product.color}
                            </p>
                            {product.product.size && (
                              <p className="mt-1 text-sm text-gray-500">
                                {product.product.size}
                              </p>
                            )}
                          </div>

                          <p className="text-right text-sm font-medium text-gray-900">
                            {"₹ " +
                              parseFloat(product.product.price) *
                                parseFloat(product.quantity)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {product.product.name}
                          </label>
                          <div className="flex flex-row items-center gap-x-2">
                            <PlusIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                              onClick={() => handleQuantityChange(product, 1)}
                            />
                            <div className="bg-slate-100 rounded-md px-4 py-1">
                              {product.quantity}
                            </div>
                            <MinusIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                              onClick={() => handleQuantityChange(product, -1)}
                            />
                          </div>

                          <button
                            type="button"
                            className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                            onClick={() => handleRemoveItem(product)}
                          >
                            <span className="text-black">Remove</span>
                          </button>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        <span>{"In stock"}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="mt-10 lg:mt-0 lg:w-1/4">
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="sr-only">Order summary</h2>

                <div className="flow-root">
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">
                        {"₹ " +totalAmount}
                      </dd>
                    </div>

                    {/* Add other order details like shipping, tax, etc. */}

                    <div className="flex items-center justify-between py-4">
                      <dt className="text-base font-medium text-gray-900">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {isPromoCodeValid ? (
                          <>{"₹ " + totalAmount}</>
                        ) : (
                          // <>{"₹ " + calculateGrandTotal(cart, promoCode)}</>
                          <>{"₹ " + totalAmount}</>
                          // <>{"₹ " + calculateTotalBeforePromo(cart)}</>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCart([]); // Clear cart
                    Router.push("/checkout");
                  }}
                  className="w-full rounded-md border border-transparent bg-black py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link
                    href="/products"
                    className="font-medium text-black cursor-pointer hover:text-gray-800"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-row justify-center py-10 w-full">
            <Image src={EmptyCart} alt="Empty Cart" width={450} height={400} />
          </div>
        )}
      </div>
    </div>
  );
}
