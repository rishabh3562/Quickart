import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User"; // Assume you have a User model

// Login user
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await dbConnect();

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid username or password" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid username or password" });
            }

            const accessToken = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
            const refreshToken = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
            );

            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
