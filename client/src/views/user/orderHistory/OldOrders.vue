<template>
    <div class="p-10 bg-white min-h-screen">
        <h1 class="text-zinc-700 text-2xl font-semibold">Orders History</h1>

        <template v-if="orderHistory?.length > 0">
            <div class="flex gap-y-16 flex-wrap justify-around items-center mt-6">
                <template v-for="(order, i) in orderHistory" :key="i">
                    <OrderHistoryItem :order="order" @onOpenDialog="handleOrderDialog" />
                </template>
            </div>
        </template>
        <template v-else>
            <Message />
        </template>
        <Dialog header-title="Order Details" :show="orderDetailsDialog" @close="handleOrderDialog" :footer-show="false">
            <template v-slot:body>
                <DialogProductBody :order-details="selectedOrderDetails" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useToastStore } from "../../../stores/toast";
import { getOrders, getOrderDetails } from "../../../services/request/OrderRequest.js";

import Dialog from "../../../components/Dialog.vue"
import Message from "./components/Message.vue";
import DialogProductBody from "./components/DialogProductBody.vue";
import OrderHistoryItem from "./components/OrderHistoryItem.vue";

const toastStore = useToastStore()
const orderHistory = ref(null)
const orderDetailsDialog = ref(false)
const selectedOrderDetails = ref(null)

const handleOrderDialog = (orderId) => {
    if (orderId) {
        getOrderDetails(orderId)
            .then((res) => {
                selectedOrderDetails.value = res.data.products
                orderDetailsDialog.value = true
            })
            .catch((err) => {
                toastStore.showToast("error", err.message);
            });
    } else {
        orderDetailsDialog.value = false
    }
}

onMounted(() => {
    getOrders()
        .then((res) => {
            orderHistory.value = res.data.orders
        })
        .catch((err) => {
            toastStore.showToast("error", err.message);
        });
})

</script>

<style scoped>

</style>