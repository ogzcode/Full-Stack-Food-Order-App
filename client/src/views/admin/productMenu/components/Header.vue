<template>
    <div class="flex justify-between items-center">
        <h1 class="text-3xl text-slate-700 font-bold tracking-wide">Products</h1>
        <div class="flex gap-x-4 items-center">
            <input type="text" class="border border-slate-300 rounded w-[240px] p-2 text-slate-800 text-sm focus:border-orange-400"
                placeholder="Search Products..." :value="searchQuery" @input="handleChange" />
            <button class="flex items-center bg-sky-500 text-white px-4 py-2 text-sm rounded"
                @click="$emit('onOpenDialog', true)">
                <Icons name="pencil-fill" :size="16" :style="'mr-2'" />
                <span class="font-semibold text-sm">New Products</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import Icons from '../../../../components/Icons.vue';

const props = defineProps({
    searchQuery: {
        type: String
    }
});

const emits = defineEmits(["update:searchQuery", "onOpenDialog"]);

const handleChange = (e) => {
    emits("update:searchQuery", e.target.value)
}
</script>

<style scoped>
input:focus {
    outline: 2px solid #fed7aa;
}
</style>