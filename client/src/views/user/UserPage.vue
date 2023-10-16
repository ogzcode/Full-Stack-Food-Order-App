<template>
    <div>
        <NavBar @open-dialog="handleDialog" />
        <RouterView />
        <Dialog header-title="Order Details" :show="orderDialog" @close="handleDialog" :submit-is-disabled="true"
            submit-text="Order" submit-type="success">
            <template v-slot:body>
                <div class="max-h-[400px] overflow-y-auto order-scroll pr-2">
                    <div v-for="(product, i) in orderStore.orders" :key="i"
                        class="border border-orange-500 rounded flex justify-between items-center mb-4">
                        <div class="flex items-center gap-x-2 h-20">
                            <img :src="getImgURL(product.image)" alt="" class="w-20" />
                            <div>
                                <p class="text-slate-800 text-lg font-medium">{{ product.name }}</p>
                                <p class="text-slate-600 font-medium text-xs">X {{ product.quantity }}</p>
                            </div>
                        </div>
                        <p class="text-orange-500 text-xl font-medium mr-4">${{ product.price }}</p>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOrderStore } from '../../stores/order';
import NavBar from './components/NavBar.vue';
import Dialog from '../../components/Dialog.vue';

const orderStore = useOrderStore();

const orderDialog = ref(false);

const handleDialog = (value) => {
    orderDialog.value = value;
}

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