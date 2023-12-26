<template>
    <nav class="absolute w-[360px] top-0 left-0 bg-white min-h-screen z-50" :class="active ? 'active' : 'inactive'">
        <h1
            class="lg:text-4xl text-3xl h-[5rem] flex items-center justify-center border-b border-zinc-200 font-bold tracking-wide text-slate-800">
            Food<span class="text-orange-600">-ER</span>
        </h1>
        <ul class="flex flex-col items-center justify-center text-center p-6 gap-y-4">
            <button @click="$emit('openOrderDialog')"
                class="bg-orange-600 border flex justify-center items-center border-orange-600 text-white py-2 rounded-full cursor-pointer w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-basket3-fill" viewBox="0 0 16 16">
                    <path
                        d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
                </svg>
                <span class="font-semibold tracking-wide ml-4 text-md">Cart</span>
            </button>
            <router-link :to="{ name: 'UserProducts' }" @click="$emit('closeMenu')"
                class="text-md py-2 pl-4 rounded-lg text-slate-700 tracking-wide font-semibold w-full text-left hover:bg-slate-100">Products</router-link>
            <router-link :to="{ name: 'Order' }" @click="$emit('closeMenu')"
                class="text-md py-2 pl-4 rounded-lg text-slate-700 tracking-wide font-semibold w-full text-left hover:bg-slate-100">Order</router-link>
            <router-link :to="{ name: 'OldOrders' }" @click="$emit('closeMenu')"
                class="text-md py-2 pl-4 rounded-lg text-slate-700 tracking-wide font-semibold w-full text-left hover:bg-slate-100">Old
                Orders</router-link>
            <router-link :to="{ name: 'Settings' }" @click="$emit('closeMenu')"
                class="text-md py-2 pl-4 rounded-lg text-slate-700 tracking-wide font-semibold w-full text-left hover:bg-slate-100">Settings</router-link>
        </ul>
        <div class="absolute bottom-0 left-0 right-0 mx-6 mb-6">
            <button @click="$emit('logout')" class="border border-red-600 flex w-full justify-center py-3 rounded-full">
                <span class="text-red-600 font-semibold text-md leading-none">Logout</span>
            </button>
        </div>
    </nav>
</template>

<script setup>
const props = defineProps({
    active: Boolean,
});

const emits = defineEmits(['closeMenu'], ['logout'], ['openOrderDialog']);

</script>

<style scoped>
nav {
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

nav.active {
    transform: translateX(0);
}

nav.inactive {
    transform: translateX(-110%);
}

@media screen and (max-width: 480px) {
    nav {
        width: 280px;
    }
}
</style>