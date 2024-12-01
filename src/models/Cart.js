// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1, min: 1 },
            },
        ],
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
