<template>
    <div class="flex justify-center">
        <div class="w-[22rem] p-4 transition rounded-lg border border-zinc-50 hover:border-orange-500 image-box">
            <div class="w-[20rem] h-[20rem] bg-white shadow flex justify-center items-center rounded mb-4 relative">
                <img :src="getImgURL(props.image)" alt="" class="w-full" />
                <span class="text-orange-500 absolute top-2 right-4 font-bold ml-2">${{ props.price }}</span>
            </div>
            <p class="text-xl font-medium text-zinc-800 mb-1">{{ props.title }}</p>
            <p class="text-zinc-500">
                {{ props.description.substring(0, 100) }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { getImgURL } from '../../../../utils/util';

const props = defineProps({
    price: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})
</script>

<style scoped>
.image-box img {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.image-box:hover img {
    transform: scale(1.1) rotate(5deg);
}
</style>