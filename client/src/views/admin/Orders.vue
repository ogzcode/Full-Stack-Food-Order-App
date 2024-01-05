<template>
    <div class="p-10 bg-slate-50 min-h-screen">
        <DataTable>
            <template v-slot:headerActions>
                <Select v-model="selectedStatus" :options="selectedOption" />
            </template>

            <template v-slot:orderNo="{ data }">
                {{ data?.orderNo }}
            </template>
            <template v-slot:username="{ data }">
                {{ data?.user?.username }}
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
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                    :class="[getOrderStatusStyle(data?.status)]">
                    {{ getUpdatedStatus(data.status) }}
                </span>
            </template>
            <template v-slot:actions="{ data }">
                <IconBtn icon-name="eye-fill" severity="violet" tooltip="View" @click="handleOrderDetails(data?.id)" />
                <SplitButton v-if="data.status !== 'cancelled' && data.status !== 'completed'">
                    <template v-slot:actions>
                        <button @click="handleSetOrder({ orderId: data?.id, status: 'prepared' })"
                            class="flex items-center text-left text-blue-500 border-b hover:bg-blue-500 hover:text-white px-4 py-2 text-sm font-semibold">
                            <Icons name="clock" :style="'mr-2'" />
                            <span class="pb-px">Prepared</span>
                        </button>
                        <button @click="handleSetOrder({ orderId: data?.id, status: 'cargo' })"
                            class="flex items-center text-left text-purple-500 border-b hover:bg-purple-500 hover:text-white px-4 py-2 text-sm font-semibold">
                            <Icons name="truck" :style="'mr-2'" />
                            <span class="pb-px">Cargo</span>
                        </button>
                        <button @click="handleSetOrder({ orderId: data?.id, status: 'completed' })"
                            class="flex items-center text-left text-emerald-500 border-b hover:bg-emerald-500 hover:text-white px-4 py-2 text-sm font-semibold">
                            <Icons name="hand-thumbs-up" :style="'mr-2'" />
                            <span class="pb-px">Completed</span>
                        </button>
                        <button @click="handleSetOrder({ orderId: data?.id, status: 'cancelled' })"
                            class="flex items-center text-left text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 text-sm font-semibold">
                            <Icons name="trash" :style="'mr-2'" />
                            <span class="pb-px">Cancelled</span>
                        </button>

                    </template>
                </SplitButton>
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
import SplitButton from "../../components/SplitButton.vue";
import Icons from "../../components/Icons.vue";

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
    } else if (value.status === 'cancelled') {
        handleChangeDeleteDialaog(true);
    }
    else {
        handleChangeStatus();
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

<style scoped></style>