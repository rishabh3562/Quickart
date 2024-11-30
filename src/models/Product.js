import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    href: { type: String, default: '#' },
    price: { type: String, required: true },
    description: { type: String, required: true },
    options: { type: String },
    quantity: { type: Number, default: 1 },
    images: [
        {
            id: { type: Number, required: true },
            src: { type: String, required: true },
            alt: { type: String, required: true },
        },
    ],
    details: [
        {
            name: { type: String, required: true },
            items: [{ type: String, required: true }],
        },
    ],
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    material: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    availability: { type: String, default: 'In Stock' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
