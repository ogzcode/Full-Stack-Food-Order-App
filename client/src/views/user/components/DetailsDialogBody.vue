<template>
    <div class="max-h-[400px] overflow-y-auto order-scroll pr-2">
        <template v-if="orderStore.orders.length > 0">
            <div v-for="(product, i) in orderStore.orders" :key="i"
                class="border border-orange-500 rounded flex justify-between items-center mb-4">
                <div class="flex items-center gap-x-2 h-20">
                    <img :src="getImgURL(product.image)" alt="" class="w-20" />
                    <div>
                        <p class="text-slate-800 text-lg font-medium">{{ product.name }}</p>
                        <p class="text-slate-600 font-medium text-xs">X {{ product.quantity }}</p>
                    </div>
                </div>
                <p class="text-orange-500 text-xl font-medium mr-4">${{ parseInt(product.price) *
                    product.quantity }}</p>
            </div>
        </template>
        <template v-else>
            <div class="flex w-full items-center bg-orange-50 border border-orange-200 p-2 text-orange-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                <p class="text-base text-orange-800 ml-4">No product</p>
            </div>
        </template>
    </div>
    <template v-if="orderStore.orders.length > 0">
        <div class="flex justify-end items-center bg-slate-100 rounded p-2 mr-2">
            <p class="text-right text-lg font-medium rounded tracking-wide text-orange-600">Total: ${{
                orderStore.getTotalPrice() }}</p>
        </div>
    </template>
</template>

<script setup>
import { useOrderStore } from "../../../stores/order";

const orderStore = useOrderStore();

const getImgURL = (image) => {
    return "http://localhost:3000/public/docs/" + image;
};

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