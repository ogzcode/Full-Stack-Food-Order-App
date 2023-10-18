import prisma from "./prismaConfig.js"

class Order {
    static async createOrder({ userId, totalPrice, products }) {
        return await prisma.order.create({
            data: {
                userId,
                totalPrice,
                products: {
                    connect: products
                }
            },
        });
    }
    static async getOrdersByUserId(userId) {
        return await prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                products: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                }
            }
        });
    }
}

export default Order;