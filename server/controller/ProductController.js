import Product from "../model/Product.js";
import Comment from "../model/Comment.js";
import Favorities from "../model/Favorities.js";

const calculateProductRatings = async (products) => {
    for (let product of products) {
        const average = await Comment.getRatingByProductId(product.id);
        product.rating = average._avg.rating || 0;
    }
}

export const createAndUpdateProduct = async (req, res) => {
    const { name, price, description, id } = req.body;
    let image = null;
    try {
        if (req.file) {
            image = req.file.filename;
        }

        if (id !== "undefined" && id !== null && id !== "" && id !== "null") {
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

        await calculateProductRatings(products);

        res.status(200).json({ products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getProductForUser = async (req, res) => {
    try {
        const products = await Product.getAll();

        const favorities = await Favorities.getAll(req.user.id);

        for (let favority of favorities) {
            const product = products.find(product => product.id === favority.productId);

            product.isFavority = true;
        }

        await calculateProductRatings(products);

        res.status(200).json({ products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const setProductFavority = async (req, res) => {
    const { productId } = req.body;

    try {
        const favority = await Favorities.getFavority(req.user.id, productId);
        const product = await Product.getProductById(productId);

        if (favority.length > 0) {
            await Favorities.deleteFavority(favority[0].id);
        }
        else {
            await Favorities.createFavority(productId, req.user.id);
            product.isFavority = true;
        }
        await calculateProductRatings([product]);

        res.status(200).json({ message: "Favority set successfully.", product });
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
