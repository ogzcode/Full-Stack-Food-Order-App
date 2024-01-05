<template>
    <header class="min-h-[5rem] flex justify-between items-center px-12 border-b">
        <div class="flex items-center gap-4">
            <h1 class="text-4xl font-bold tracking-wide text-slate-800">Food<span class="text-orange-600">-ER</span></h1>
            <nav>
                <router-link :to="{ name: 'Orders' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Orders')]">Orders</router-link>
                <router-link :to="{ name: 'Products' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Products')]">Products</router-link>
                <router-link :to="{ name: 'Users' }" class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Users')]">Users</router-link>
            </nav>
        </div>
        <div class="flex items-center">
            <div
                class="border border-orange-600 text-orange-600 font-medium text-xs p-2 rounded-full tracking-wide relative">
                <Icons name="bell-fill" :size="20" />
                <span
                    class="absolute -top-2 -right-2 text-white bg-orange-600 rounded-full flex justify-center items-center text-xs w-6 h-6 ">
                    {{ orderCount }}
                </span>
            </div>
            <button @click="handlePasswordDialog"
                class="border mx-4 border-slate-600 text-slate-700 p-2 rounded-full cursor-pointer">
                <Icons name="settings" :size="20" />
            </button>
            <button @click="logout"
                class="font-medium text-sm tracking-wide px-4 py-2 rounded border border-red-600 text-red-600 flex items-center logout-btn">
                <span>Logout</span>
                <Icons name="box-arrow-right" :style="'ml-2'" :size="20" />
            </button>
        </div>
    </header>

    <Dialog :show="updatePasswordDialog" @close="handlePasswordDialog" header-title="Update Password" submit-text="Update"
        submit-type="success" @submit="handleSubmit" :submit-is-disabled="(oldPassword === '' || newPassword === '')">
        <template #body>
            <div class="flex flex-col gap-4">
                <FormInput :value="oldPassword" v-model:value="oldPassword" label="Old Password" />
                <FormInput :value="newPassword" v-model:value="newPassword" label="New Password" />
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from "@tanstack/vue-query";

import Icons from '../../../components/Icons.vue';
import Dialog from '../../../components/Dialog.vue';
import FormInput from '../../auth/components/FormInput.vue';

import { useAuth } from "../../../stores/auth";
import { useToastStore } from '../../../stores/toast';

import { updateAdminPassword } from '../../../services/request/UserRequest';
import { getPendingOrders } from '../../../services/request/OrderRequest';

const $route = useRoute();
const authStore = useAuth();
const toastStore = useToastStore();

const updatePasswordDialog = ref(false);
const newPassword = ref("");
const oldPassword = ref("");

const handlePasswordDialog = () => {
    updatePasswordDialog.value = !updatePasswordDialog.value;
}

const { data: queryData } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: getPendingOrders,
    refetchInterval: 30000,
})

const orderCount = ref(0);

const isRouteActive = (routeName) => {
    return routeName === $route.name ? "text-orange-600" : "text-slate-800";
}

const logout = () => {
    authStore.logout();
}

watch(queryData, (newData, oldData) => {
    const inner = newData?.data?.pendingOrderCount;

    if (inner) {
        orderCount.value = inner;
    }
});

const handleSubmit = () => {
    const data = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
    }

    updateAdminPassword(data)
        .then((res) => {
            toastStore.showToast("success", "Password updated successfully")


        })
        .catch((err) => {
            console.log(err);
            toastStore.showToast("error", "Something went wrong")
        })

    handlePasswordDialog();
    oldPassword.value = "";
    newPassword.value = "";
}


</script>

<style scoped>
.logout-btn svg {
    transition: all 0.3s ease-in-out;
}

.logout-btn:hover svg {
    left: 16px;
}

.active-link {
    color: #F97316;
}
</style>