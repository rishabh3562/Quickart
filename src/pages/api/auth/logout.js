import cookie from "cookie";
import { serialize } from "cookie";
// Logout user
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Set cookies to expire immediately to logout the user
            res.setHeader("Set-Cookie", [
                serialize("accessToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
                    maxAge: 0, // Expire the cookie
                    path: "/",
                }),
                serialize("refreshToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 0, // Expire the cookie
                    path: "/",
                }),
            ]);

            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            // console.error('Error during logout:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
