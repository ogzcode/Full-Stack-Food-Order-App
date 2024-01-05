<template>
    <div class="min-h-screen">
        <NavBar @open-dialog="handleDialog" />
        <RouterView />
        <Dialog header-title="Order Details" :show="orderDialog" @close="handleDialog"
            :submit-is-disabled="!(orderStore.orders.length > 0)" submit-text="Order" submit-type="success"
            :on-submit="handleSubmitOrder">
            <template v-slot:body>
                <div class="max-h-[560px] sm:w-[560px] w-full overflow-y-auto order-scroll pr-2">
                    <template v-if="orderStore.orders.length > 0">
                        <DialogProductBody :order-details="orderStore.orders" />
                    </template>
                    <template v-else>
                        <div class="flex items-center w-full bg-orange-50 border border-orange-200 p-2 text-orange-800 rounded">
                            <Icons name="exclamation-circle-fill" :size="24" :style="'fill-orange-800'" />
                            <p class="text-base text-orange-800 ml-4">No product</p>
                        </div>
                    </template>
                </div>
                <template v-if="orderStore.orders.length > 0">
                    <div class="flex justify-between items-center w-full bg-slate-100 rounded p-2">
                        <router-link :to="{ name: 'Settings' }"
                            class="underline text-xs text-orange-600 tracking-wide">Update contact information</router-link>
                        <p class="text-right text-lg font-bold rounded tracking-wide text-orange-600">Total: ${{
                            orderStore.getTotalPrice() }}</p>
                    </div>
                </template>
            </template>
        </Dialog>
    </div>
    <Footer />
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useToastStore } from '../../stores/toast';
import { useDataTable } from "../../stores/useDataTable"
import { useOrderStore } from '../../stores/order';
import { useProductStore } from '../../stores/product';

import NavBar from './components/NavBar.vue';
import Dialog from '../../components/Dialog.vue';
import Icons from "../../components/Icons.vue";
import Footer from './components/Footer.vue';
import DialogProductBody from './orderHistory/components/DialogProductBody.vue';

import { createOrder } from "../../services/request/OrderRequest.js"


const dataTableStore = useDataTable();
const orderStore = useOrderStore();
const productStore = useProductStore();
const toastStore = useToastStore();

const orderDialog = ref(false);

const handleDialog = (value) => {
    orderDialog.value = value;
}

const handleSubmitOrder = () => {
    const order = {
        products: orderStore.orders.map((product) => {
            return {
                id: product.id,
                quantity: product.quantity
            }
        })
    }

    createOrder(order)
        .then((res) => {
            toastStore.showToast("success", "Order create successfully.");
            orderStore.setOrders([]);
        })
        .catch((err) => {
            toastStore.showToast("error", err.response.data.message);
        })
        
    orderDialog.value = false;
}

onUnmounted(() => {
    dataTableStore.reset();
    orderStore.reset();
    productStore.reset();
});

</script>

<style scoped>
.order-scroll::-webkit-scrollbar {
    width: 5px;
}

.order-scroll::-webkit-scrollbar-track {
    background: #e2e8f0;
}

.order-scroll::-webkit-scrollbar-thumb {
    background: #f97316;
    border-radius: 12px;
}

.order-scroll::-webkit-scrollbar-track {
    border-radius: 10px;
}
</style>