import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("order", () => {
    const orders = ref([]);

    const setOrders = (newOrders) => {
        orders.value = [...newOrders];
    };

    const getProductById = (id) => {
        return orders.value.find((order) => order.id === id);
    };

    const addOrder = (newOrder) => {
        const orderIndex = orders.value.findIndex((order) => order.id === newOrder.id);

        if (orderIndex !== -1) {
            orders.value[orderIndex].quantity++;
        }
        else {
            orders.value.push({ ...newOrder, quantity: 1 });
        }
    };

    const deleteOrder = (id) => {
        const orderIndex = orders.value.findIndex((order) => order.id === id);

        if (orderIndex !== -1 && orders.value[orderIndex].quantity > 1) {
            orders.value[orderIndex].quantity--;
        }
        else if (orderIndex !== -1 && orders.value[orderIndex].quantity === 1) {
            orders.value.splice(orderIndex, 1);
        }
    };

    const searchOrder = (query) => {
        return orders.value.filter((order) =>
            order.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const updateOrder = (updatedOrder) => {
        const index = orders.value.findIndex((order) => order.id === updateOrder.id);
        orders.value[index] = updatedOrder;
    };

    const productIsHere = (id) => {
        const index = orders.value.findIndex((order) => order.id === id);
        return index !== -1;
    };

    const getTotalPrice = () => {
        let totalPrice = 0;

        for (let order of orders.value) {
            totalPrice += order.price * order.quantity;
        }

        return totalPrice;
    };

    const getOrderQuantity = (id) => {
        const index = orders.value.findIndex((order) => order.id === id);

        if (index !== -1) {
            return orders.value[index].quantity;
        }

        return 0;
    }

    return {
        orders,
        setOrders,
        addOrder,
        deleteOrder,
        searchOrder,
        updateOrder,
        productIsHere,
        getProductById,
        getTotalPrice,
        getOrderQuantity,
    };
});