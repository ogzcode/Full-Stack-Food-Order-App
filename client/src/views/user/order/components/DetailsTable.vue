<template>
    <div class="rounded-lg overflow-hidden border border-zinc-300">
        <table class="w-full table-auto">
            <thead>
                <tr class="text-left bg-slate-100 text-slate-600 uppercase text-xs">
                    <th class="sm:px-8 px-4 sm:py-6 py-4 font-bold">Product</th>
                    <th class="sm:px-8 px-4 sm:py-6 py-4 font-bold">Price</th>
                    <th class="sm:px-8 px-4 sm:py-6 py-4 font-bold">Quantity</th>
                    <th class="sm:px-8 px-4 sm:py-6 py-4 font-bold">Sub-Total</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200">
                <template v-for="(product, i) in props.orderProducts" :key="i">
                    <tr class="text-zinc-600 font-medium">
                        <td class="sm:px-8 px-4 sm:py-6 py-4">
                            <div class="flex items-center">
                                <img :src="getImgURL(product.image)" alt="Product Image" class="lg:w-20 sm:w-16 w-12 mr-2 rounded-full">
                                {{ product.name }}
                            </div>
                        </td>
                        <td class="sm:px-8 px-4 sm:py-6 py-4">{{ product.price }}</td>
                        <td class="sm:px-8 px-4 sm:py-6 py-4">{{ product.quantity }}</td>
                        <td class="sm:px-8 px-4 sm:py-6 py-4">{{ parseInt(product.price) * product.quantity }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { getImgURL } from "../../../../utils/util.js"

const props = defineProps({
    orderProducts: {
        type: Object,
        required: true,
    },
})

</script>

<style scoped></style>

