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




// // pages/api/cart.js
// import dbConnect from '@/lib/dbconnect';
// import Cart from '@/models/Cart';
// import Product from '@/models/Product';

// export default async function handler(req, res) {
//     await dbConnect();

//     const userId = req.headers['user-id']; // Assume user ID is passed in headers

//     if (!userId) return res.status(400).json({ message: 'User ID is required' });

//     if (req.method === 'GET') {
//         try {
//             const cart = await Cart.findOne({ user: userId }).populate('items.product');
//             if (!cart) return res.status(404).json({ message: 'Cart is empty' });
//             res.status(200).json(cart);
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching cart' });
//         }
//     } else if (req.method === 'POST') {
//         const { productId, quantity } = req.body;
//         if (!productId || !quantity) return res.status(400).json({ message: 'Product ID and quantity are required' });

//         try {
//             let cart = await Cart.findOne({ user: userId });
//             const product = await Product.findById(productId);

//             if (!product) return res.status(404).json({ message: 'Product not found' });

//             if (!cart) {
//                 cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
//             } else {
//                 const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
//                 if (itemIndex >= 0) cart.items[itemIndex].quantity += quantity;
//                 else cart.items.push({ product: productId, quantity });
//             }

//             await cart.save();
//             res.status(200).json({ message: 'Product added to cart', cart });
//         } catch (error) {
//             res.status(500).json({ message: 'Error updating cart' });
//         }
//     } else if (req.method === 'DELETE') {
//         const { productId } = req.body;
//         if (!productId) return res.status(400).json({ message: 'Product ID is required' });

//         try {
//             const cart = await Cart.findOne({ user: userId });
//             if (!cart) return res.status(404).json({ message: 'Cart is empty' });

//             cart.items = cart.items.filter(item => !item.product.equals(productId));
//             await cart.save();

//             res.status(200).json({ message: 'Product removed from cart', cart });
//         } catch (error) {
//             res.status(500).json({ message: 'Error removing product from cart' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
