<template>
    <div v-if="!isError" class="error-alert absolute py-2 px-4 border border-red-400 rounded text-red-800 bg-white w-1/5">
        {{ props.errors }}
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    errors: {
        type: String
    }
});

const isError = computed(() => {
    return props.errors === "";
});

</script>

<style scoped>
.error-alert {
    top: 2rem;
    animation: slide-up 0.2s ease-in-out;
}

@keyframes slide-up {
    0% {
        top: 0rem
    }

    100% {
        top: 2rem;
    }
}
</style>