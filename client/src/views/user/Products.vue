<template>
    <div class="p-12">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl text-slate-700 font-bold tracking-wide">Products</h1>
            <div>
                <input type="text" class="border border-slate-200 rounded w-[240px] p-2 outline-0 text-slate-800 text-sm"
                    placeholder="Search Products..." v-model="searchQuery" />
            </div>
        </div>
        <div class="pt-12 flex gap-12 flex-wrap justify-around">
            <template v-for="(product, i) in productStore.searchProduct(searchQuery)" :key="i">
                <ProductCard :product="product" @add-product="handleAddProduct(product)" @delete-product="handleDeleteProduct(product.id)"
                    :product-is-here="orderStore.productIsHere(product.id)" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAllProducts } from '../../services/requestServices';
import { useProductStore } from '../../stores/product';
import { useOrderStore } from '../../stores/order';

import ProductCard from "./components/ProductCard.vue"

const searchQuery = ref('');
const productStore = useProductStore();
const orderStore = useOrderStore();

onMounted(() => {
    getAllProducts().then((res) => {
        productStore.setProducts(res.data.products);
    });
});

const handleAddProduct = (product) => {
    orderStore.addOrder(product);
}

const handleDeleteProduct = (id) => {
    orderStore.deleteOrder(id);
}


</script>

<style scoped></style>