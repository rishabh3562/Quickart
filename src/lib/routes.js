
const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Base URL comes from environment variables
// console.log("base ",BASE_URL)
export const ROUTES = {
    BASE_URL,
    API_URL: {
        PRODUCT: `${BASE_URL}/api/product`,
        CART: `${BASE_URL}/api/cart`,
        LOGIN: `${BASE_URL}/api/auth/login`,
        LOGOUT: `${BASE_URL}/api/auth/logout`,
        SIGNUP: `${BASE_URL}/api/auth/register`,
        ME: `${BASE_URL}/api/auth/me`,
        CHECKOUT: `${BASE_URL}/api/checkout`,
        WISHLIST: `${BASE_URL}/api/wishlist`,
        PRODUCT_DETAIL: (pid) => `${BASE_URL}/api/product/detail/${pid}`, // Dynamic route for product detail
        PRODUCT_LIST: ({ page, category, brand, rating, minPrice, maxPrice, search, productsPerPage }) =>
            `${BASE_URL}/api/product?page=${page}&category=${category}&brand=${brand}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${search}&limit=${productsPerPage}`,
        // Other routes can go here...
    
    },
    API: {
        PRODUCT: '/api/product',
        CART: '/api/cart',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        SIGNUP: '/api/auth/register',
        ME: '/api/auth/me',
        CHECKOUT: '/api/checkout',
        WISHLIST: 'api/wishlist',
        PRODUCT_DETAIL: `api/product/detail`
    },
    CLIENT: {
        LANDING: '/',
        HOME: '/home',
        REGISTER: '/signup',
        LOGIN: '/login',
        CART: '/cart',
        PRODUCT: '/products',
        PRODUCT_DETAIL: (pid) => `/product-overview?pid=${pid}`, // Dynamic product detail URL
        CHECKOUT: '/checkout',
    },
};



// // utils/routes.js
// export const ROUTES = {
//     BASE_URL: process.env.API_URL,
//     API: {
//         PRODUCT: '/api/product',
      
//         CART: '/api/cart',
//         LOGIN: '/api/auth/login',
//         LOGOUT: '/api/auth/logout',
//         SIGNUP: '/api/auth/register',
//         ME: '/api/auth/me',
//         CHECKOUT: '/api/checkout',
//         WISHLIST:'api/wishlist',
//         PRODUCT_DETAIL:`api/product/detail`
//     },
//     CLIENT:{
//         LANDING:'/',
//         HOME:'/HOME',
//         REGISTER:'/signup',
//         LOGIN:'/login',
//         CART:'/cart',
//         PRODUCT:'/products',
//         PRODUCT_DETAIL:'/product-overview',
//         CHECKOUT:'/checkout'
//     }
// };