import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useProductStore, useCartStore, useLikeStore } from "@/store";
import { ShoppingCartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import { isInCart, isLiked } from "@/utils/utilityFunctions";

function Card({ product }) {
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);
  const [like, setLike] = useLikeStore((state) => [state.like, state.setLike]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product-overview?pid=${product.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            <Link href={`/product-overview?pid=${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-gray-900">{"₹ " + product.price}</p>
          <div className="flex items-center space-x-3">
            {isLiked(like, product) ? (
              <Icon
                icon="heroicons-solid:heart"
                className="h-6 w-6 text-red-500 cursor-pointer"
                onClick={() => {
                  setLike(like.filter((item) => item.id !== product.id));
                }}
              />
            ) : (
              <Icon
                icon="heroicons-outline:heart"
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={() => setLike([...like, product])}
              />
            )}

            {!isInCart(cart, product) ? (
              <ShoppingCartIcon
                className="h-6 w-6 cursor-pointer text-black"
                onClick={() => {
                  setCart([...cart, product]);
                  toast.success("Added to cart");
                }}
              />
            ) : (
              <CheckCircleIcon className="h-6 w-6 text-black" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;