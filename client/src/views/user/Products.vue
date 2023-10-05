<template>
    <div class="p-12">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl text-slate-700 font-bold tracking-wide">Products</h1>
            <div>
                <input type="text" class="border border-slate-200 rounded w-[240px] p-2 outline-0 text-slate-800 text-sm"
                    placeholder="Search Products..." />
            </div>
        </div>
        <div class="pt-12 flex gap-12 flex-wrap justify-around">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
</template>

<script setup>
import Dialog from '../../components/Dialog.vue';
import ProductCard from '../admin/components/ProductCard.vue';

</script>

<style scoped>

</style>