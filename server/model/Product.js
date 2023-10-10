import prisma from "./prismaConfig.js";

class Product {
    static async createProduct({ name, price, description, image }) {
        return await prisma.product.create({
            data: {
                name,
                price,
                description,
                image,
            },
        });
    }

    static async getAll() {
        return await prisma.product.findMany();
    }
}

export default Product;