import dbConnect from '@/lib/dbconnect';
import Product from '@/models/Product';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        const { page = 1, limit = 10, category, brand, rating, minPrice, maxPrice } = req.query;

        const filters = {};
        if (category) filters.category = category;
        if (brand) filters.brand = brand;
        if (rating) filters.rating = { $gte: parseFloat(rating) };
        if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
        if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };

        const skip = (page - 1) * limit;

        try {
            // Fetch filtered products
            const products = await Product.find(filters).skip(skip).limit(parseInt(limit));

            // Calculate total products matching the filters
            const total = await Product.countDocuments(filters);

            // Extract unique categories, brands, and ratings
            const categories = await Product.distinct("category");
            const brands = await Product.distinct("brand");
            const ratings = await Product.distinct("rating");

            res.status(200).json({
                products,
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                categories,
                brands,
                ratings
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching products' });
        }
    } else if (req.method === 'POST') {
        const { id, name, href, price, description, options, quantity, images, details, imageSrc, imageAlt, category, brand, material, rating, reviews, availability } = req.body;

        if (!id || !name || !price || !description || !images || !imageSrc || !category) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        try {
            const newProduct = new Product({
                id,
                name,
                href,
                price,
                description,
                options,
                quantity,
                images,
                details,
                imageSrc,
                imageAlt,
                category,
                brand,
                material,
                rating,
                reviews,
                availability,
            });

            await newProduct.save();
            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
