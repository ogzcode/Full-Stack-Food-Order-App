import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import OrderDetail from "../model/OrderDetail.js";
import { getProductQuantityWithOrderDetail } from "../utils/util.js";


/**
 * @swagger
 * /order/createOrder:
 *   post:
 *     summary: Create a new order.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: body
 *         name: orderData
 *         description: Order details for creation.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   quantity:
 *                     type: number
 *     responses:
 *       200:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request or error during order creation.
 */
export const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const userDetail = req.user;

        const pendingOrder = await Order.getPendingOrderByUserId(userDetail.id);

        if (pendingOrder) {
            return res.status(400).json({ message: "You already have a pending order." });
        }

        const user = await User.findUserById(userDetail.id);

        let totalPrice = 0;
        const productList = []
        const orderDetail = [];

        for (let product of products) {
            let item = await Product.getProductById(product.id);
            productList.push({ id: item.id });
            totalPrice += parseInt(item.price) * product.quantity;
            orderDetail.push({ productId: item.id, quantity: product.quantity });
        }

        await User.setOrderCount(user.id, user.orderCount + 1);
        const order = await Order.createOrder({ userId: user.id, totalPrice: String(totalPrice), products: productList });

        for (let item of orderDetail) {
            await OrderDetail.createOrderDetail({ orderId: order.id, productId: item.productId, quantity: item.quantity });
        }

        return res.status(200).json({ message: "Order created successfully." });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


/**
 * @swagger
 * /order/getOrders:
 *   get:
 *     summary: Get user's orders.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   orderNo:
 *                     type: string
 *                   status:
 *                     type: string
 *                   totalPrice:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *       400:
 *         description: Bad request or error during order retrieval.
 */
export const getOrders = async (req, res) => {
    try {
        const userDetail = req.user;

        const user = await User.findUserById(userDetail.id);

        const orders = await Order.getOrdersByUserId(user.id, { sort: "desc" });

        return res.status(200).json({ orders });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


/**
 * @swagger
 * /order/getOrderDetails/{orderId}:
 *   get:
 *     summary: Get details of a specific order.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         description: ID of the order to get details for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 price:
 *                   type: string
 *                 image:
 *                   type: string
 *                 quantity:
 *                   type: number
 *       400:
 *         description: Bad request or error during order details retrieval.
 */
export const getOrderDetails = async (req, res) => {
    try {
        const userDetail = req.user;
        const { orderId } = req.params;

        const order = await Order.getOrderById(parseInt(orderId));
        const orderDetails = await OrderDetail.getOrderDetailsByOrderId(order.id);

        getProductQuantityWithOrderDetail(order, orderDetails);

        return res.status(200).json({ products: order.products });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


/**
 * @swagger
 * /order/changeOrderStatus:
 *   put:
 *     summary: Update the status of an order.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: body
 *         name: orderStatusData
 *         description: Order status details.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             orderId:
 *               type: integer
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *       400:
 *         description: Bad request or error during order status update.
 */
export const changeOrderStatus = async (req, res) => {
    try {
        const { status, orderId } = req.body;

        const order = await Order.getOrderById(parseInt(orderId));

        await Order.updateOrderStatus(order.id, status);

        let message = "";

        if (status === "completed") {
            message = "Order confirmed successfully.";
        }
        else if (status === "cancelled") {
            message = "Order cancelled successfully.";
        }
        else {
            message = "Order status updated successfully.";
        }

        return res.status(200).json({ message });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const deleteAllOrders = async (req, res) => {
    try {
        const userDetail = req.user;
        const orderDetails = await OrderDetail.deleteAllOrderDetails();
        const orders = await Order.deleteAllOrders();
        return res.status(200).json({ message: "All orders deleted successfully." });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


/**
 * @swagger
 * /order/getAllOrders:
 *   get:
 *     summary: Get all orders (admin only).
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: All orders retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               orders:
 *                 - id: 1
 *                   orderNo: "ORD123"
 *                   status: "completed"
 *                   totalPrice: "150.00"
 *                   createdAt: "2024-01-08T12:34:56.789Z"
 *                   user:
 *                     id: 1
 *                     username: "admin"
 *                     phone: "1234567890"
 *                     address: "123 Main St"
 *                   products:
 *                     - id: 101
 *                       name: "Product A"
 *                       price: "50.00"
 *                       image: "product_a.jpg"
 *                     - id: 102
 *                       name: "Product B"
 *                       price: "30.00"
 *                       image: "product_b.jpg"
 *                 - id: 2
 *                   orderNo: "ORD124"
 *                   status: "pending"
 *                   totalPrice: "75.00"
 *                   createdAt: "2024-01-09T10:45:23.456Z"
 *                   user:
 *                     id: 2
 *                     username: "user1"
 *                     phone: "9876543210"
 *                     address: "456 Oak St"
 *                   products:
 *                     - id: 103
 *                       name: "Product C"
 *                       price: "25.00"
 *                       image: "product_c.jpg"
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   orderNo:
 *                     type: string
 *                   status:
 *                     type: string
 *                   totalPrice:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       username:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         name:
 *                           type: string
 *                         price:
 *                           type: string
 *                         image:
 *                           type: string
 *       400:
 *         description: Bad request or error during order retrieval.
 */
export const getAllOrders = async (req, res) => {
    try {
        const userDetail = req.user;

        const user = await User.findUserById(userDetail.id);

        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not allowed to get all orders." });
        }

        const orders = await Order.getAllOrders();

        return res.status(200).json({ orders });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

/**
 * @swagger
 * /order/getPendingDataCount:
 *   get:
 *     summary: Get the count of pending orders.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Pending order count retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               pendingOrderCount: 5
 *             schema:
 *               type: object
 *               properties:
 *                 pendingOrderCount:
 *                   type: number
 *       400:
 *         description: Bad request or error during pending order count retrieval.
 */
export const getPendingDataCount = async (req, res) => {
    try {
        const pendingOrderCount = await Order.getPendingOrderCount();

        return res.status(200).json({ pendingOrderCount });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


/**
 * @swagger
 * /order/getUserPendingOrder:
 *   get:
 *     summary: Get the pending order for the authenticated user.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Pending order retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Pending order retrieved successfully."
 *               userDetails:
 *                 userFullName: "John Doe"
 *                 address: "123 Main St"
 *                 phone: "1234567890"
 *                 email: "john@example.com"
 *               order:
 *                 id: 1
 *                 orderNo: "ORD123"
 *                 status: "pending"
 *                 totalPrice: "75.00"
 *                 createdAt: "2024-01-09T10:45:23.456Z"
 *                 products:
 *                   - id: 103
 *                     name: "Product C"
 *                     price: "25.00"
 *                     image: "product_c.jpg"
 *                     quantity: 2
 *       400:
 *         description: Bad request or error during pending order retrieval.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error retrieving pending order. Please try again."
 */
export const getUserPendingOrder = async (req, res) => {
    try {
        const userDetail = req.user;

        const user = await User.findUserById(userDetail.id);

        const order = await Order.getPendingOrderByUserId(user.id);

        if (!order) {
            return res.status(200).json({ message: "No pending order found.", order: null });
        }

        const orderDetails = await OrderDetail.getOrderDetailsByOrderId(order.id);

        getProductQuantityWithOrderDetail(order, orderDetails);

        return res.status(200).json({
            message: "Pending order retrieved successfully.",
            userDetails: {
                userFullName: user.firstName + " " + user.lastName,
                address: user.address,
                phone: user.phone,
                email: user.email,
            },
            order: order,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}