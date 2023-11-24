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
    static async getOrdersByUserId(userId, options = {}) {
        const { sort } = options;
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
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
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

    static async getProductInOrderByUserId(userId, productId) {
        return await prisma.order.findMany({
            where: {
                userId,
                products: {
                    some: {
                        id: productId,
                    },
                },
            }
        });
    }

    static getAllOrders() {
        return prisma.order.findMany({
            select: {
                id: true,
                orderNo: true,
                status: true,
                totalPrice: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    },
                },
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    static async getPendingOrderCount() {
        return await prisma.order.count({
            where: {
                status: "pending",
            },
        });
    }
}

export default Order;