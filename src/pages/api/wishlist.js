import dbConnect from "@/lib/dbconnect";
import Wishlist from "@/models/Wishlist";
import authMiddleware from "@/middleware/authMiddleware";

export default async function handler(req, res) {
    await dbConnect();
    await authMiddleware(req, res, async () => {
        const userId = req.userId; // Get user ID from the middleware
        console.log("userId in wishlist:", userId)
        if (req.method === "GET") {
            try {
                const wishlist = await Wishlist.findOne({ userId }).populate("products.productId");
                if (!wishlist) return res.status(404).json({ message: "Wishlist is empty" });
                res.status(200).json({ wishlist });
            } catch (error) {
                res.status(500).json({ message: "Error fetching wishlist" });
            }
        } else if (req.method === "POST") {
            const { productId } = req.body;
            if (!productId) return res.status(400).json({ message: "Product ID is required" });

            try {
                let wishlist = await Wishlist.findOne({ userId });
                if (!wishlist) {
                    wishlist = new Wishlist({ userId, products: [{ productId }] });
                } else {
                    if (!wishlist.products.some(p => p.productId.toString() === productId)) {
                        wishlist.products.push({ productId });
                    }
                }
                await wishlist.save();
                res.status(200).json({ message: "Product added to wishlist", wishlist });
            } catch (error) {
                res.status(500).json({ message: "Error updating wishlist" });
            }
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}

// // pages/api/wishlist.js
// import dbConnect from '@/lib/dbconnect';
// import Wishlist from '@/models/Wishlist';
// import Product from '@/models/Product';

// export default async function handler(req, res) {
//     await dbConnect();

//     const userId = req.headers['user-id']; // Assume user ID is passed in headers

//     if (!userId) return res.status(400).json({ message: 'User ID is required' });

//     if (req.method === 'GET') {
//         try {
//             const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
//             if (!wishlist) return res.status(404).json({ message: 'Wishlist is empty' });
//             res.status(200).json(wishlist);
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching wishlist' });
//         }
//     } else if (req.method === 'POST') {
//         const { productId } = req.body;
//         if (!productId) return res.status(400).json({ message: 'Product ID is required' });

//         try {
//             let wishlist = await Wishlist.findOne({ user: userId });
//             const product = await Product.findById(productId);

//             if (!product) return res.status(404).json({ message: 'Product not found' });

//             if (!wishlist) wishlist = new Wishlist({ user: userId, products: [productId] });
//             else if (!wishlist.products.includes(productId)) wishlist.products.push(productId);

//             await wishlist.save();
//             res.status(200).json({ message: 'Product added to wishlist', wishlist });
//         } catch (error) {
//             res.status(500).json({ message: 'Error updating wishlist' });
//         }
//     } else if (req.method === 'DELETE') {
//         const { productId } = req.body;
//         if (!productId) return res.status(400).json({ message: 'Product ID is required' });

//         try {
//             const wishlist = await Wishlist.findOne({ user: userId });
//             if (!wishlist) return res.status(404).json({ message: 'Wishlist is empty' });

//             wishlist.products = wishlist.products.filter(id => !id.equals(productId));
//             await wishlist.save();

//             res.status(200).json({ message: 'Product removed from wishlist', wishlist });
//         } catch (error) {
//             res.status(500).json({ message: 'Error removing product from wishlist' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
