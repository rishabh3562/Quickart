// models/Wishlist.js
import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", unique: true }],
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
