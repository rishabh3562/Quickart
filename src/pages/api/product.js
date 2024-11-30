import dbConnect from '@/lib/dbconnect';
import Product from '@/models/Product';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        const { page = 1, limit = 10, category, brand, rating, minPrice, maxPrice, pid } = req.query;

        const filters = {};
        if (category) filters.category = category;
        if (brand) filters.brand = brand;
        if (rating) filters.rating = { $gte: parseFloat(rating) };
        if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
        if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
        if (pid) filters.id = pid; // Use `pid` to filter by product `id`

        const skip = (page - 1) * limit;

        try {
            // Aggregation query to fetch both products and metadata
            const result = await Product.aggregate([
                // Stage 1: Apply filters for products
                { $match: filters },

                // Stage 2: Use `$facet` to perform multiple operations in parallel
                {
                    $facet: {
                        products: [
                            { $skip: skip },
                            { $limit: parseInt(limit) },
                        ],
                        metadata: [
                            { $count: "total" },
                        ],
                    },
                },
                // Stage 3: Project metadata and products together
                {
                    $project: {
                        products: 1,
                        total: { $arrayElemAt: ["$metadata.total", 0] },
                    },
                },
            ]);

            if (!result || result.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }

            const { products, total } = result[0];
            const totalPages = Math.ceil(total / limit);

            // Extract categories, brands, and ratings
            const categories = await Product.distinct("category");
            const brands = await Product.distinct("brand");
            const ratings = await Product.distinct("rating");

            res.status(200).json({
                products,
                total,
                totalPages,
                categories,
                brands,
                ratings,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching products' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request (same as before)
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
