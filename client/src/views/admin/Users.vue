<template>
    <div class="p-10 bg-slate-50 min-h-screen">
        <DataTable>
            <template v-slot:headerActions>

            </template>

            <template v-slot:name="{ data }">
                {{ data.name }}
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
                <button
                    class="border border-sky-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-sky-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path
                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                </button>
                <button
                    class="border border-red-500 rounded-full w-10 h-10 inline-flex justify-center items-center text-red-500"
                    @click="handleClickDeleteUser(data.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                </button>
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
import DataTable from "../../components/datatable/DataTable.vue"
import Dialog from "../../components/Dialog.vue"
import { userHeader } from "./data/userHeader"
import { useToastStore } from "../../stores/toast";
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
    dataTableStore.init(formatDateAndGetData([]), []);
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