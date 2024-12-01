import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products } from "@/data";
import nookies from "nookies";
import Cookies from "js-cookie";
// Define the product store
// const productStore = (set) => ({
//   product: products, // Initialize with the products array
//   setProduct: (data) => {
//     set({ product: data });
//     // Update localStorage manually when the product array changes
//     localStorage.setItem("product-data", JSON.stringify(data));
//   },
// });

// Create a Zustand store with persistence
// export const useProductStore = create(
//   persist(productStore, {
//     name: "product-data",
//     storage: createJSONStorage(() => localStorage),
//   })
// );

const cartStore = (set) => ({
  cart: [],
  setCart: (data) => set({ cart: data }),
});

export const useCartStore = create(
  persist(cartStore, {
    name: "cart-data",
    storage: createJSONStorage(() => localStorage),
  })
);

const likeStore = (set) => ({
  like: [],
  setLike: (data) => set({ like: data }),
});

export const useLikeStore = create(
  persist(likeStore, {
    name: "like-data",
    storage: createJSONStorage(() => localStorage),
  })
);

// // const userStore = (set) => ({
// //   user: null,
// //   accessToken: null,
// //   refreshToken: null,
// //   setUser: (user) => set({ user }),
// //   setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
// //   logout: () => set({ user: null, accessToken: null, refreshToken: null }),
// // });

// // export const useUserStore = create(
// //   persist(userStore, {
// //     name: "user",
// //     storage: createJSONStorage(() => localStorage),
// //   })
// // );

// const userStore = (set) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   setUser: (user) => set({ user }),
//   setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
//   logout: () => {
//     // Remove cookies when the user logs out
//     nookies.destroy(null, "accessToken");
//     nookies.destroy(null, "refreshToken");
//     nookies.destroy(null, "user");
//     set({ user: null, accessToken: null, refreshToken: null });
//   },
//   hydrate: (ctx) => {
//     // Get cookies from server-side context (for SSR) or from the client-side cookies
//     const cookies = nookies.get(ctx);
//     const accessToken = cookies.accessToken;
//     const refreshToken = cookies.refreshToken;
//     const user = cookies.user ? JSON.parse(cookies.user) : null;

//     if (accessToken && refreshToken) {
//       set({
//         accessToken,
//         refreshToken,
//         user,
//       });
//     }
//   },
// });

// export const useUserStore = create(
//   persist(userStore, {
//     name: "user", // This is the key for the storage but we use cookies here
//     storage: createJSONStorage(() => nookies), // Use nookies for cookie storage
//     partialize: (state) => ({
//       user: state.user,
//       accessToken: state.accessToken,
//       refreshToken: state.refreshToken,
//     }),
//   })
// );

// import create from "zustand";
// import { persist } from "zustand/middleware";
// import nookies from "nookies"; // Import nookies for cookie handling

// Custom storage object using nookies
const cookieStorage = {
  getItem: (name) => {
    const cookies = nookies.get(); // Fetch cookies
    return cookies[name] || null; // Return cookie value or null if not found
  },
  setItem: (name, value) => {
    nookies.set(null, name, value, { path: "/", maxAge: 60 * 60 * 24 * 7 }); // Set cookie with 7 days expiry
  },
  removeItem: (name) => {
    nookies.destroy(null, name, { path: "/" }); // Destroy the cookie
  },
};

const userStore = (set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  logout: () => {
    cookieStorage.removeItem("accessToken");
    cookieStorage.removeItem("refreshToken");
    cookieStorage.removeItem("user");
    set({ user: null, accessToken: null, refreshToken: null });
  },
  hydrate: (cookies) => {
    // Hydrate from cookies
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    const user = cookies.user ? JSON.parse(cookies.user) : null;

    // If tokens exist in cookies, update the store state
    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
        user,
      });
    }
  },
});
export const isTokenValid = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  return decoded.exp > currentTime;
};

// Using the custom `cookieStorage` for persistence with Zustand
export const useUserStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (userData) => set({ user: userData }),
  setTokens: (access, refresh) => {
    Cookies.set("accessToken", access, { expires: 7 });
    Cookies.set("refreshToken", refresh, { expires: 7 });

    // Decode the access token to extract user data
    const decoded = jwtDecode(access);
    set({
      accessToken: access,
      refreshToken: refresh,
      user: {
        id: decoded.id,
        email: decoded.email,
      },
    });
  },
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ user: null, accessToken: null, refreshToken: null });
  },
  hydrateStore: (userData, accessToken, refreshToken) => {
    set({ user: userData, accessToken, refreshToken });
  },
}));

// Example for other stores (product, cart, like) if needed
const productStore = (set) => ({
  product: [], // Initialize with empty product list
  setProduct: (data) => set({ product: data }),
});

export const useProductStore = create(
  persist(productStore, {
    name: "product-data", // Key for the store
    storage: cookieStorage, // Use custom cookie storage
  })
);

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { products } from "@/data";

// // Define the product store
// const productStore = (set) => ({
//   product: products, // Initialize with the products array
//   setProduct: (data) => {
//     set({ product: data });
//     // Update localStorage manually when the product array changes
//     localStorage.setItem("product-data", JSON.stringify(data));
//   },
// });

// // Create a Zustand store with persistence
// export const useProductStore = create(
//   persist(productStore, {
//     name: "product-data",
//     storage: createJSONStorage(() => localStorage),
//   })
// );

// const cartStore = (set) => ({
//   cart: [],
//   setCart: (data) => set({ cart: data }),
// });

// export const useCartStore = create(
//   persist(cartStore, {
//     name: "cart-data",
//     storage: createJSONStorage(() => localStorage),
//   })
// );

// const likeStore = (set) => ({
//   like: [],
//   setLike: (data) => set({ like: data }),
// });

// export const useLikeStore = create(
//   persist(likeStore, {
//     name: "like-data",
//     storage: createJSONStorage(() => localStorage),
//   })
// );

// // const userStore = (set) => ({
// //   user: null,
// //   accessToken: null,
// //   refreshToken: null,
// //   setUser: (user) => set({ user }),
// //   setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
// //   logout: () => set({ user: null, accessToken: null, refreshToken: null }),
// // });

// // export const useUserStore = create(
// //   persist(userStore, {
// //     name: "user",
// //     storage: createJSONStorage(() => localStorage),
// //   })
// // );

// const userStore = (set) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   setUser: (user) => set({ user }),
//   setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
//   logout: () => set({ user: null, accessToken: null, refreshToken: null }),
//   hydrate: (cookies) => {
//     // Optionally, hydrate user state from cookies if available
//     if (cookies.accessToken && cookies.refreshToken) {
//       set({
//         accessToken: cookies.accessToken,
//         refreshToken: cookies.refreshToken,
//       });
//     }
//   },
// });

// export const useUserStore = create(
//   persist(userStore, {
//     name: "user",
//     storage: createJSONStorage(() => localStorage),
//     partialize: (state) => ({
//       user: state.user,
//       accessToken: state.accessToken,
//       refreshToken: state.refreshToken,
//     }),
//   })
// );
