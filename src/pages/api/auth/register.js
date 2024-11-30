// pages/api/auth/register.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User"; // Your User model

// Register user
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await dbConnect();

            // Check if the user already exists by email
            const existingUser = await User.findOne({ email });
            console.log("existingUser ",existingUser)
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hashedPassword });

           const savedUser= await newUser.save();
console.log("savedUser ",savedUser)
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

            // Send tokens back to client
            res.status(201).json({ accessToken, refreshToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
