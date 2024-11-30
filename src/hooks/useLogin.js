import { useUserStore } from "@/store";
import axios from "axios";

export const useLogin = () => {
  const setTokens = useUserStore((state) => state.setTokens);
  const setUser = useUserStore((state) => state.setUser);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/auth/login", { username, password });
      const { accessToken, refreshToken } = response.data;

      // Store JWTs and user data
      setTokens(accessToken, refreshToken);

      // Optionally, store user details from token or DB
      const user = { username };
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return login;
};
