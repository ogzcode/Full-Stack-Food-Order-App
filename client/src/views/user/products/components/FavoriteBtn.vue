<template>
    <div class="absolute right-2 top-2 flex items-center">
        <button class=" rounded-full p-3 bg-slate-100" @click="handleChangeFavority()">
            <template v-if="!isFavorities">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart fill-slate-700"
                    viewBox="0 0 16 16">
                    <path
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
            </template>
            <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart-fill fill-red-500"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>
            </template>
        </button>
    </div>
</template>

<script setup>
import { useProductStore } from "../../../../stores/product.js";
import { setProductFavority } from "../../../../services/request/ProductRequest";

const productStore = useProductStore();

const props = defineProps({
    isFavorities: {
        type: Boolean,
        required: true
    },
    productId: {
        type: Number,
        required: true
    }
});

const handleChangeFavority = () => {
    setProductFavority(props.productId).then((res) => {
        productStore.updateProduct(res.data.product);
    });
}
</script>

<style scoped>
button {
    transition: all 0.3s ease-in-out;
}

button:active {
    transform: scale(0.9);
}
</style>