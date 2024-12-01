import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User"; // Your User model
import { serialize } from "cookie"; // Use 'cookie' package for secure cookie handling

// Register user
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await dbConnect();

            // Check if the user already exists by email
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Create a new user without manually hashing the password
            const newUser = new User({ email, password });

            const savedUser = await newUser.save();

            // Generate JWT tokens
            const accessToken = jwt.sign(
                { id: newUser._id, email: newUser.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );
            const refreshToken = jwt.sign(
                { id: newUser._id, email: newUser.email },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
            );

            // Set JWT in cookies for secure access
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

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
