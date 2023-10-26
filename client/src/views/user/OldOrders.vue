<template>
    <div class="p-10 bg-slate-50 min-h-screen">
        <DataTable>
            <template v-slot:headerActions>
                <Select v-model="selectedStatus" :options="selectedOption" />
            </template>

            <template v-slot:order-no="{ data }">
                {{ data.orderNo }}
            </template>
            <template v-slot:created-at="{ data }">
                {{ data.createdAt }}
            </template>
            <template v-slot:total-price="{ data }">
                {{ data.totalPrice }}
            </template>
            <template v-slot:status="{ data }">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium tracking-wide"
                    :class="[getOrderStatusStyle(data.status)]">
                    {{ getUpdedatedStatus(data.status) }}
                </span>
            </template>
            <template v-slot:actions="{ data }">
                <button @click="handleOrderDialog(true)"
                    class="border border-violet-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-violet-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                </button>
                <template v-if="data.status === 'pending'">
                    <button
                        class="border border-red-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-red-500 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </button>
                </template>
            </template>
        </DataTable>

        <Dialog header-title="Order Details" :show="orderDetailsDialog" @close="handleOrderDialog"
            :submit-is-disabled="true">
            <template v-slot:body>
                <div class="max-h-[400px] overflow-y-auto order-scroll pr-2">
                    <div class="border border-orange-500 rounded flex justify-between items-center mb-4">
                        <div class="flex items-center gap-x-2 h-20">
                            <img :src="image1" alt="" class="w-20" />
                            <div>
                                <p class="text-slate-800 text-lg font-medium">Name</p>
                                <p class="text-slate-600 font-light text-sm">X 2</p>
                            </div>
                        </div>
                        <p class="text-orange-500 text-xl font-medium mr-4">$24.90</p>
                    </div>
                    <div class="border border-orange-500 rounded flex justify-between items-center mb-4">
                        <div class="flex items-center gap-x-2 h-20">
                            <img :src="image1" alt="" class="w-20" />
                            <div>
                                <p class="text-slate-800 text-lg font-medium">Name</p>
                                <p class="text-slate-600 font-light text-sm">X 2</p>
                            </div>
                        </div>
                        <p class="text-orange-500 text-xl font-medium mr-4">$24.90</p>
                    </div>
                    <div class="border border-orange-500 rounded flex justify-between items-center mb-4">
                        <div class="flex items-center gap-x-2 h-20">
                            <img :src="image1" alt="" class="w-20" />
                            <div>
                                <p class="text-slate-800 text-lg font-medium">Name</p>
                                <p class="text-slate-600 font-light text-sm">X 2</p>
                            </div>
                        </div>
                        <p class="text-orange-500 text-xl font-medium mr-4">$24.90</p>
                    </div>
                    <div class="border border-orange-500 rounded flex justify-between items-center mb-4">
                        <div class="flex items-center gap-x-2 h-20">
                            <img :src="image1" alt="" class="w-20" />
                            <div>
                                <p class="text-slate-800 text-lg font-medium">Name</p>
                                <p class="text-slate-600 font-light text-sm">X 2</p>
                            </div>
                        </div>
                        <p class="text-orange-500 text-xl font-medium mr-4">$24.90</p>
                    </div>
                    <div class="border border-orange-500 rounded flex justify-between items-center mb-4">
                        <div class="flex items-center gap-x-2 h-20">
                            <img :src="image1" alt="" class="w-20" />
                            <div>
                                <p class="text-slate-800 text-lg font-medium">Name</p>
                                <p class="text-slate-600 font-light text-sm">X 2</p>
                            </div>
                        </div>
                        <p class="text-orange-500 text-xl font-medium mr-4">$24.90</p>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useDataTable } from "../../stores/useDataTable";
import DataTable from "../../components/datatable/DataTable.vue"
import Dialog from "../../components/Dialog.vue"
import { orderHeader } from "../admin/data/orderHeader"
import Select from "../../components/Select.vue";
import image1 from "../../assets/images/landing/image-1.png";
import { getOrderStatusStyle } from "../admin/utils/util.js";
import { getOrders } from "../../services/requestServices";
import { useToastStore } from "../../stores/toast";
import { formatDateAndGetData } from "../admin/utils/util.js"
import { selectedOption } from "./utils/util";
import { getUpdedatedStatus } from "./utils/util";

const dataTableStore = useDataTable();
const toastStore = useToastStore();

const deleteDialog = ref(false);
const selectedStatus = ref('all');
const orderDetailsDialog = ref(false);

const handleChangeDeleteDialaog = (value) => {
    deleteDialog.value = value;
}

const handleOrderDialog = (value) => {
    orderDetailsDialog.value = value;
}


onMounted(() => {
    getOrders()
        .then((res) => {
            dataTableStore.init(formatDateAndGetData(res.data.orders), orderHeader);
        })
        .catch((err) => {
            toastStore.addToast("error", err.message);
        });
})

watch(selectedStatus, (value) => {
    dataTableStore.filterByStatus(value);
}) 
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
}</style>