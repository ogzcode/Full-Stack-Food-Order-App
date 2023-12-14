<template>
    <div class="min-h-screen min-w-screen bg-zinc-900" id="home">
        <NavBar />
        <div class="flex md:justify-center items-center md:flex-row flex-col-reverse xl:px-40 md:px-20 main">
            <div class="flex-1 text-side md:text-left text-center">
                <h1 class="font-bold tracking-wide text-white mb-4 xl:text-4xl md:text-2xl text-xl xl:w-1/2">Delicious Dishes for Food Lovers</h1>
                <p class="text-slate-50 xl:w-3/4 md:w-2/3 w-1/2 md:mx-0 mx-auto lg:text-base text-sm font-light tracking-wide">
                    At Food-ER, we believe that everyone deserves to enjoy delicious food, no matter where they are. That's
                    why we offer a wide variety of restaurants to choose from, all delivered right to your door.
                </p>
                <a href="#menu"
                    class="inline-block mt-8 bg-white px-8 py-2 font-semibold tracking-wide text-orange-700 rounded shadow-xl menu-btn">
                    <span>Go Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </a>
            </div>
            <div class="flex-1 flex justify-center relative">
                <img :src="homePage" alt="Home Page" class="w-4/5 rounded-lg z-10" />
                <span class="absolute rounded-full bg-yellow-900 image-shadow"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import homePage from "@/assets/images/other/home-page-remove.png";
</script>

<style scoped>
.main {
    height: calc(100vh - 5rem);
}

.main img,
.main .text-side {
    animation: slide 1s ease-in-out alternate;
}

@keyframes slide {
    0% {
        transform: translateX(-10px);
        opacity: 0;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

.menu-btn svg {
    position: relative;
    left: 12px;
    transition: all 0.3s ease-in-out;
    display: inline-block;
}

.menu-btn:hover svg {
    transform: translate(5px, 0);
}

.image-shadow {
    width: 360px;
    height: 360px;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(100px);
}

@media screen and (max-width: 768px) {
    .main {
        padding-top: 5rem;
    }

    .main > div:nth-child(1) {
        margin-top: 2rem;
    }
}
</style>