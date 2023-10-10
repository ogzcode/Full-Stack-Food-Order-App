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
                <button
                    @click="handleCompleteDialog(true)"
                    class="border border-emerald-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-emerald-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                        <path
                            d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>
                </button>
                <button
                    class="border border-red-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-red-500"
                    @click="handleChangeDeleteDialaog(true)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </button>
            </template>
        </DataTable>

        <Dialog headerTitle="Delete User" :show="deleteDialog" @close="handleChangeDeleteDialaog" submit-text="Delete"
            submit-type="danger">
            <template v-slot:body>
                <p class="text text-slate-500">Are you sure you want to cancel this order?</p>
            </template>
        </Dialog>
        <Dialog headerTitle="Complete the order" :show="completeDialog" @close="handleCompleteDialog" submit-text="Complete"
            submit-type="success">
            <template v-slot:body>
                <p class="text text-slate-500">Are you sure you want to complete the order?</p>
            </template>
        </Dialog>
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
import { orders } from "./data/orders"
import { orderHeader } from "./data/orderHeader"
import Select from "../../components/Select.vue";
import image1 from "../../assets/images/landing/image-1.png";
import { getOrderStatusStyle } from "./utils/util.js";

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