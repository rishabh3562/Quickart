// pages/api/auth/register.js
import bcrypt from "bcryptjs";
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

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hashedPassword });

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
                    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in prod
                    sameSite: "Strict",
                    maxAge: 60 * 60 * 24,
                    path: "/",
                }),
                serialize("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Strict",
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                }),
            ]);

            // Send success response (no tokens in response body, they are in cookies)
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
