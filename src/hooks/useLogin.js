import { useUserStore } from "@/store";
import axios from "axios";

export const useLogin = () => {
  const setTokens = useUserStore((state) => state.setTokens);
  const setUser = useUserStore((state) => state.setUser);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      // After successful login, you can get the response (no tokens in this example as they are set in cookies)
      setUser({ email });  // Store user details from response or use email directly
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return login;
};
