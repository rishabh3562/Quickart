import dbConnect from '@/lib/dbconnect';
import Product from '@/models/Product';

export default async function handler(req, res) {
    await dbConnect();

    const { pid } = req.query; // Extract the `pid` from the URL parameter

    if (req.method === 'GET') {
        // Convert pid to a number and validate
        const parsedPid = Number(pid);

        if (isNaN(parsedPid)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        try {
            // Find the product by the `id` (which is now a number)
            const product = await Product.findOne({ id: parsedPid });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // If product is found, send the product data in the response
            res.status(200).json({ product });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching product' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
