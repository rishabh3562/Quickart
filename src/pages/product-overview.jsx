import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useUserStore } from "@/store";

async function getProductData(pid) {
  const res = await fetch(`http://localhost:3000/api/product/detail/${pid}`);
  const data = await res.json();
  return data.product;
}

// Server-side rendering to fetch product details
export async function getServerSideProps(context) {
  const { pid } = context.query;
  const product = await getProductData(pid);
  return { props: { product } };
}

export default function ProductDetailPage({ product }) {
  const user = useUserStore((state) => state.user); // Access user from store
  const userId = user ? user.id : null;
console.log("proudct in product overview is",product)
  // Add to Cart using the API
//   const handleAddToCart = async () => {
//     if (userId) {
//       const res = await fetch("http://localhost:3000/api/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user: userId,
//           items: [
//             {
//               product: product,
//               quantity: 1,
//             },
//           ],
//         }),
//       });
// console.log("userid in the handleAddToCart in product-overview",userId)
//       const data = await res.json();
//       if (data.message === "Product added to cart") {
//         alert("Product added to cart!");
//       } else {
//         alert("Error adding product to cart");
//       }
//     } else {
//       alert("Please log in to add items to the cart.");
//     }
//   };

const handleAddToCart = async () => {
  if (userId) {
    const res = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id, // Assuming product._id is the MongoDB product ID
        quantity: 1,
      }),
    });

    console.log("userId in the handleAddToCart in product-overview", userId);

    const data = await res.json();
    if (data.message === "Product added to cart") {
      alert("Product added to cart!");
    } else {
      alert("Error adding product to cart");
    }
  } else {
    alert("Please log in to add items to the cart.");
  }
};
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Left column */}
        <div className="flex flex-col-reverse">
          <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                width={400}
                height={400}
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="w-full h-full"
                priority // Add this if the image is above the fold
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <div className="mt-3">
            <p className="text-3xl text-gray-900">₹{product.price}</p>
          </div>

          {/* Rating */}
          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`${
                      rating < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } h-5 w-5 flex-shrink-0`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <a
                href="#"
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {product.reviews} reviews
              </a>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">{product.description}</p>
          </div>

          {/* Size selection */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Size</h4>
            <div className="grid grid-cols-5 gap-2">
              {product.details[0].items.map((size) => (
                <button
                  key={size}
                  className="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
            <Link
              href="/cart"
              className="flex-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Related Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* Add related products here */}
        </div>
      </div>
    </div>
  );
}
