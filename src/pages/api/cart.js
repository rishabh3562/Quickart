import dbConnect from "@/lib/dbconnect";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    await dbConnect();

    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no access token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (req.method === "POST") {
            const { productId, id, quantity } = req.body;

            if ((!productId && !id) || !quantity) {
                return res.status(400).json({ message: "Product ID or PID and quantity are required" });
            }

            let product;
            if (id) {
                product = await Product.findOne({ id });
            }

            if (productId) {
                product = await Product.findById(productId);
            }

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = new Cart({
                    user: userId,
                    items: [{ product: product._id, quantity }],
                });
            } else {
                const cartItem = cart.items.find(item => item.product.toString() === product._id.toString());

                if (cartItem) {
                    cartItem.quantity += quantity;
                } else {
                    cart.items.push({ product: product._id, quantity });
                }
            }

            await cart.save();
            const updatedCart = await Cart.findOne({ user: userId }).populate("items.product");
            res.status(201).json({ message: "Product added to cart", cart: updatedCart });

        } 
        else if (req.method === "GET") {
            const cart = await Cart.findOne({ user: userId }).populate("items.product");

            if (!cart) {
                return res.status(404).json({ message: "Cart is empty" });
            }
            // Calculate the total amount
            const totalAmount = cart.items.reduce((total, item) => {
                const price = parseFloat(item.product.price);  // Assuming the price is stored as a string
                return total + price * item.quantity;
            }, 0);

            res.status(200).json({ cart, totalAmount });

        } else {
            res.setHeader("Allow", ["POST", "GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: error.message });
    }
}
