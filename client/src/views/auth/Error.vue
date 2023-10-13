<template>
    <div class="min-h-screen flex justify-center items-center bg-slate-50">
        <div class="bg-rose-600 p-8 shadow-xl rounded-lg text-center">
            <h1 class="text-4xl font-bold tracking-wide text-slate-900">404 Not Found</h1>
            <p class="text-center text-xl mt-4 text-white font-light">Some things went wrong :( </p>
            <router-link :to="{ name: 'Landing'}" class="text-slate-800 bg-white px-8 py-2 mt-8 inline-block rounded">Go Home</router-link>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>