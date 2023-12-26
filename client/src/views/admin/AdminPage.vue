<template>
    <div>
        <NavBar />
        <RouterView />
    </div>
</template>

<script setup>
import { onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

import { useDataTable } from '../../stores/useDataTable';
import { useOrderStore } from '../../stores/order';
import { useProductStore } from '../../stores/product';

const dataTableStore = useDataTable();
const orderStore = useOrderStore();
const productStore = useProductStore();

onUnmounted(() => {
    dataTableStore.reset();
    orderStore.reset();
    productStore.reset();
});

</script>

<style scoped></style>