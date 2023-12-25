<template>
    <div class="flex justify-between items-center flex-wrap gap-y-4">
        <h1 class="text-3xl text-slate-700 font-bold tracking-wide">Products</h1>
        <div class="flex items-center sm:w-auto w-full">
            <input type="text" class="border border-slate-400 rounded sm:w-[240px] w-full p-2 outline-0 text-slate-800 text-sm transition focus:border-orange-400"
                placeholder="Search Products..." :value="props.value" @input="updateValue" />

            <Select :options="selectedOption" :modelValue="props.filterSelected" v-model:modelValue="modelValue" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Select from '../../../../components/Select.vue';

const selectedOption = [
    { label: 'All', value: 'all' },
    { label: 'Favorite', value: 'favorite' }
]

const props = defineProps({
    value: {
        type: String,
        required: true
    },
    filterSelected: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['update:value', 'update:filterSelected'])

const updateValue = (e) => {
    emits('update:value', e.target.value)
}

const modelValue = computed({
    get: () => props.filterSelected,
    set: (value) => {
        emits('update:filterSelected', value)
    }
})

</script>

<style scoped>
input:focus {
    outline: 2px solid #fed7aa;
}
</style>