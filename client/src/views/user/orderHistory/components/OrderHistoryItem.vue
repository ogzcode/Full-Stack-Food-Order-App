<template>
    <div class="border border-zinc-300 rounded-lg w-[400px] p-6">
        <div class="flex justify-between items-center mb-4">
            <p class="px-2 py-1 rounded-full text-xs font-semibold tracking-wide" :class="getOrderStatusStyle(props.order.status)">{{
                props.order.status
            }}</p>
            <p class="text-xs bg-zinc-50 text-zinc-600 border border-zinc-300 px-2 py-1 rounded-full">{{
                formatDate(props.order.createdAt) }}</p>
        </div>
        <p class="text-sm text-slate-600 mb-2">Order No.</p>
        <p
            class="text-base text-center border border-orange-600 text-orange-600 font-semibold bg-orange-50 rounded-full px-2 py-1">
            {{ props.order.orderNo }}</p>
        <div class="flex justify-between items-center mt-6 border border-zinc-300 py-2 px-3 rounded-md">
            <span class="text-lg text-slate-600 font-semibold">Total Price</span>
            <p class="text-xl font-bold text-center text-orange-600">${{ props.order.totalPrice }}</p>
        </div>
        <div class="flex justify-between items-center mt-6">
            <button @click="$emit('onOpenDialog', props.order.id)"
                class="text-sm font-semibold text-zinc-600 border border-zinc-300 py-2 rounded-full w-full">
                View Details</button>
        </div>
    </div>
</template>

<script setup>
import { getOrderStatusStyle, formatDate,  } from '../../../../utils/util';

const props = defineProps({
    order: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(["onOpenDialog"])
</script>

<style scoped></style>