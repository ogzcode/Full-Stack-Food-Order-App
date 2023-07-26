<template>
    <div class="container bg-white min-h-screen overflow-hidden relative">
        <nav class="flex px-10 py-6 justify-between items-center">
            <div>
                <h1 class="font-ubuntu inline text-2xl mr-8 font-bold text-slate-800">Admin Page</h1>
                <router-link :to="{ name: 'Orders' }" class="font-ubuntu pb-2 text-sm font-semibold text-slate-700 mx-4 tracking-wider">Mevcut Siparişler</router-link>
                <router-link :to="{ name: 'Products' }" class="font-ubuntu pb-2 text-sm font-semibold text-slate-700 mx-4 tracking-wider">Ürünler</router-link>
                <router-link :to="{ name: 'Users' }" class="font-ubuntu pb-2 text-sm font-semibold text-slate-700 mx-4 tracking-wider">Kullanıcılar</router-link>
            </div>
            <button @click="logout">
                <span class="font-ubuntu text-slate-800 font-semibold mr-2 text-base tracking-wide">Çıkış Yap</span>
                <svg class="inline fill-slate-800 cursor-pointer text-xl" xmlns="http://www.w3.org/2000/svg" height="1em"
                    viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
            </button>
        </nav>
        <router-view/>
    </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';

const store = useAuthStore();

const logout = () => {
    store.logout();
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

.font-ubuntu {
    font-family: 'Ubuntu', sans-serif;
}

.router-link-exact-active {
    border-bottom: 1px solid #334155;
}
</style>