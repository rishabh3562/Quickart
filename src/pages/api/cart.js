import dbConnect from "@/lib/dbconnect";
import Cart from "@/models/Cart";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no access token" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            const { productId, quantity } = req.body;

            if (!productId || !quantity) {
                return res.status(400).json({ message: "Product ID and quantity are required" });
            }

            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = new Cart({
                    user: userId,
                    items: [{ product: productId, quantity }],
                });
                await cart.save();
            } else {
                const cartItem = cart.items.find(item => item.product.toString() === productId);

                if (cartItem) {
                    cartItem.quantity += quantity;
                    await cart.save();
                } else {
                    cart.items.push({ product: productId, quantity });
                    await cart.save();
                }
            }

            const updatedCart = await Cart.findOne({ user: userId }).populate("items.product");
            res.status(201).json({ message: "Product added to cart", cart: updatedCart });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    } else if (req.method === "GET") {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no access token" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            const cart = await Cart.findOne({ user: userId }).populate("items.product");

            if (!cart) {
                return res.status(404).json({ message: "Cart is empty" });
            }

            res.status(200).json({ cart });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
