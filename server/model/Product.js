import fs from "fs";
import prisma from "./prismaConfig.js";

class Product {
    static async createProduct(name, price, description, image ) {
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

    static async getProductById(id) {
        return await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }

    static async deleteProduct(id) {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        const imageList = await prisma.product.findMany({
            where: {
                image: product.image
            },
        });

        if (imageList.length === 1) {
            fs.unlink(`./public/docs/${product.image}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        return await prisma.product.delete({
            where: {
                id: parseInt(id),
            },
        });
    }

    static async updateProduct(id, name, price, description, image) {
        const dataToUpdate = {
            name,
            price,
            description,
        };

        if (image) {
            dataToUpdate.image = image;
        }

        return await prisma.product.update({
            where: {
                id: parseInt(id),
            },
            data: dataToUpdate
        });
    }
}

export default Product;