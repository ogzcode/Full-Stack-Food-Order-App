<template>
    <div class="flex justify-center items-center gap-x-8">
        <button @click="$emit('onPrevPage')" class="text-sm font-semibold text-zinc-600 border border-zinc-300 p-2 rounded-full w-full">
            <Icons name="chevron-left" :size="24" />
        </button>
        <button @click="$emit('onNextPage')" class="text-sm font-semibold text-zinc-600 border border-zinc-300 p-2 rounded-full w-full">
            <Icons name="chevron-right" :size="24" />
        </button>
    </div>
</template>

<script setup>
import Icons from '../../../../components/Icons.vue';

const emits = defineEmits(["onNextPage", "onPrevPage"]);
</script>

<style scoped></style>