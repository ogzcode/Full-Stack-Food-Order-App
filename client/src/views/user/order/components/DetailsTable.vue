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
                <template v-for="(product, i) in data" :key="i">
                    <tr class="text-zinc-600 font-medium">
                        <td class="sm:px-8 px-4 sm:py-6 py-4">
                            <div class="flex items-center">
                                <img :src="product.image" alt="Product Image" class="lg:w-20 sm:w-16 w-12 mr-2 rounded-full">
                                {{ product.title }}
                            </div>
                        </td>
                        <td class="sm:px-8 px-4 sm:py-6 py-4">{{ product.price }}</td>
                        <td class="sm:px-8 px-4 sm:py-6 py-4">{{ product.quantity }}</td>
                        <td class="sm:px-8 px-4 sm:py-6 py-4">{{ product.total }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import image1 from '@/assets/images/landing/image-1.png'
import image2 from '@/assets/images/landing/image-2.png'
import image3 from '@/assets/images/landing/image-3.png'
import image6 from '@/assets/images/landing/image-6.png'
import image5 from '@/assets/images/landing/image-5.png'

const data = [
    {
        id: 1,
        image: image1,
        title: 'Product 1',
        price: 100,
        quantity: 2,
        total: 200,
    },
    {
        id: 2,
        image: image2,
        title: 'Product 2',
        price: 100,
        quantity: 2,
        total: 200,
    },
    {
        id: 3,
        image: image3,
        title: 'Product 3',
        price: 100,
        quantity: 2,
        total: 200,
    },
    {
        id: 4,
        image: image6,
        title: 'Product 4',
        price: 100,
        quantity: 2,
        total: 200,
    },
    {
        id: 5,
        image: image5,
        title: 'Product 5',
        price: 100,
        quantity: 2,
        total: 200,
    },
]
</script>

<style scoped></style>

