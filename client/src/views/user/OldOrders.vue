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
            <template v-slot:totalPrice="{ data }">
                <span>
                    {{ convertCurrncy(data.totalPrice) }}
                </span>
            </template>
            <template v-slot:status="{ data }">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium tracking-wide"
                    :class="[getOrderStatusStyle(data.status)]">
                    {{ getUpdatedStatus(data.status) }}
                </span>
            </template>
            <template v-slot:actions="{ data }">
                <button @click="handleOrderDetailsDialog(data.id)"
                    class="border border-violet-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-violet-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                </button>
                <template v-if="data.status === 'pending'">
                    <button @click="handleCancelOrder(data.id)"
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

        <Dialog header-title="Order Details" :show="orderDetailsDialog" @close="handleOrderDialog" :submit-show="false">
            <template v-slot:body>
                <DetailsDialogBody />
            </template>
        </Dialog>

        <Dialog header-title="Cancel Order" :show="cancelOrderDialog" @close="handleCancelOrderDialog"
            @submit="handleChangeStatus" submit-text="Delete" submit-type="danger">
            <template v-slot:body>
                <p class="text text-slate-500">Are you sure you want to cancel this order?</p>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useDataTable } from "../../stores/useDataTable";
import DataTable from "../../components/datatable/DataTable.vue"
import Dialog from "../../components/Dialog.vue"
import { orderHeader } from "./utils/util"
import Select from "../../components/Select.vue";
import { getOrders, getOrderDetails, changeOrderStatus } from "../../services/request/OrderRequest.js";
import { useToastStore } from "../../stores/toast";
import { useOrderStore } from "../../stores/order";
import DetailsDialogBody from "./components/DetailsDialogBody.vue";
import { selectedOption, getUpdatedStatus, formatDateAndGetData, getOrderStatusStyle, convertCurrncy } from "../../utils/util";

const dataTableStore = useDataTable();
const toastStore = useToastStore();
const orderStore = useOrderStore();

const selectedStatus = ref('all');
const orderDetailsDialog = ref(false);
const cancelOrderDialog = ref(false);
const cancelOrderId = ref(null);

const handleOrderDialog = (value) => {
    orderDetailsDialog.value = value;

    if (!value) {
        orderStore.setOrders([]);
    }
}

const handleCancelOrderDialog = (value) => {
    cancelOrderDialog.value = value;
}

const handleCancelOrder = (value) => {
    cancelOrderId.value = value;
    handleCancelOrderDialog(true);
}

const handleOrderDetailsDialog = (value) => {
    handleOrderDialog(true);

    getOrderDetails(value)
        .then((res) => {
            orderStore.setOrders(res.data.products);
        })
        .catch((err) => {
            toastStore.showToast("error", err.message);
        });
}


onMounted(() => {
    getOrders()
        .then((res) => {
            dataTableStore.init(formatDateAndGetData(res.data.orders), orderHeader);
        })
        .catch((err) => {
            toastStore.showToast("error", err.message);
        });
})

watch(selectedStatus, (value) => {
    dataTableStore.filterByStatus(value);
})

const handleChangeStatus = () => {
    changeOrderStatus({ orderId: cancelOrderId.value, status: 'cancelled' })
        .then((res) => {
            toastStore.showToast("success", res.data.message);
            getOrders()
                .then((res) => {
                    dataTableStore.init(formatDateAndGetData(res.data.orders), orderHeader);
                })
                .catch((err) => {
                    toastStore.showToast("error", err.message);
                });
        })
        .catch((err) => {
            toastStore.showToast("error", "Order status changed failed.");
        })

    handleCancelOrderDialog(false);
    cancelOrderId.value = null;
}

</script>

<style scoped></style>