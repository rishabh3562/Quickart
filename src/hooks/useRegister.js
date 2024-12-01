// hooks/useRegister.js
import { ROUTES } from "@/lib/routes";
import { useUserStore } from "@/store";
import axios from "axios";

export const useRegister = () => {
    const { setUser, setTokens } = useUserStore();

    const register = async (email, password) => {
        try {
            const response = await axios.post(ROUTES.API.SIGNUP, { email, password });

            // At this point, the JWT tokens are already set in cookies (no need to handle them here)
            // Get the user information from the response or directly from the stored data
            const user = { email };
            setUser(user);
            // Optionally, you can fetch user data from an API if necessary after registration

        } catch (error) {
            // console.error("Registration failed", error);
            throw error; // Let the caller handle errors if needed
        }
    };

    return register;
};
