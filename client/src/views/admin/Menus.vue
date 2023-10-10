<template>
    <div class="p-12">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl text-slate-700 font-bold tracking-wide">Products</h1>
            <div class="flex gap-x-4 items-center">
                <input type="text"
                    class="border border-slate-200 rounded w-[240px] p-2 outline-0 text-slate-800 text-sm"
                    placeholder="Search Products..." />
                <button class="flex items-center bg-sky-500 text-white px-4 py-2 text-sm rounded"
                    @click="handleChangeAddDialog(true)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pencil mr-2" viewBox="0 0 16 16">
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                    <span class="font-medium tracking-wide">New Products</span>
                </button>
            </div>
        </div>
        <div class="pt-12 flex gap-12 flex-wrap justify-around">
            <template v-for="(product, i) in productStore.products" :key="i">
                <ProductCard :price="product.price" :name="product.name" :description="product.description" :image="product.image"/>
            </template>
        </div>
    </div>
    <Dialog headerTitle="Add Product" :show="showAddProductDialog" @close="handleChangeAddDialog" submit-text="Create">
        <template v-slot:body>
            <form>
                <div class="mb-4">
                    <label class="text-xs text-slate-500">Product Name</label>
                    <input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800"
                        v-model="name" />
                </div>
                <div class="mb-4">
                    <label class="text-xs text-slate-500">Product Description</label>
                    <textarea class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800"
                        v-model="description"></textarea>
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Product Price</label>
                    <input type="number" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800"
                        v-model="price" min="0" />
                </div>

                <div class="mb-4">
                    <label class="block mb-2 text-xs text-slate-500">Upload
                        file</label>
                    <input class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" type="file">
                </div>

            </form>
        </template>
    </Dialog>
</template>

<script setup>
import { onMounted } from 'vue';
import { getAllProducts } from "../../services/requestServices.js";
import { useProductStore } from '../../stores/product';
import Dialog from '../../components/Dialog.vue';
import ProductCard from './components/ProductCard.vue';

import { ref } from 'vue';

const productStore = useProductStore();

const showAddProductDialog = ref(false);
const name = ref('');
const description = ref('');
const price = ref(0);


const handleChangeAddDialog = (value) => {
    showAddProductDialog.value = value
}

const handleFileChange = (e) => {
    console.log(e.target.files[0])
}

onMounted(() => {
    getAllProducts().then((res) => {
        productStore.setProducts(res.data.products);
    });
});

</script>

<style scoped>
input[type=file]::file-selector-button {
    display: none;
}
</style>