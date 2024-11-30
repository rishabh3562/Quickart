// app/products/[id]/page.js

import { Star } from "lucide-react";
import Image from "next/image";

export async function getServerSideProps({ params }) {
  // Simulating fetching data by ID (In practice, replace with actual data fetching logic)
  const product = {
    _id: "674b44c692ebcfd93d3b8e41",
    id: 2,
    name: "Rajasthani Kurti",
    href: "#",
    price: "3999",
    description:
      "Minimalist Kurti with a touch of QuicKart. Made from the finest cotton and designed for comfort.",
    options: "Black",
    quantity: 1,
    images: [
      {
        id: 1,
        src: "https://images.meesho.com/images/products/297536726/qoped_400.webp",
        alt: "Kurti with a touch of QuicKart.",
        _id: "674b44c692ebcfd93d3b8e42",
      },
    ],
    details: [
      {
        name: "Size",
        items: ["XS", "S", "M", "L", "XL"],
        _id: "674b44c692ebcfd93d3b8e43",
      },
    ],
    imageSrc:
      "https://images.meesho.com/images/products/297536726/qoped_400.webp",
    imageAlt: "Front of plain black t-shirt.",
    category: "Women's Wear",
    brand: "QuicKart",
    material: "Cotton",
    rating: 4.2,
    reviews: 80,
    availability: "In Stock",
    createdAt: "2024-11-30T17:00:54.394Z",
  };

  return {
    props: {
      product,
    },
  };
}

export default function ProductDetailPage({ product }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Left column */}
        <div className="flex flex-col-reverse">
          {/* Image gallery */}
          <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                width={400}
                height={400}
                className="w-full h-full object-center object-cover"
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
            <h2 className="sr-only">Product information</h2>
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

          <div className="mt-6">
            <div className="flex items-center">
              <h4 className="text-sm font-medium text-gray-900">
                Availability:
              </h4>
              <p className="ml-2 text-sm text-green-600">
                {product.availability}
              </p>
            </div>
            <div className="mt-2 flex items-center">
              <h4 className="text-sm font-medium text-gray-900">Material:</h4>
              <p className="ml-2 text-sm text-gray-600">{product.material}</p>
            </div>
            <div className="mt-2 flex items-center">
              <h4 className="text-sm font-medium text-gray-900">Brand:</h4>
              <p className="ml-2 text-sm text-gray-600">{product.brand}</p>
            </div>
            <div className="mt-2 flex items-center">
              <h4 className="text-sm font-medium text-gray-900">Category:</h4>
              <p className="ml-2 text-sm text-gray-600">{product.category}</p>
            </div>
            <div className="mt-2 flex items-center">
              <h4 className="text-sm font-medium text-gray-900">Color:</h4>
              <p className="ml-2 text-sm text-gray-600">{product.options}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">Size</h4>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Size guide
              </a>
            </div>

            <div className="mt-2">
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
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h4 className="text-sm font-medium text-gray-900">Quantity</h4>
              <select
                className="ml-2 rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={product.quantity}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 flex">
            <button
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
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
