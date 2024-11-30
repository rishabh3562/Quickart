import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products } from "@/data";

// Define the product store
const productStore = (set) => ({
  product: products, // Initialize with the products array
  setProduct: (data) => {
    set({ product: data });
    // Update localStorage manually when the product array changes
    localStorage.setItem("product-data", JSON.stringify(data));
  },
});

// Create a Zustand store with persistence
export const useProductStore = create(
  persist(productStore, {
    name: "product-data",
    storage: createJSONStorage(() => localStorage),
  })
);

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

// const userStore = (set) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   setUser: (user) => set({ user }),
//   setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
//   logout: () => set({ user: null, accessToken: null, refreshToken: null }),
// });

// export const useUserStore = create(
//   persist(userStore, {
//     name: "user",
//     storage: createJSONStorage(() => localStorage),
//   })
// );

const userStore = (set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
  hydrate: (cookies) => {
    // Optionally, hydrate user state from cookies if available
    if (cookies.accessToken && cookies.refreshToken) {
      set({
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken,
      });
    }
  },
});

export const useUserStore = create(
  persist(userStore, {
    name: "user",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }),
  })
);
