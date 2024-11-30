import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User"; // Assume you have a User model
import cookie from "cookie";

// Login user
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await dbConnect();

            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Verify password
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Create JWT tokens
            const accessToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_SECRET }
            );
            const refreshToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: process.env.JWT_REFRESH_SECRET }
            );

            // Set cookies with JWTs
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
                    maxAge: process.env.COOKIE_ACCESS_TOKEN_EXPIRY, // 15 minutes
                    path: "/",
                })
            );
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
                    maxAge: process.env.COOKIE_REFRESH_TOKEN_EXPIRY, // 7 days
                    path: "/",
                })
            );

            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
