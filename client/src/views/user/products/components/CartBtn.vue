<template>
    <div class="border border-slate-300 rounded-full flex items-center">
        <button @click="$emit('removeToCart')" class="px-3 py-2 text-zinc-700 rounded-l-full hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
            </svg>
        </button>
        <span class="text-lg font-bold text-zinc-700 mx-3">{{ orderQuantity }}</span>
        <button @click="$emit('addToCart')" class="px-3 py-2 text-zinc-700 rounded-r-full hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
            </svg>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    orderQuantity: {
        type: Number,
        default: 0
    }
})
</script>

<style scoped></style>