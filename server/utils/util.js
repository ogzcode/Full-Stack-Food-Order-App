export const getUserExtraData = (user) => {
    const { firstName, lastName, phone, address } = user
    return firstName !== "" && lastName !== "" && phone !== "" && address !== ""
}

export const getProductQuantityWithOrderDetail = (order, orderDetails) => {
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
}