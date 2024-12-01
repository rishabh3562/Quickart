import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import nookies from "nookies";
import Cookies from "js-cookie";
import { ROUTES } from "@/lib/routes";

const cartStore = (set) => ({
  cart: [],
  count:0,
  setCart: (data) => set({ cart: data }),
  setCount:(data)=>set(data)
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
  logout: async () => {
    // Remove tokens from cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ user: null, accessToken: null, refreshToken: null });

    // Call the backend to delete cookies from the server
    try {
      const response = await fetch(ROUTES.API.LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout successful");
        // Optionally, redirect after logout (e.g., to login page)
        window.location.href = "/login"; // Or any other page you want to redirect to
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
  hydrateStore: (userData, accessToken, refreshToken) => {
    set({ user: userData, accessToken, refreshToken });
  },
}));
