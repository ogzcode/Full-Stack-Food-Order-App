import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import OrderDetail from "../model/OrderDetail.js";

export const createOrder = async (req, res) => {
    const { products } = req.body;
    const userDetail = req.user;

    const user = await User.findUserById(userDetail.id);

    if (user.role !== "user") {
        return res.status(400).json({ message: "You are not allowed to create order." });
    }

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

export const getOrders = async (req, res) => {
    const userDetail = req.user;

    const user = await User.findUserById(userDetail.id);

    if (user.role !== "user") {
        return res.status(400).json({ message: "You are not allowed to get orders." });
    }

    const orders = await Order.getOrdersByUserId(user.id, { sort: "desc" });

    return res.status(200).json({ orders });
}

export const getOrderDetails = async (req, res) => {
    const userDetail = req.user;
    const { orderId } = req.params;

    const user = await User.findUserById(userDetail.id);

    if (user.role !== "user") {
        return res.status(400).json({ message: "You are not allowed to get order details." });
    }

    const order = await Order.getOrderById(parseInt(orderId));
    const orderDetails = await OrderDetail.getOrderDetailsByOrderId(order.id);

    for (let orderDetail of orderDetails) {
        let products = order.products.map((product) => {
            if (product.id === orderDetail.productId) {
                return { ...product, quantity: orderDetail.quantity };
            }
            else {
                return product;
            }
        });

        order.products = products;
    }

    return res.status(200).json({ products: order.products });
}

export const changeOrderStatus = async (req, res) => {
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

export const deleteAllOrders = async (req, res) => {
    const userDetail = req.user;

    const orderDetails = await OrderDetail.deleteAllOrderDetails();
    const orders = await Order.deleteAllOrders();



    return res.status(200).json({ message: "All orders deleted successfully." });
}

export const getAllOrders = async (req, res) => {
    const userDetail = req.user;

    const user = await User.findUserById(userDetail.id);

    if (user.role !== "admin") {
        return res.status(400).json({ message: "You are not allowed to get all orders." });
    }

    const orders = await Order.getAllOrders();

    return res.status(200).json({ orders });
}