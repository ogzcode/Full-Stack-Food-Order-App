<template>
    <div class="p-12 min-h-screen">
        <Header :search-query="searchQuery" v-model:search-query="searchQuery" @on-open-dialog="handleChangeDialog" />
        <div class="pt-12 flex gap-12 flex-wrap justify-around">
            <template v-for="(product, i) in productStore.searchProduct(searchQuery)" :key="i">
                <ProductCard :price="product.price" :name="product.name" :description="product.description"
                    :image="product.image" :rating="product.rating" @delete="handleDeleteDialog(true, product.id)"
                    @update="handleUpdate(product)" @open-comment-dialog="handleOpenCommentDialog(product)" />
            </template>
        </div>
    </div>
    <Dialog headerTitle="Product Action" :show="showAddProductDialog" :footer-show="false"
        @close="handleChangeDialog(false)">
        <template v-slot:body>
            <ProductForm @on-submit="handleSubmit" :selected-product="selectedProduct" />
        </template>
    </Dialog>

    <Dialog headerTitle="Comments" :show="showCommentDialog" :footer-show="false" @close="handleCommentDialog(false)">
        <template v-slot:body>
            <CommentList :product-id="selectedProduct?.id" @close-dialog="handleCommentDialog(false)" />
        </template>
    </Dialog>

    <Dialog headerTitle="Delete Product" :show="showDeleteDialog" @close="handleDeleteDialog(false)" @submit="handleDelete">
        <template v-slot:body>
            <p>
                Are you sure you want to delete this product?
            </p>
        </template>
    </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAllProducts, createAndUpdateProduct, deleteProductById } from '../../../services/request/ProductRequest';
import { useProductStore } from '../../../stores/product';
import { useToastStore } from "../../../stores/toast";
import ProductCard from '../components/ProductCard.vue';
import Dialog from '../../../components/Dialog.vue';
import Header from './components/Header.vue';
import ProductForm from './components/ProductForm.vue';
import CommentList from "../../user/products/comment/CommentList.vue";

const toastStore = useToastStore();
const productStore = useProductStore();

const showAddProductDialog = ref(false);
const showCommentDialog = ref(false);
const showDeleteDialog = ref(false);
const selectedProduct = ref(null);
const searchQuery = ref('');


const handleChangeDialog = (value) => {
    showAddProductDialog.value = value

    if (!value) {
        selectedProduct.value = null;
    }
}

const handleCommentDialog = (value) => {
    showCommentDialog.value = value

    if (!value) {
        selectedProduct.value = null;
    }
}

const handleDeleteDialog = (value, product = null) => {
    showDeleteDialog.value = value
    selectedProduct.value = product;
}


const handleDelete = () => {
    deleteProductById(selectedProduct.value.id)
        .then((res) => {
            productStore.deleteProduct(selectedProduct.value.id);
            toastStore.showToast("success", res.data.message);
            selectedProduct.value = null;
        })
        .catch((err) => {
            toastStore.showToast("error", err.response.data.message);
        });

    handleDeleteDialog(false);
}

const handleUpdate = (product) => {
    selectedProduct.value = { ...product }
    handleChangeDialog(true);
}

const handleSubmit = (formData) => {
    createAndUpdateProduct(formData)
        .then((res) => {
            if (selectedProduct.value) {
                productStore.updateProduct(res.data.product);
            } else {
                productStore.addProduct(res.data.product);
            }
            toastStore.showToast("success", res.data.message);
            selectedProduct.value = null;
        })
        .catch((err) => {
            toastStore.showToast("error", err.response.data.message);
        });

    handleChangeDialog(false);
}

onMounted(() => {
    getAllProducts().then((res) => {
        productStore.setProducts(res.data.products);
    })
        .catch((err) => {
            toastStore.showToast("error", err.response.data.message);
        });
});

const handleOpenCommentDialog = (product) => {
    selectedProduct.value = product;
    handleCommentDialog(true);
}
</script>

<style scoped>
input[type=file]::file-selector-button {
    display: none;
}
</style>