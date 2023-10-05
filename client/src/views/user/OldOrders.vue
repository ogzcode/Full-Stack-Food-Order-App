<template>
    <div class="p-10 bg-slate-50 min-h-screen">
        <DataTable>
            <template v-slot:headerActions>
                <Select v-model="selectedStatus" :options="selectedOption" />
            </template>

            <template v-slot:no="{ data }">
                {{ data.no }}
            </template>
            <template v-slot:name="{ data }">
                {{ data.name }}
            </template>
            <template v-slot:phone="{ data }">
                {{ data.phone }}
            </template>
            <template v-slot:address="{ data }">
                {{ data.address }}
            </template>
            <template v-slot:create-time="{ data }">
                {{ data.createTime }}
            </template>
            <template v-slot:total="{ data }">
                {{ data.total }}
            </template>
            <template v-slot:status="{ data }">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium tracking-wide"
                    :class="[getOrderStatusStyle(data.status)]">
                    {{ data.status }}
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
/*
DataTable da görünecek veriler:
    phone: "123456789",
    address: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    createTime: "2021-08-20 12:00",
    total: "$24.90",
    status: "Completed"
*/
import { onMounted, ref, watch } from "vue";
import { useDataTable } from "../../stores/useDataTable";
import DataTable from "../../components/datatable/DataTable.vue"
import Dialog from "../../components/Dialog.vue"
import { orders } from "../admin/data/orders"
import { orderHeader } from "../admin/data/orderHeader"
import Select from "../../components/Select.vue";
import image1 from "../../assets/images/landing/image-1.png";
import { getOrderStatusStyle } from "../admin/utils/util.js";

const dataTableStore = useDataTable();

const deleteDialog = ref(false);
const selectedStatus = ref('All');
const orderDetailsDialog = ref(false);
const completeDialog = ref(false);

const selectedOption = [
    { label: 'All', value: 'All' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Canceled', value: 'Canceled' }
]

const handleChangeDeleteDialaog = (value) => {
    deleteDialog.value = value;
}

const handleOrderDialog = (value) => {
    orderDetailsDialog.value = value;
}

const handleCompleteDialog = (value) => {
    completeDialog.value = value;
}


onMounted(() => {
    dataTableStore.init(orders, orderHeader);
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
}

</style>