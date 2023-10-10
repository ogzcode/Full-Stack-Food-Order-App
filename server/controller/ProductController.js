import Product from "../model/Product.js";

export const createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file.filename;

    try {
        const product = await Product.createProduct({
            name,
            price,
            description,
            image,
        });

        res.status(201).json({ message: "Product created successfully."});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        res.status(200).json({ products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}