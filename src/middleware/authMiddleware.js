import jwt from "jsonwebtoken";

export default function authenticate(req, res) {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;  // Attach user ID to request
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

