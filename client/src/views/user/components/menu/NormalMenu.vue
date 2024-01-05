<template>
    <nav class="flex-1">
        <div class="hidden md:flex sm:justify-between items-center">
            <div class="text-base">
                <router-link :to="{ name: 'UserProducts' }"
                    class="md:mx-6 mx-4 font-semibold tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('UserProducts')]">Products</router-link>
                <router-link :to="{ name: 'Order' }"
                    class="md:mx-6 mx-4 font-semibold tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Order')]">Order</router-link>
                <router-link :to="{ name: 'OldOrders' }"
                    class="md:mx-6 mx-4 font-semibold tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('OldOrders')]">Order History</router-link>
                <router-link :to="{ name: 'Settings' }"
                    class="md:mx-6 mx-4 font-semibold tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Settings')]">Settings</router-link>
            </div>
            <div class="flex justify-center">
                <button @click="$emit('openOrderDialog')"
                    class="ring-animation bg-orange-600 border mr-4 border-orange-600 text-white p-3 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-basket3-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
                    </svg>
                </button>
                <button @click="$emit('logout')"
                    class="border border-red-600 flex items-center p-3 lg:px-6 lg:py-2 rounded-full lg:rounded">
                    <span class="text-red-600 font-medium text-sm hidden lg:inline">Logout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        class="bi bi-box-arrow-right lg:ml-2 fill-red-600" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fill-rule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const $route = useRoute();

const isRouteActive = (routeName) => {
    return routeName === $route.name ? "text-orange-600" : "text-slate-800";
}

const emits = defineEmits(['openOrderDialog', 'logout']);
</script>

<style scoped>
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