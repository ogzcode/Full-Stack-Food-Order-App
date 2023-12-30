<template>
    <div class="bg-red-50 border border-orange-500 rounded mb-12 text-orange-600 p-4 flex items-center gap-4 mt-6">
        <Icons name="exclamation-circle-fill" :size="24" :style="'fill-orange-600'" />
        <p>
            You don't have any order history yet. To start ordering, please complete your user information in Settings.
        </p>
    </div>
</template>

<script setup>
import Icons from '../../../../components/Icons.vue';
</script>

<style scoped></style>