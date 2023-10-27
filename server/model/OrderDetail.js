import prisma from "./prismaConfig.js";

class OrderDetail {
    static async createOrderDetail({ orderId, productId, quantity }) {
        return await prisma.orderDetails.create({
            data: {
                orderId,
                productId,
                quantity,
            }
        });
    }

    static async deleteAllOrderDetails() {
        return await prisma.orderDetails.deleteMany({});
    }

    static async getOrderDetailsByOrderId(orderId) {
        return await prisma.orderDetails.findMany({
            where: {
                orderId,
            },
        });
    }
}

export default OrderDetail;