<template>
    <header class="min-h-[5rem] flex justify-between items-center px-12 border-b">
        <div class="flex items-center gap-20">
            <h1 class="text-4xl font-bold tracking-wide text-slate-800">Food<span class="text-orange-600">-ER</span></h1>
            <nav>
                <router-link :to="{ name: 'Orders' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Orders')]">Orders</router-link>
                <router-link :to="{ name: 'Products' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Products')]">Products</router-link>
                <router-link :to="{ name: 'Users' }"
                    class="mx-8 font-medium tracking-wide hover:text-orange-600 transition"
                    :class="[isRouteActive('Users')]">Users</router-link>
            </nav>
        </div>
        <div class="flex items-center">
            <div class="border border-orange-600 text-orange-600 font-medium text-xs px-4 py-2 rounded-full tracking-wide relative">
                Orders
                <span class="absolute -top-2 -right-2 text-white bg-orange-600 rounded-full flex justify-center items-center text-xs w-6 h-6 ">2</span>
            </div>
            <a class="font-medium text-sm tracking-wide mx-8 px-6 py-2 rounded border border-red-600 text-red-600 flex items-center logout-btn"
                href="#">
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-box-arrow-right relative left-2" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg></a>
        </div>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router';

const $route = useRoute();

const isRouteActive = (routeName) => {
    return routeName === $route.name ? "text-orange-600" : "text-slate-800";
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