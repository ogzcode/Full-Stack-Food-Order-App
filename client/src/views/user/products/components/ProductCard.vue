<template>
    <div class="w-[400px] flex justify-between flex-col border rounded-xl relative transition hover:border-orange-500">
        <FavoriteBtn />
        <div class="p-4">
            <img :src="getImgURL(product.image)" class="" />
        </div>
        <div class="px-8 pb-8">
            <div class="w-full flex justify-between items-center mb-4">
                <p class="text-slate-800 font-semibold text-2xl text-ellipsis">{{ product.name }}</p>
                <p class="font-bold text-orange-600 text-2xl text-right">${{ product.price }}</p>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
import { getImgURL } from "../../../../utils/util";
import FavoriteBtn from './FavoriteBtn.vue';

const props = defineProps({
    product: {
        type: Object
    }
});

</script>

<style scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
