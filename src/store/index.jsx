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

const userStore = (set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
});

export const useLikeStore = create(
  persist(likeStore, {
    name: "like-data",
    storage: createJSONStorage(() => localStorage),
  })
);

export const useUserStore = create(
  persist(userStore, {
    name: "user",
    storage: createJSONStorage(() => localStorage),
  })
);
