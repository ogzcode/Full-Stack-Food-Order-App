<template>
    <div class="py-20 bg-zinc-50 flex flex-col" id="menu">
        <h1 class="font-bold text-3xl text-center text-slate-800 mb-10 tracking-wide">Menu</h1>
        <div class="px-20 relative">
            <swiper class="overflow-auto" :modules="modules" :slides-per-view="1" :space-between="50" @swiper="onSwiper"
                @slide-change="onSlideChange" :pagination="{ clickable: true }" :breakpoints="{
                    '1024': {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    '1280': {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }"
                >
                <template v-for=" n  in  7 " :key="n">
                    <swiper-slide>
                        <div class="flex justify-center">
                            <div class="w-[22rem] p-4 transition rounded-lg border border-zinc-50 hover:border-orange-500 image-box">
                                <div
                                    class="w-[20rem] h-[20rem] bg-white shadow flex justify-center items-center rounded mb-4 relative">
                                    <img :src="getImageSource(n)" alt="" class="w-full" />
                                    <span class="text-orange-500 absolute top-2 right-4 font-bold ml-2">$12.50</span>
                                </div>
                                <p class="text-xl font-medium text-zinc-800 mb-1">Lorem Ipsum</p>
                                <p class="text-zinc-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit...
                                </p>
                            </div>
                        </div>
                    </swiper-slide>
                </template>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';

import image1 from '@/assets/images/landing/image-1.png';
import image2 from '@/assets/images/landing/image-2.png';
import image3 from '@/assets/images/landing/image-3.png';
import image5 from '@/assets/images/landing/image-5.png';
import image6 from '@/assets/images/landing/image-6.png';
import image7 from '@/assets/images/landing/image-7.png';

const modules = [Pagination];

const onSwiper = (swiper) => {};

const onSlideChange = () => {};

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

<style>
.swiper-pagination {
    position: initial !important;
}

.swiper-pagination-bullet-active {
    background-color: #f97316 !important;
}

.image-box img {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.image-box:hover img {
    transform: scale(1.1) rotate(5deg);
}
</style>
