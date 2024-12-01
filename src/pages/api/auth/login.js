import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User";
import cookie from "cookie";
import { serialize } from "cookie";
// Login user
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await dbConnect();

            // Check if the user exists
            const user = await User.findOne({ email });
            console.log('User found:', user); // Log user object
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Use the comparePassword method from the schema
            const isPasswordCorrect = await user.comparePassword(password);
            console.log('Password comparison result:', isPasswordCorrect); // Log result
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Create JWT tokens
            const accessToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );
            const refreshToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
            );

            // Set cookies with JWTs
            res.setHeader("Set-Cookie", [
                serialize("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Secure in production
                    sameSite: "Lax", // Allow cookies in cross-origin if needed; use "None" for cross-site
                    maxAge: 60 * 60 * 24, // 1 day
                    path: "/",
                }),
                serialize("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Lax",
                    maxAge: 60 * 60 * 24 * 7, // 7 days
                    path: "/",
                }),
            ]);


            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            console.error('Error during login:', error); // Log the exact error
            res.status(500).json({ message: "Internal Server Error", errmsg: error.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
