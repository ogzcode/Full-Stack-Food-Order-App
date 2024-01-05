<template>
    <div class="p-10 bg-white min-h-screen">
        <h1 class="text-zinc-700 text-2xl font-semibold">Orders History</h1>

        <template v-if="orderHistory?.length > 0">
            <div class="flex gap-y-16 flex-wrap justify-around items-center mt-6">
                <template v-for="(order, i) in getVisibleOrders" :key="i">
                    <OrderHistoryItem :order="order" @onOpenDialog="handleOrderDialog" />
                </template>
            </div>
        </template>
        <template v-else>
            <Message />
        </template>

        <div v-if="orderHistory?.length > 10" class="flex justify-center items-center mt-10">
            <Pagination @on-next-page="handleNextPage" @on-prev-page="handlePrevPage" />
        </div>

        <Dialog header-title="Order Details" :show="orderDetailsDialog" @close="handleOrderDialog" :footer-show="false">
            <template v-slot:body>
                <DialogProductBody :order-details="selectedOrderDetails" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { useToastStore } from "../../../stores/toast";
import { getOrders, getOrderDetails } from "../../../services/request/OrderRequest.js";

import Dialog from "../../../components/Dialog.vue"
import Message from "./components/Message.vue";
import DialogProductBody from "./components/DialogProductBody.vue";
import OrderHistoryItem from "./components/OrderHistoryItem.vue";
import Pagination from "./components/Pagination.vue";

const toastStore = useToastStore()
const orderHistory = ref(null)
const orderDetailsDialog = ref(false)
const selectedOrderDetails = ref(null)
const currentPage = ref(1)

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

const handleNextPage = () => {
    if (currentPage.value === Math.ceil(orderHistory.value.length / 10)) return

    currentPage.value += 1
}

const handlePrevPage = () => {
    if (currentPage.value === 1) return

    currentPage.value -= 1
}

const getVisibleOrders = computed(() => {
    if (!orderHistory.value || orderHistory.value.length === 0) return []

    const start = (currentPage.value - 1) * 10
    const end = start + 10
    return orderHistory?.value.slice(start, end)
})

</script>

<style scoped>

</style>