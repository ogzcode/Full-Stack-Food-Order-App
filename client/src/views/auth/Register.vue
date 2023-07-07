<template>
    <div class="flex justify-center items-center min-h-screen bg-red-50 relative">
        <div class="w-1/2 h-[480px] flex bg-white rounded-lg overflow-hidden shadow-lg">
            <div class="relative flex-1 z-0 flex justify-end items-center flex-col pb-4">
                <h1 class="text-white text-4xl font-black mb-4">Welcome!</h1>
                <p class="text-center w-2/3 text-white font-semibold">We are here to sign up for our restaurant. We aim to
                    bring you delicious food and a pleasant experience.</p>
                <img class="absolute top-0 left-0 w-full h-full object-cover opacity-90 -z-10"
                    src="../../assets/image/register.jpg" alt="" />
            </div>
            <div class="flex-1 flex justify-center items-center">
                <form class="w-1/2">
                    <h1 class="text-4xl text-center font-semibold text-slate-800">Register</h1>

                    <div
                        class="my-8 flex items-center gap-4 before:h-0.5 before:flex-1 before:bg-rose-400  before:content-[''] after:h-0.5 after:flex-1 after:bg-rose-400  after:content-['']">
                        <span class="w-5 h-5 rounded-full bg-rose-400"></span>
                    </div>

                    <div class="mb-4">
                        <label :class="labelStyle">Username</label>
                        <input :class="inputStyle" type="text" placeholder="Enter your username" />
                    </div>
                    <div class="mb-4">
                        <label :class="labelStyle">Email</label>
                        <input :class="inputStyle" type="email" placeholder="Enter your email" required/>
                    </div>
                    <div class="mb-4">
                        <label :class="labelStyle">Password</label>
                        <input :class="inputStyle" type="password" placeholder="Enter your password" />
                    </div>
                    <p class="text-sm text-center text-gray-500">Do you have an account ? <router-link class="text-rose-500 font-medium" :to="{ name: 'Login' }">Login</router-link></p>
                    <button class="block mx-auto mt-6 bg-rose-500 px-8 py-2 text-white font-medium shadow-lg shadow-rose-500/50">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const labelStyle = computed(() => "block text-gray-500 text-sm mb-1");
const inputStyle = computed(() => "border border-gray-400 outline-0 w-full px-2 py-1 rounded text-gray-700 font-medium");

</script>

<style scoped>
input::placeholder {
    font-weight: 400;
}
</style>