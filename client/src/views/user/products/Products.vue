<template>
    <div class="sm:p-12 p-6">
        <SettingErrorMessage />
        <Header :value="searchQuery" v-model:value="searchQuery" :filter-selected="filter"
            v-model:filterSelected="filter" />
        <div class="pt-12 flex gap-12 flex-wrap justify-around">
            <template v-for="(product, i) in filteredProducts" :key="i">
                <ProductCard :product="product">
                    <template #footer>
                        <div class="flex justify-between items-center">
                            <CommentDialogBtn :product-rating="product.rating"
                                @on-open-comment-dialog="handleProductComment(product.id)" />

                            <CartBtn v-if="auth.user.userHasExtraData" @add-to-cart="handleAddToCart(product)"
                                @remove-to-cart="handleDeleteToChart(product.id)"
                                :order-quantity="getOrderQuantity(product.id)" />
                        </div>
                    </template>
                </ProductCard>
            </template>
            <template v-if="filteredProducts.length === 0">
                <div class="text-center text-orange-600 py-8 rounded text-2xl font-semibold w-full bg-orange-100">
                    No products found
                </div>
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
import { computed, onMounted, ref } from 'vue';
import { getProductForUser } from "../../../services/request/ProductRequest.js"
import { useProductStore } from '../../../stores/product';
import { useOrderStore } from '../../../stores/order';
import { useAuth } from '../../../stores/auth';
import Dialog from '../../../components/Dialog.vue';
import CommentList from './comment/CommentList.vue';
import ProductCard from "./components/ProductCard.vue"
import Header from './components/Header.vue';
import CartBtn from './components/CartBtn.vue';
import SettingErrorMessage from './components/SettingErrorMessage.vue';
import CommentDialogBtn from './components/CommentDialogBtn.vue';

const orderStore = useOrderStore();
const productStore = useProductStore();
const auth = useAuth();

const searchQuery = ref('');
const commentDialog = ref(false);
const selectedProductId = ref(0);
const filter = ref('all');

onMounted(() => {
    getProductForUser().then((res) => {
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
        getProductForUser().then((res) => {
            productStore.setProducts(res.data.products);
        });
    }
}

const handleProductComment = (productId) => {
    selectedProductId.value = productId;
    commentDialog.value = true;
}

const filteredProducts = computed(() => {
    return productStore.searchProduct(searchQuery.value, filter.value);
});

</script>

<style scoped></style>