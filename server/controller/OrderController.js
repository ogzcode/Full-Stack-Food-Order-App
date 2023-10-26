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
        productList.push({id : item.id });
        totalPrice += parseInt(item.price) * product.quantity;
        orderDetail.push({productId: item.id, quantity: product.quantity});
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

    const orders = await Order.getOrdersByUserId(user.id);
    
    for (let order of orders) {
        const orderDetails = await OrderDetail.getOrderDetailsByOrderId(order.id);
        order.details = orderDetails;
    }

    return res.status(200).json({ orders });
}

export const deleteAllOrders = async (req, res) => {
    const userDetail = req.user;

    await Order.deleteAllOrders();

    return res.status(200).json({ message: "All orders deleted successfully." });
}