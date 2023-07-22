<template>
    <div class="placeholder">
        <div class="parallax-window" :style="{ backgroundImage: `url(${backgroundImage})`}">
            <div class="absolute bottom-0 left-0 w-full z-10">
                <div class="row py-10 px-12">
                    <div class="col-md-6 col-12 flex items-center">
                        <img src="../assets/image/simple-house-logo.png" alt="Logo" class="tm-site-logo my-auto mr-4" />
                        <h1 class="text-4xl text-white">Simple House</h1>
                    </div>
                    <nav class="col-md-6 col-12">
                        <ul class="flex justify-end items-center h-full">
                            <li class="block px-6 list-none">
                                <router-link :to="{ name: 'HomePage' }"
                                    class="link no-underline text-white pb-2">Home</router-link>
                            </li>
                            <li class="block px-6 list-none">
                                <router-link :to="{ name: 'About' }"
                                    class="link no-underline text-white pb-2">About</router-link>
                            </li>
                            <li class="block px-6 list-none">
                                <router-link :to="{ name: 'Contact' }"
                                    class="link no-underline text-white pb-2">Contact</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';

import homeBg from '../assets/image/home-bg.jpg';
import aboutBg from '../assets/image/about-bg.jpg';
import contactBg from '../assets/image/contact-bg.jpg';


const route = useRoute();
const backgroundImage = ref(homeBg);

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

.router-link-exact-active {
    border-bottom: 2px solid #fff;
}

.link:hover {
    border-bottom: 2px solid #fff;
}</style>