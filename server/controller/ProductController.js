import Product from "../model/Product.js";
import Comment from "../model/Comment.js";
import Favorities from "../model/Favorities.js";

const calculateProductRatings = async (products) => {
    for (let product of products) {
        const average = await Comment.getRatingByProductId(product.id);
        product.rating = average._avg.rating || 0;
    }
}

/**
 * @swagger
 * /product/createAndUpdate:
 *   post:
 *     summary: Create or update a product.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: body
 *         name: productData
 *         description: Product details for creation or update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: string
 *             description:
 *               type: string
 *             id:
 *               type: string
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             example:
 *               product:
 *                 id: 1
 *                 name: "Product A"
 *                 price: "50.00"
 *                 description: "Description of Product A"
 *                 image: "product_a.jpg"
 *                 message: "Product created successfully."
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               product:
 *                 id: 1
 *                 name: "Product A"
 *                 price: "50.00"
 *                 description: "Updated description of Product A"
 *                 image: "product_a_updated.jpg"
 *                 message: "Product updated successfully."
 *       500:
 *         description: Internal server error during product creation or update.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error during product creation or update."
 */
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
        res.status(404).json({ error: error.message });
    }
}

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: All products retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - id: 1
 *                   name: "Product A"
 *                   price: "50.00"
 *                   description: "Description of Product A"
 *                   image: "product_a.jpg"
 *                   rating: 4.5
 *                   isFavority: false
 *       404:
 *         description: No products found.
 */
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        await calculateProductRatings(products);

        res.status(200).json({ products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * @swagger
 * /product/user:
 *   get:
 *     summary: Get products for the authenticated user.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Products for the user retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - id: 1
 *                   name: "Product A"
 *                   price: "50.00"
 *                   description: "Description of Product A"
 *                   image: "product_a.jpg"
 *                   rating: 4.5
 *                   isFavority: true
 *       404:
 *         description: No products found for the user.
 *         content:
 *           application/json:
 *             example:
 *               error: "No products found for the user."
 */
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


/**
 * @swagger
 * /product/setFavority:
 *   post:
 *     summary: Set or unset a product as a favorite for the authenticated user.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: body
 *         name: favorityData
 *         description: Favority details.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productId:
 *               type: string
 *     responses:
 *       200:
 *         description: Favority set or unset successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Favority set successfully."
 *               product:
 *                 id: 1
 *                 name: "Product A"
 *                 price: "50.00"
 *                 description: "Description of Product A"
 *                 image: "product_a.jpg"
 *                 rating: 4.5
 *                 isFavority: true
 *       404:
 *         description: Product not found or error during favority operation.
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found or error during favority operation."
 */
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

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Product deleted successfully."
 *       404:
 *         description: Product not found or error during deletion.
 *         content:
 *           application/json:
 *             example:
 *               error: "Product not found or error during deletion."
 */
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.deleteProduct(id);

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
