import { ROUTES } from "@/lib/routes";
import { useUserStore } from "@/store";
import axios from "axios";

export const useLogin = () => {
  const setTokens = useUserStore((state) => state.setTokens);
  const setUser = useUserStore((state) => state.setUser);

  const login = async (email, password) => {
    try {
      // First, attempt to log in
      const response = await axios.post(ROUTES.API.LOGIN, { email, password });

      // Fetch user data after login
      const response2 = await axios.get(ROUTES.API.ME, { withCredentials: true });

      // Avoid name conflict by renaming email from response2
      const { id, email: fetchedEmail } = response2.data;

      // Update the user store with the fetched data
      setUser({ id, email: fetchedEmail });

    } catch (error) {
      // console.error("Login failed", error);
    }
  };

  return login;
};
