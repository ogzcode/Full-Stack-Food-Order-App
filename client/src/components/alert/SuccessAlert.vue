<template>
    <div v-if="!isMessage" class="success-alert absolute py-2 px-4 border-2 border-teal-500 rounded text-teal-800 tracking-wide text-base bg-white w-1/5">
        {{ props.message }}
    </div>
</template>

<script setup>
import { computed, toRef } from 'vue';

const props = defineProps({
    message: {
        type: String
    }
});

const message = toRef(props, 'message');

const isMessage = computed(() => {
    return props.message === null;
});

</script>

<style scoped>
.success-alert {
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
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
