import dbConnect from "@/lib/dbconnect";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    await dbConnect();

    // Extract JWT from cookies
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no access token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (req.method === "GET") {
            try {
                const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
                if (!wishlist) return res.status(404).json({ message: "Wishlist is empty" });
                res.status(200).json({ wishlist });
            } catch (error) {
                res.status(500).json({ message: "Error fetching wishlist" });
            }
        } else if (req.method === "POST") {
            const { productId } = req.body;
            if (!productId) return res.status(400).json({ message: "Product ID is required" });

            try {
                // Validate product existence
                const product = await Product.findById(productId);
                if (!product) return res.status(404).json({ message: "Product not found" });

                let wishlist = await Wishlist.findOne({ user: userId });

                if (!wishlist) {
                    wishlist = new Wishlist({ user: userId, products: [productId] });
                } else {
                    if (!wishlist.products.includes(productId)) {
                        wishlist.products.push(productId);
                    }
                }

                await wishlist.save();
                res.status(200).json({ message: "Product added to wishlist", wishlist });
            } catch (error) {
                res.status(500).json({ message: "Error updating wishlist" });
            }
        } else if (req.method === "DELETE") {
            const { productId } = req.body;
            if (!productId) return res.status(400).json({ message: "Product ID is required" });

            try {
                let wishlist = await Wishlist.findOne({ user: userId });
                if (!wishlist) return res.status(404).json({ message: "Wishlist is empty" });

                wishlist.products = wishlist.products.filter(id => !id.equals(productId));
                await wishlist.save();

                res.status(200).json({ message: "Product removed from wishlist", wishlist });
            } catch (error) {
                res.status(500).json({ message: "Error removing product from wishlist" });
            }
        } else {
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

