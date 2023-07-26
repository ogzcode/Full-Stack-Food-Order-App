<template>
    <div class="placeholder relative">
        <div class="parallax-window" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <SuccessAlert :message="successMessage" />
            <div class="absolute top-0 left-0 w-full p-4 text-right z-20">
                <template v-if="!isAuthenticated">
                    <router-link :to="{ name: 'Register' }"
                        class="bg-rose-500 rounded-sm mx-2 px-6 py-1 text-sm text-white inline-block border border-white tracking-wide hover:bg-rose-600">
                        <div class="flex">
                            <span class="mr-2">Sign In</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path
                                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path
                                    d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'Login' }"
                        class="bg-rose-500 rounded-sm mx-2 px-6 py-1 text-sm text-white inline-block border border-white tracking-wide hover:bg-rose-600">
                        <div class="flex">
                            <span class="mr-2">Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                <path fill-rule="evenodd"
                                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </div>
                    </router-link>
                </template>
                <template v-else>
                    <button @click="logout"
                        class="bg-rose-500 rounded-sm mx-2 px-4 py-1 text-sm text-white border border-white tracking-wide hover:bg-rose-600">
                        <div class="flex">
                            <span class="mr-2">Logout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fill-rule="evenodd"
                                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </div>
                    </button>
                </template>
            </div>
            <div class="absolute bottom-0 left-0 w-full z-10">
                <div class="row py-10 px-12">
                    <div class="col-md-6 col-12 flex items-center">
                        <img src="../assets/image/simple-house-logo.png" alt="Logo" class="tm-site-logo my-auto mr-4" />
                        <h1 class="text-4xl text-white">Simple House</h1>
                    </div>
                    <nav class="col-md-6 col-12">
                        <ul class="flex justify-end items-center h-full">
                            <li v-for="(r, index) in routeList" :key="index"
                                class="block mx-4 px-8 rounded py-1 list-none bg-white text-rose-500 cursor-pointer">
                                <router-link :to="{ name: r.name }" class="no-underline">{{ r.content }}</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue';

import homeBg from '../assets/image/home-bg.jpg';
import aboutBg from '../assets/image/about-bg.jpg';
import contactBg from '../assets/image/contact-bg.jpg';

import { useAuthStore } from '../stores/auth.js';

import SuccessAlert from './alert/SuccessAlert.vue';

const store = useAuthStore();

const { isAuthenticated } = storeToRefs(store);

const route = useRoute();
const backgroundImage = ref(homeBg);
const successMessage = ref(null);

const routeList = [
    {
        name: "HomePage",
        content: "Home"
    },
    {
        name: "About",
        content: "About"
    },
    {
        name: "Contact",
        content: "Contact"
    }
];

const updateBackgroundImage = () => {
    if (route.name === "HomePage") {
        backgroundImage.value = homeBg;
    } else if (route.name === "About") {
        backgroundImage.value = aboutBg;
    } else if (route.name === "Contact") {
        backgroundImage.value = contactBg;
    }
}

onMounted(() => {
    updateBackgroundImage();
});

watch(route, (to) => {
    updateBackgroundImage();
});

const logout = () => {
    store.logout();
    successMessage.value = "Logout successfully";
}

watch(successMessage, () => {
    setTimeout(() => {
        successMessage.value = null;
    }, 2000);
}, { immediate: true });

</script>

<style scoped>
.placeholder {
    width: 100%;
    min-height: 460px;
    position: relative;
}

.parallax-window {
    background: rgba(0, 0, 0, .9);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>