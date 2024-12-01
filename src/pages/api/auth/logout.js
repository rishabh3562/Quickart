// pages/api/auth/logout.js
import { serialize } from "cookie";

// Logout user
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Clear the cookies by setting them to expire in the past
            res.setHeader("Set-Cookie", [
                serialize("accessToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: -1, // Expire the cookie immediately
                    path: "/",
                }),
                serialize("refreshToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: -1, // Expire the cookie immediately
                    path: "/",
                }),
            ]);

            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ message: "Internal Server Error", errmsg: error.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
