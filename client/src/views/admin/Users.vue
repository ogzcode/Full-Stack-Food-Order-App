<template>
    <div class="p-10 bg-slate-50 min-h-screen">
        <DataTable>
            <template v-slot:headerActions>

            </template>

            <template v-slot:name="{ data }">
                {{ data.username }}
            </template>
            <template v-slot:email="{ data }">
                {{ data.email }}
            </template>
            <template v-slot:phone="{ data }">
                {{ data.phone || "None" }}
            </template>
            <template v-slot:order-count="{ data }">
                {{ data.orderCount }}
            </template>
            <template v-slot:created-at="{ data }">
                {{ data.createdAt }}
            </template>
            <template v-slot:actions="{ data }">
                <IconBtn icon-name="trash-fill" severity="red" tooltip="Delete" @click="handleClickDeleteUser(data.id)" />
            </template>
        </DataTable>

        <Dialog headerTitle="Delete User" :show="deleteDialog" @close="handleChangeDeleteDialaog" submit-text="Delete"
            submit-type="danger" :on-submit="handleDeleteUser">
            <template v-slot:body>
                <p class="text text-slate-500">Are you sure you want to delete this user?</p>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useDataTable } from "../../stores/useDataTable";
import { useToastStore } from "../../stores/toast";

import DataTable from "../../components/datatable/DataTable.vue"
import Dialog from "../../components/Dialog.vue"
import IconBtn from "../../components/IconBtn.vue";
import { userHeader } from "./data/userHeader"
import { getAllUsers, deleteUserById } from "../../services/request/UserRequest.js"
import { formatDateAndGetData } from "../../utils/util";

const dataTableStore = useDataTable();
const toastStore = useToastStore();

const deleteDialog = ref(false);
const deleteUserId = ref(null);

const handleChangeDeleteDialaog = (value) => {
    deleteDialog.value = value;
}

const handleClickDeleteUser = (id) => {
    deleteUserId.value = id;
    handleChangeDeleteDialaog(true);
}

const handleDeleteUser = () => {
    try {
        deleteUserById(deleteUserId.value).then((res) => {
            toastStore.showToast("success", res.data.message);
            getAllUsers().then((res) => {
                dataTableStore.init(formatDateAndGetData((res.data.users)), userHeader);
            })
        })
    } catch (error) {
        toastStore.showToast("error", error.message);
    }

    handleChangeDeleteDialaog(false);
    deleteUserId.value = null;
}

onUnmounted(() => {
    dataTableStore.reset();
})

onMounted(() => {
    try {
        getAllUsers().then((res) => {
            dataTableStore.init(formatDateAndGetData((res.data.users)), userHeader);
        })
    } catch (error) {
        toastStore.showToast("error", error.message);
    }
})
</script>

<style scoped></style>