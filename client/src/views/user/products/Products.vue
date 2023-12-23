<template>
    <div class="p-12">
        <Header :value="searchQuery" v-model:value="searchQuery" />
        <div class="pt-12 flex gap-12 flex-wrap justify-around">
            <template v-for="(product, i) in productStore.searchProduct(searchQuery)" :key="i">
                <ProductCard :product="product">
                    <template #footer>
                        <div class="flex justify-between items-center">
                            <button @click="handleProductComment(product.id)" class="flex items-center gap-1">
                                <template v-for="(star, i) in 5" :key="i">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-star-fill" :class="getRatingColor(product.rating, i)"
                                        viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                                            0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522
                                            3.356.83 4.73c.078.443-.36.79-.746.592L8
                                            13.187l-4.389
                                            2.256z" />
                                    </svg>
                                </template>
                            </button>
                            <CartBtn @add-to-cart="handleAddToCart(product)"
                                @remove-to-cart="handleDeleteToChart(product.id)"
                                :order-quantity="getOrderQuantity(product.id)" />
                        </div>
                    </template>
                </ProductCard>
            </template>
        </div>
        <Dialog header-title="Comments" :show="commentDialog" @close="handleCommentDialog(false)" :footer-show="false">
            <template v-slot:body>
                <CommentList :product-id="selectedProductId" @close-dialog="handleCommentDialog(false, refetch = true)" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAllProducts } from "../../../services/request/ProductRequest.js"
import { useProductStore } from '../../../stores/product';
import { useOrderStore } from '../../../stores/order';
import Dialog from '../../../components/Dialog.vue';
import CommentList from './comment/CommentList.vue';
import ProductCard from "./components/ProductCard.vue"
import Header from './components/Header.vue';
import CartBtn from './components/CartBtn.vue';

const orderStore = useOrderStore();
const productStore = useProductStore();

const searchQuery = ref('');
const commentDialog = ref(false);
const selectedProductId = ref(0);

onMounted(() => {
    getAllProducts().then((res) => {
        productStore.setProducts(res.data.products);
    });
});

const handleAddToCart = (product) => {
    orderStore.addProductToCart(product);
}

const handleDeleteToChart = (productId) => {
    orderStore.deleteProductToCart(productId);
}

const getOrderQuantity = (productId) => {
    return orderStore.getOrderQuantity(productId);
}

const handleCommentDialog = (value, refetch = false) => {
    commentDialog.value = value;

    if (refetch) {
        getAllProducts().then((res) => {
            productStore.setProducts(res.data.products);
        });
    }
}

const handleProductComment = (productId) => {
    selectedProductId.value = productId;
    commentDialog.value = true;
}

const getRatingColor = (rating, index) => {
    return index < rating ? 'text-orange-500' : 'text-slate-300';
}

</script>

<style scoped></style>