// hooks/useRegister.js
import { useUserStore } from "@/store";
import axios from "axios";

export const useRegister = () => {
    const { setUser ,setTokens} = useUserStore();


    const register = async (email, password) => {
        try {
            const response = await axios.post("/api/auth/register", { email, password });
           console.log("response in the useregister hook")
            const { accessToken, refreshToken } = response.data;

            // Store JWTs and user data
            setTokens(accessToken, refreshToken);

            // Optionally, store user details from token or DB
            const user = { email };
            setUser(user);
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return register;
};
