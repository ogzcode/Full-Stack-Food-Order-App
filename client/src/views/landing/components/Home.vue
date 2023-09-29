<template>
    <div class="min-h-[700px] flex justify-around items-center px-40 bg-orange-950" id="home">
        <div class="flex-1">
            <h1 class="text-4xl w-1/2 font-bold tracking-wide text-white mb-4">Delicious Dishes for Food Lovers</h1>
            <p class="text-slate-50 w-3/4 font-light tracking-wide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ut cursus quam. Suspendisse potenti.
                Vestibulum dapibus sagittis enim ut scelerisque.
                Vivamus scelerisque nisi ut leo tristique feugiat.
            </p>
            <button class="mt-8 bg-white px-8 py-2 font-medium tracking-wide text-orange-950 rounded shadow-xl menu-btn">
                <span>Go Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
            </button>
        </div>
        <div class="flex-1 flex justify-center relative">
            <img :src="homePage" alt="Home Page" class="w-3/5  rounded-lg z-10" />
            <span class="absolute rounded-full bg-yellow-900 image-shadow"></span>
        </div>
    </div>
</template>

<script setup>
import homePage from "@/assets/images/other/home-page-remove.png";
</script>

<style scoped>

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
    filter: blur(70px);
}
</style>