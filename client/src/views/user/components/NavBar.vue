<template>
    <header class="min-h-[5rem] flex justify-between items-center px-12 border-b">
        <div class="flex items-center gap-20">
            <h1 class="text-4xl font-bold tracking-wide text-slate-800">Food<span class="text-orange-600">-ER</span></h1>
            <nav>
                <router-link :to="{ name: 'UserProducts' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('UserProducts')]">Products</router-link>
                <router-link :to="{ name: 'OldOrders' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('OldOrders')]">Old Orders</router-link>
                <router-link :to="{ name: 'Settings' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Settings')]">Settings</router-link>
            </nav>
        </div>
        <div class="flex items-center">
            <button @click="handleOpen"
                class="ring-animation bg-orange-600 border border-orange-600 text-white px-3 py-3 rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    class="bi bi-basket3-fill" viewBox="0 0 16 16">
                    <path
                        d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
                </svg>
            </button>
            <button @click="logout"
                class="font-medium text-sm tracking-wide mx-8 px-6 py-2 rounded border border-red-600 text-red-600 flex items-center logout-btn">
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-box-arrow-right relative left-2" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
            </button>
        </div>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAuth } from "../../../stores/auth";

const $route = useRoute();
const authStore = useAuth();

const isRouteActive = (routeName) => {
    return routeName === $route.name ? "text-orange-600" : "text-slate-800";
}

const emits = defineEmits(['openDialog']);

const logout = () => {
    authStore.logout();
}

const handleOpen = () => {
    emits('openDialog', true);
}

</script>

<style scoped>
.active-link {
    color: #F97316;
}

.ring-animation {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.9);
    }

    50% {
        box-shadow: 0 0 0 10px rgba(255, 165, 0, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
    }
}
</style>