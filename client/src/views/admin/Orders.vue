<template>
    <div class="p-10 bg-slate-50 min-h-screen">
        <DataTable>
            <template v-slot:headerActions>
                <Select v-model="selectedStatus" :options="selectedOption" />
            </template>

            <template v-slot:orderNo="{ data }">
                {{ data?.orderNo }}
            </template>
            <template v-slot:name="{ data }">
                {{ data?.user?.name }}
            </template>
            <template v-slot:phone="{ data }">
                {{ data?.user?.phone }}
            </template>
            <template v-slot:address="{ data }">
                {{ data?.user?.address }}
            </template>
            <template v-slot:createdAt="{ data }">
                {{ data?.createdAt }}
            </template>
            <template v-slot:totalPrice="{ data }">
                <span>
                    {{ convertCurrncy(data?.totalPrice) }}
                </span>
            </template>
            <template v-slot:status="{ data }">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium tracking-wide"
                    :class="[getOrderStatusStyle(data?.status)]">
                    {{ getUpdatedStatus(data.status) }}
                </span>
            </template>
            <template v-slot:actions="{ data }">
                <IconBtn icon-name="eye-fill" severity="violet" tooltip="View"
                    @click="handleOrderDetails(data?.id)" />
                <template v-if="data.status === 'pending'">
                    <IconBtn icon-name="hand-thumbs-up-fill" severity="emerald" tooltip="Complete"
                        @click="handleSetOrder({ orderId: data?.id, status: 'completed' })" />
                    <IconBtn icon-name="trash-fill" severity="red" tooltip="Cancel"
                        @click="handleSetOrder({ orderId: data?.id, status: 'cancelled' })" />
                </template>
            </template>
        </DataTable>

        <Dialog headerTitle="Cancel Order" :show="deleteDialog" @close="handleChangeDeleteDialaog" submit-text="Delete"
            submit-type="danger" @submit="handleChangeStatus">
            <template v-slot:body>
                <p class="text text-slate-500">Are you sure you want to cancel this order?</p>
            </template>
        </Dialog>

        <Dialog headerTitle="Complete the order" :show="completeDialog" @close="handleCompleteDialog" submit-text="Complete"
            submit-type="success" @submit="handleChangeStatus">
            <template v-slot:body>
                <p class="text text-slate-500">Are you sure you want to complete the order?</p>
            </template>
        </Dialog>

        <Dialog header-title="Order Details" :show="orderDetailsDialog" @close="handleOrderDialog" :submit-show="false">
            <template v-slot:body>
                <DetailsDialogBody />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

import { useDataTable } from "../../stores/useDataTable";
import { useOrderStore } from "../../stores/order";
import { useToastStore } from "../../stores/toast";

import DataTable from "../../components/datatable/DataTable.vue"
import Dialog from "../../components/Dialog.vue"
import Select from "../../components/Select.vue";
import DetailsDialogBody from "../user/components/DetailsDialogBody.vue";
import IconBtn from "../../components/IconBtn.vue";

import { orderHeader } from "./data/orderHeader";

import { changeOrderStatus, getAllOrders, getOrderDetails } from "../../services/request/OrderRequest.js";
import { formatDateAndGetData, getOrderStatusStyle, convertCurrncy, selectedOption, getUpdatedStatus } from "../../utils/util";

const dataTableStore = useDataTable();
const toastStore = useToastStore();
const orderStore = useOrderStore();

const deleteDialog = ref(false);
const selectedStatus = ref('all');
const orderDetailsDialog = ref(false);
const completeDialog = ref(false);
const selectedOrder = ref(null);

const handleChangeDeleteDialaog = (value) => {
    deleteDialog.value = value;
}

const handleOrderDialog = (value) => {
    orderDetailsDialog.value = value;
}

const handleOrderDetails = (value) => {
    handleOrderDialog(true);

    getOrderDetails(value)
        .then((res) => {
            orderStore.setOrders(res.data.products);
        })
        .catch((err) => {
            toastStore.showToast("error", err.message);
        });
}

const handleCompleteDialog = (value) => {
    completeDialog.value = value;
}

const handleSetOrder = (value) => {
    selectedOrder.value = value;

    if (value.status === 'completed') {
        handleCompleteDialog(true);
    } else {
        handleChangeDeleteDialaog(true);
    }

}

onUnmounted(() => {
    dataTableStore.reset();
})

onMounted(() => {
    getAllOrders()
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
    changeOrderStatus({ orderId: selectedOrder.value.orderId, status: selectedOrder.value.status })
        .then((res) => {
            toastStore.showToast("success", res.data.message);
            getAllOrders()
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

    handleChangeDeleteDialaog(false);
    handleCompleteDialog(false);
    selectedOrder.value = null;
}
</script>

<style scoped>
</style>