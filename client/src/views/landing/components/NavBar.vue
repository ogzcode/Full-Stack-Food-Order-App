<template>
    <header class="min-h-[5rem] flex justify-between items-center px-12">
        <div class="flex items-center gap-20">
            <h1 class="text-4xl font-bold tracking-wide text-slate-800">Food<span class="text-orange-600">-ER</span></h1>
            <nav>
                <a class="mx-8 font-medium tracking-wide text-slate-800 hover:text-orange-600 transition"
                    href="#home">Home</a>
                <a class="mx-8 font-medium tracking-wide text-slate-800 hover:text-orange-600 transition"
                    href="#services">Services</a>
                <a class="mx-8 font-medium tracking-wide text-slate-800 hover:text-orange-600 transition"
                    href="#menu">Menu</a>
                <a class="mx-8 font-medium tracking-wide text-slate-800 hover:text-orange-600 transition"
                    href="#contact">Contact</a>
            </nav>
        </div>
        <div>
            <router-link :to="{ name: 'Login' }"
                class="font-medium tracking-wide mx-8 text-slate-800 hover:text-orange-600">Login</router-link>
            <router-link :to="{ name: 'Signup' }"
                class="font-medium tracking-wide mx-8 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition">Sign
                Up</router-link>
        </div>
    </header>
</template>

<script setup>
</script>

<style scoped></style>