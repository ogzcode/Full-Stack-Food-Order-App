<template>
    <div v-for="(product, i) in orderDetails" :key="i"
        class="border border-orange-500 rounded flex justify-between items-center mb-4">
        <div class="flex items-center gap-x-2 h-20">
            <img :src="getImgURL(product.image)" alt="" class="w-20" />
            <div>
                <p class="text-slate-800 text-lg font-medium">{{ product.name }}</p>
                <p class="text-slate-600 font-normal text-sm flex items-center">
                    <Icons name="x" :size="20" />
                    {{ product.quantity }}</p>
            </div>
        </div>
        <p class="text-orange-600 text-xl font-semibold mr-4">${{ parseInt(product.price) *
            product.quantity }}</p>
    </div>
</template>

<script setup>
import { getImgURL } from '../../../../utils/util';
import Icons from '../../../../components/Icons.vue';

const props = defineProps({
    orderDetails: {
        type: Array,
        default: () => []
    }
})
</script>

<style scoped></style>