<template>
    <div class="text-center mt-8">
        <button class="text-white w-full bg-orange-500 font-semibold tracking-wide px-8 py-2 rounded hover:bg-orange-600"
            :type="props.type" :disabled="props.disabled">
            {{ props.text }}
        </button>
    </div>
</template>

<script setup>

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'submit'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

</script>

<style scoped></style>