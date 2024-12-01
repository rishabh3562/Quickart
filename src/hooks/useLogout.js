// hooks/useLogout.js
import { useUserStore } from "@/store";
import axios from "axios";

export const useLogout = () => {
    const setUser = useUserStore((state) => state.setUser);

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });

            // Clear the user store
            setUser({ id: null, email: null });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return logout;
};
