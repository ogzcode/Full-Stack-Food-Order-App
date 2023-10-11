import Product from "../model/Product.js";

export const createAndUpdateProduct = async (req, res) => {
    const { name, price, description, id } = req.body;
    let image = null;
    try {
        if (req.file) {
            image = req.file.filename;
        }

        if (id) {
            const product = await Product.updateProduct(id, name, price, description, image);

            res.status(200).json({ product, message: "Product updated successfully." });
        }
        else {
            const product = await Product.createProduct(name, price, description, image);

            res.status(201).json({ product, message: "Product created successfully." });
        }
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

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.deleteProduct(id);

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
