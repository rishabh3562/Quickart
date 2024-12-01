import Layout from "@/components/Layout/Layout";
import Card from "@/components/products/Card";
import SEO from "@/components/SEO";
// import SearchWithDropdown from "@/components/SearchWithDropdown";

export default function ProductsPage({
  products,
  totalPages,
  categories,
  brands,
  ratings,
  currentPage,
  category,
  brand,
  rating,
  minPrice,
  maxPrice,
}) {


  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(name, value); // Update the query parameter
    window.location.search = queryParams.toString(); // Reload the page with new filters
  };

  // Function to handle search input
  const handleSearch = (searchQuery) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", searchQuery); // Add search query to URL
    window.location.search = queryParams.toString(); // Reload the page with new search query
  };

  return (
    <div className="bg-gray-50">
      <SEO
        title="All Products"
        description="Browse our collection of top-quality products across various categories at Quickart."
      />
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
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  defaultValue={category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {/* Brand Filter */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  defaultValue={brand}
                  onChange={handleFilterChange}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              {/* Rating Filter */}
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  defaultValue={rating}
                  onChange={handleFilterChange}
                >
                  <option value="">All Ratings</option>
                  {ratings.map((ratingValue) => (
                    <option key={ratingValue} value={ratingValue}>
                      {ratingValue} Stars
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label
                  htmlFor="minPrice"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Price Range
                </label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  placeholder="Min Price"
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  defaultValue={minPrice}
                  onChange={handleFilterChange}
                />
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  placeholder="Max Price"
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  defaultValue={maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            {/* <SearchWithDropdown
              suggestions={products.map((p) => p.name)}
              onSearch={handleSearch} // Pass onSearch here
            /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {products.map((p) => (
                <Card key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    const queryParams = new URLSearchParams(
                      window.location.search
                    );
                    queryParams.set("page", currentPage - 1);
                    window.location.search = queryParams.toString();
                  }
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      const queryParams = new URLSearchParams(
                        window.location.search
                      );
                      queryParams.set("page", i + 1);
                      window.location.search = queryParams.toString();
                    }}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    const queryParams = new URLSearchParams(
                      window.location.search
                    );
                    queryParams.set("page", currentPage + 1);
                    window.location.search = queryParams.toString();
                  }
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
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

export async function getServerSideProps({ query }) {
  const {
    page = 1,
    category = "",
    brand = "",
    rating = "",
    minPrice = "",
    maxPrice = "",
    search = "", // Capture the search query
  } = query;
  const productsPerPage = 8;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product?page=${page}&category=${category}&brand=${brand}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${search}&limit=${productsPerPage}`
    );
    const data = await res.json();

    if (!data || !data.products) {
      throw new Error("Invalid response data");
    }

    const totalPages = Math.ceil(data.total / productsPerPage);

    return {
      props: {
        products: data.products,
        totalPages: totalPages,
        categories: data.categories,
        brands: data.brands,
        ratings: data.ratings,
        currentPage: parseInt(page, 10),
        category,
        brand,
        rating,
        minPrice,
        maxPrice,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return {
      props: {
        products: [],
        totalPages: 0,
        categories: [],
        brands: [],
        ratings: [],
        currentPage: 1,
        category: "",
        brand: "",
        rating: "",
        minPrice: "",
        maxPrice: "",
      },
    };
  }
}
