<template>
    <div class=" border-indigo-500 border p-4 rounded-lg bg-indigo-50 gap-x-8 flex items-center md:flex-row flex-col">
        <p class="flex-1 text-indigo-700 text-base font-medium">
            You don't currently have any pending orders to cancel. To place a new order, please visit the menu.
        </p>
        <router-link class="sm:px-8 px-6 sm:py-3 py-2 bg-indigo-600 rounded-md text-white md:mt-0 mt-4 flex items-center gap-x-2"
            :to="{ name: 'UserProducts'}">
            <Icons name="bag-plus" :size="20" :style="'fill-white'" />
            <span>Go to Menu</span>
        </router-link>
    </div>
</template>

<script setup>
import Icons from '../../../../components/Icons.vue';
</script>

<style scoped></style>
