import prisma from "./prismaConfig.js";

class Favorities {
    static async createFavority(productId, userId) {
        return await prisma.favorities.create({
            data: {
                productId,
                userId,
            },
        });
    }

    static async getAll(userId) {
        return await prisma.favorities.findMany({
            where: {
                userId: parseInt(userId),
            },
            select: {
                id: true,
                productId: true,
                userId: true,
            },
        });
    }

    static async deleteFavority(id) {
        return await prisma.favorities.delete({
            where: {
                id: parseInt(id),
            },
        });
    }

    static async getFavority(userId, productId) {
        return await prisma.favorities.findMany({
            where: {
                userId: parseInt(userId),
                productId: parseInt(productId),
            },
            select: {
                id: true,
                productId: true,
                userId: true,
            },
        });
    }
}

export default Favorities;