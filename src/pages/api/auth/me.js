import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default async function handler(req, res) {
    const { accessToken } = parse(req.headers.cookie || "");

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        res.status(200).json({ id: decoded.id, email: decoded.email });
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}
