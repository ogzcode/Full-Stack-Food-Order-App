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
                <ProductCard :product="product" @add-product="handleAddProduct(product)"
                    @delete-product="handleDeleteProduct(product.id)"
                    :product-is-here="orderStore.productIsHere(product.id)"
                    @comment-dialog="handleCommentDialog(product)" />
            </template>
        </div>
        <Dialog header-title="Comments" :show="commentDialog" @close="handleDialog" :footer-show="false">
            <template v-slot:body>
                <template v-if="!commentStatus">
                    <CommentForm :product-id="productId" @close-dialog="handleDialog" />
                </template>
                <CommentList v-model="commentStatus" :product-id="productId" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAllProducts } from "../../services/request/ProductRequest.js"
import { useProductStore } from '../../stores/product';
import { useOrderStore } from '../../stores/order';
import Dialog from '../../components/Dialog.vue';
import CommentForm from './components/CommentForm.vue';
import CommentList from './components/CommentList.vue';

import ProductCard from "./components/ProductCard.vue"

const orderStore = useOrderStore();
const productStore = useProductStore();

const searchQuery = ref('');
const productId = ref(null);
const commentDialog = ref(false);
const commentStatus = ref(false);

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

const handleDialog = (value) => {
    commentDialog.value = value;
}

const handleCommentDialog = (product) => {
    handleDialog(true);
    productId.value = product.id;
}

</script>

<style scoped>
.order-scroll::-webkit-scrollbar {
    width: 5px;
}

.order-scroll::-webkit-scrollbar-track {
    background: #e2e8f0;
}

.order-scroll::-webkit-scrollbar-thumb {
    background: #f97316;
    border-radius: 12px;
}

.order-scroll::-webkit-scrollbar-track {
    border-radius: 10px;
}
</style>