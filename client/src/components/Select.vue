<template>
    <div>
        <label v-if="props.label">{{ props.label }}</label>
        <select v-model="model" class="border border-slate-300 rounded p-2 outline-0 text-slate-600 ml-2 text-sm">
            <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: "Select one"
    },
    options: {
        type: Array,
        default: () => []
    },
    label: {
        type: String,
        default: ""
    },
})

const emit = defineEmits(["update:modelValue"])

const model = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit("update:modelValue", value)
    }
})
</script>

<style scoped></style>