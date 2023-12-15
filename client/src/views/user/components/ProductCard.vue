<template>
    <div class="w-[320px] border rounded relative transition hover:border-orange-500">
        <div class="absolute right-2 top-2 flex items-center">
            <button @click="handleAdd" class=" rounded-full p-2"
                :class="[props.productIsHere ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
            </button>
            <template v-if="props.productIsHere">
                <span class="px-2 text-slate-600">{{ getOrderQuantity() }}</span>
                <button @click="handleDelete" class=" rounded-full p-2"
                    :class="[props.productIsHere ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                    </svg>
                </button>
            </template>
        </div>
        <div class="p-4">
            <img :src="getImgURL(product.image)" class="" />
        </div>
        <div class="px-8 py-4 flex justify-between items-center">
            <div class="w-1/2">
                <p class="text-slate-800 font-semibold text-xl text-ellipsis">{{ product.name }}</p>
                <p class="text-slate-500 font-light text-sm mt-1 text-ellipsis">{{ product.description }}</p>
            </div>
            <div>
                <p class="font-bold text-orange-600 text-xl text-right">${{ product.price }}</p>
                <button @click="$emit('commentDialog')" class="flex items-center gap-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill text-orange-500" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill text-orange-500" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill text-orange-500" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill text-slate-300" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill text-slate-300" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useOrderStore } from '../../../stores/order';
import { getImgURL } from "../../../utils/util";

const orderStore = useOrderStore();

const props = defineProps({
    product: {
        type: Object
    },
    productIsHere: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['addProduct', "deleteProduct", "commentDialog"]);

const handleAdd = () => {
    emits('addProduct');
}

const handleDelete = () => {
    emits('deleteProduct');
}

const getOrderQuantity = () => {
    return orderStore.getOrderQuantity(props.product.id);
}


</script>

<style scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
