<template>
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
                <template v-for="(product, n) in products" :key="n">
                    <swiper-slide>
                        <SwiperItem :price="product.price" :title="product.name" :description="product.description"
                            :image="product.image" />
                    </swiper-slide>
                </template>
            </swiper>
        </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import SwiperItem from './SwiperItem.vue';
import { getAllProducts } from '@/services/request/ProductRequest';

import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';

const products = ref([]);

onMounted(async () => {
    const { data } = await getAllProducts();
    console.log(data);
    products.value = data.products;
});

const modules = [Pagination];

const onSwiper = (swiper) => {};

const onSlideChange = () => {};
</script>

<style>
.swiper-pagination {
    position: initial !important;
}

.swiper-pagination-bullet-active {
    background-color: #f97316 !important;
}
</style>