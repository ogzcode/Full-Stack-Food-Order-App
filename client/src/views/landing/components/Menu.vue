<template>
    <div class="py-20 bg-orange-50" id="menu">
        <h1 class="text-center text-slate-800 font-bold tracking-wide text-3xl mb-10">Menu</h1>

        <div class="flex mx-20 justify-around flex-wrap gap-y-10">
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image1" alt="" class="w-full"/>
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image2" alt="" class="w-full"/>
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image3" alt="" class="w-full"/>
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image5" alt="" class="w-full"/>
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image6" alt="" class="w-full"/>
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image7" alt="" class="w-full"/>
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
        </div>
        <div class="text-center mt-10"> 
            <button class="bg-orange-600 text-white font-semibold text-md tracking-wide px-10 py-2 rounded shadow-lg transition hover:shadow-orange-400">Learn More</button>
        </div>
    </div>
</template>

<script setup>
import image1 from '@/assets/images/landing/image-1.png';
import image2 from '@/assets/images/landing/image-2.png';
import image3 from '@/assets/images/landing/image-3.png';
import image5 from '@/assets/images/landing/image-5.png';
import image6 from '@/assets/images/landing/image-6.png';
import image7 from '@/assets/images/landing/image-7.png';
</script>

<style scoped>
</style>