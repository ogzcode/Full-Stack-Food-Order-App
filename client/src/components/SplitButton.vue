<template>
    <div ref="splitRef" class="inline-block relative rounded-lg">
        <IconBtn icon-name="dots-vertical" severity="secondary" tooltip="Order Status" @click="toggleActions" />
        <div ref="btnbox"
            class="flex flex-col min-w-[120px] absolute py-2 mt-1 rounded top-full left-1/2 -translate-x-1/2 text-sm bg-white text-white text-center shadow-xl whitespace-nowrap z-50"
            v-if="showActions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import IconBtn from './IconBtn.vue';

const splitRef = ref(null);
const showActions = ref(false);
const btnbox = ref(null);

window.addEventListener('click', (e) => {
    if ((splitRef.value && !splitRef?.value.contains(e.target)) || btnbox?.value?.contains(e.target)) {
        showActions.value = false;
    }
});

const toggleActions = () => {
    showActions.value = !showActions.value;
};
</script>
  