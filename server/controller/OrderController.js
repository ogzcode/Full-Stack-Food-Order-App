import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

export const createOrder = async (req, res) => {
    const { products } = req.body;
    const userDetail = req.user;

    const user = await User.findUserById(userDetail.id);

    if (user.role !== "user") {
        return res.status(400).json({ message: "You are not allowed to create order." });
    }

    let totalPrice = 0;
    const productList = []

    for (let product of products) {
        let item = await Product.getProductById(product.id);
        productList.push({id : item.id});
        totalPrice += parseInt(item.price) * product.quantity;
    }

    await User.setOrderCount(user.id, user.orderCount + 1);
    await Order.createOrder({ userId: user.id, totalPrice: String(totalPrice), products: productList });

    return res.status(200).json({ message: "Order created successfully." });
}

export const getOrders = async (req, res) => {
    const userDetail = req.user;

    const user = await User.findUserById(userDetail.id);

    if (user.role !== "user") {
        return res.status(400).json({ message: "You are not allowed to get orders." });
    }

    const orders = await Order.getOrdersByUserId(user.id);

    return res.status(200).json({ orders });
}