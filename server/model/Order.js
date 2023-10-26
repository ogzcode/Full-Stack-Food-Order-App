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
            select: {
                orderNo: true,
                status: true,
                totalPrice: true,
                createdAt: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                        image: true,
                        createdAt: true,
                    },
                }
            }
        });
    }

    static async deleteAllOrders() {
        return await prisma.order.deleteMany({});
    }
}

export default Order;