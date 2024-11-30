import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Card from "../components/products/Card";
import SearchWithDropdown from "@/components/SearchWithDropdown";
import { categories, brands, ratings } from "@/data/index";

export default function ProductsPage({ initialProducts, totalPages }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [highToLow, setHighToLow] = useState(false);
  const [lowToHigh, setLowToHigh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [suggestions, setSuggestions] = useState(
    initialProducts.map((p) => p.name)
  );

  // Filter products based on selected criteria
  useEffect(() => {
    let updatedProducts = [...initialProducts];

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (p) => p.category === selectedCategory
      );
    }
    if (selectedBrand) {
      updatedProducts = updatedProducts.filter(
        (p) => p.brand === selectedBrand
      );
    }
    if (selectedRating) {
      updatedProducts = updatedProducts.filter(
        (p) => p.rating >= selectedRating
      );
    }
    if (minPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => parseFloat(p.price) >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => parseFloat(p.price) <= parseFloat(maxPrice)
      );
    }

    if (highToLow) {
      updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
    } else if (lowToHigh) {
      updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(updatedProducts);
    setSuggestions(updatedProducts.map((p) => p.name));
  }, [
    selectedCategory,
    selectedBrand,
    selectedRating,
    highToLow,
    lowToHigh,
    minPrice,
    maxPrice,
    initialProducts,
  ]);

  // Handle search queries
  const handleSearch = (query) => {
    const searchResults = initialProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPagesCalculated = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  function handleHighToLow() {
    setHighToLow(true);
    setLowToHigh(false);
  }

  function handleLowToHigh() {
    setLowToHigh(true);
    setHighToLow(false);
  }

  function handleClearFilters() {
    setHighToLow(false);
    setLowToHigh(false);
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedRating("");
    setMinPrice("");
    setMaxPrice("");
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleBrandChange(event) {
    setSelectedBrand(event.target.value);
  }

  function handleRatingChange(event) {
    setSelectedRating(event.target.value);
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-300 pb-6 mb-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900">
            QuicKart
          </h1>
          <p className="mt-2 lg:mt-0 text-lg text-gray-600 text-center lg:text-left">
            Beyond fashion, a lifestyle.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-1/4 lg:mr-8 mb-6 lg:mb-0">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 lg:hidden"
            >
              {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div
              className={`${
                mobileFiltersOpen ? "block" : "hidden"
              } lg:block bg-white p-4 rounded-lg shadow-lg mt-4 lg:mt-0`}
            >
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900">Sort by</h3>
                <div className="flex flex-col space-y-2 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={lowToHigh}
                      onChange={handleLowToHigh}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Low to High</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={highToLow}
                      onChange={handleHighToLow}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">High to Low</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <select
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <select
                  value={selectedRating}
                  onChange={handleRatingChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Ratings</option>
                  {Object.entries(ratings).map(([value, label], index) => (
                    <option key={index} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between space-x-2 mb-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max Price"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            <SearchWithDropdown
              suggestions={suggestions}
              onSearch={handleSearch}
              setSuggestions={setSuggestions}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {currentProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                {currentPage} of {totalPagesCalculated}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPagesCalculated}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/product?page=1&limit=10`
    );

    // Check if the response is OK (status code 200)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // Ensure data is structured as expected
    if (!data.products) {
      throw new Error("Invalid response structure");
    }

    return {
      props: {
        initialProducts: data.products,
        totalPages: data.pages,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return {
      props: {
        initialProducts: [],
        totalPages: 0,
      },
    };
  }
}

