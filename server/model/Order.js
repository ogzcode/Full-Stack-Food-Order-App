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
                id: true,
                orderNo: true,
                status: true,
                totalPrice: true,
                createdAt: true,
            }
        });
    }

    static async getOrderById (id) {
        return await prisma.order.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                    },
                }
            }
        });
    }

    static async deleteAllOrders() {
        return await prisma.order.deleteMany({});
    }

    static async updateOrderStatus(id, status) {
        return await prisma.order.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }
}

export default Order;