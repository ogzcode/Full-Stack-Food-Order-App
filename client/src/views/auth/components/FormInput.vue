<template>
    <div class="mb-4 relative">
        <label class="text-sm block mb-1 text-zinc-600">{{ label }}</label>
        <input 
            :value="value" 
            :type="props.type" 
            :disabled="props.disabled"
            class="border border-zinc-400 rounded w-full p-2 text-zinc-600 transition focus:border-orange-400"
            @input="updateValue" 
            required 
        />
        <slot name="body"></slot>
        <slot name="error"></slot>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:value'])

const value = ref(props.value)

const updateValue = (e) => {
    value.value = e.target.value
    emit('update:value', e.target.value)
}

</script>

<style scoped>
input:focus {
    outline: 2px solid #fed7aa;
}
</style>