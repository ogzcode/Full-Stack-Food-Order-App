import { request } from '../apiConfig';

export const createOrder = async (orderData) => {
    return await request.post('/order/createOrder', orderData);
}

export const getOrders = async () => {
    return await request.get('/order/getOrders');
}

export const getAllOrders = async () => {
    return await request.get('/order/getAllOrders');
}

export const getOrderDetails = async (orderId) => {
    return await request.get(`/order/getOrderDetails/${orderId}`);
}

export const changeOrderStatus = async (orderData) => {
    return await request.put('/order/changeOrderStatus', orderData);
}

export const getPendingOrders = async () => {
    return await request.get('/order/getPendingDataCount');
}

export const getUserPendingOrder = async () => {
    return await request.get('/order/getUserPendingOrder');
}