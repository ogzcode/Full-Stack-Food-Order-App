<template>
    <div class="py-20 bg-orange-50 flex flex-col lg:flex-row" id="menu">
        <div class="flex flex-col items-center mb-16 flex-1">
            <h1 class="font-bold text-3xl text-slate-800 mb-4 tracking-wide">Menu</h1>
            <p class="w-1/3 text-center text-slate-800 tracking-wide font-light">
                We are here to deliver the most delicious food at the most affordable prices.
                Choose from our wide range of menu options,
                Order to any address, and it will be at your door in minutes
            </p>
        </div>

        <swiper :onSwiper="onSwiper" :onSlideChange="onSlideChange" :slidesPerView="1" class="flex-1" :spaceBetween="30" :breakpoints="{
            640: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 30
            }
        }">
            <template v-for="n in 7" :key="n">
                <swiper-slide>
                    <div class="bg-red-200 p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                        <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                            <img :src="getImageSource(n)" alt="" class="w-full aspect-auto" />
                        </div>
                        <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                        <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span>
                        </p>
                    </div>
                </swiper-slide>
            </template>
        </swiper>

        <!-- <div class="flex mx-20 justify-around flex-wrap gap-y-10">
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image1" alt="" class="w-full" />
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image2" alt="" class="w-full" />
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image3" alt="" class="w-full" />
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image5" alt="" class="w-full" />
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image6" alt="" class="w-full" />
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
            <div class="w-[240px] p-4 border cursor-pointer border-orange-50 hover:border-orange-500 rounded">
                <div class="bg-white shadow h-[200px] flex justify-center items-center rounded mb-4">
                    <img :src="image7" alt="" class="w-full" />
                </div>
                <p class="text-xl font-medium text-orange-800 mb-1">Lorem Ipsum</p>
                <p class="text-slate-500 text-sm">Price: <span class="text-orange-500 font-bold ml-2">$12.50</span></p>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper-bundle.css';

import image1 from '@/assets/images/landing/image-1.png';
import image2 from '@/assets/images/landing/image-2.png';
import image3 from '@/assets/images/landing/image-3.png';
import image5 from '@/assets/images/landing/image-5.png';
import image6 from '@/assets/images/landing/image-6.png';
import image7 from '@/assets/images/landing/image-7.png';

const onSwiper = (swiper) => {
    console.log(swiper);
};

const onSlideChange = () => {
    console.log('slide change');
};

const getImageSource = (n) => {
    switch (n) {
        case 1:
            return image1;
        case 2:
            return image2;
        case 3:
            return image3;
        case 4:
            return image5;
        case 5:
            return image6;
        case 6:
            return image7;
        default:
            return image1;
    }
};

</script>

<style scoped></style>