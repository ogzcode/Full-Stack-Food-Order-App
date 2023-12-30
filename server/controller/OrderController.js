import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import OrderDetail from "../model/OrderDetail.js";
import { getProductQuantityWithOrderDetail } from "../utils/util.js";

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

export const getPendingDataCount = async (req, res) => {
    try {
        const pendingOrderCount = await Order.getPendingOrderCount();

        return res.status(200).json({ pendingOrderCount });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

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