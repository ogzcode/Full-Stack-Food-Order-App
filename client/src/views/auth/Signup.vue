<template>
    <div class="min-h-screen bg-orange-50 flex justify-center items-center">
        <form class="bg-white shadow rounded p-8 w-1/4">
            <h1 class="text-2xl text-center text-slate-700 mb-4 font-medium tracking-wide">Sign Up</h1>
            <div class="mb-4">
                <label class="text-sm text-slate-500">Full Name</label>
                <input type="text" class="border border-orange-400 rounded w-full p-2 outline-0 text-slate-800"
                    v-model="fullName" />
            </div>
            <div class="mb-4">
                <label class="text-sm text-slate-500">Email</label>
                <input type="text" class="border border-orange-400 rounded w-full p-2 outline-0 text-slate-800"
                    v-model="email" />
            </div>
            <div class="mb-4 relative">
                <label class="text-sm text-slate-500">Password</label>
                <input class="border border-orange-400 rounded w-full p-2 outline-0 text-slate-800"
                    v-model="password" :type="showPassword ? 'text' : 'password'"/>
                <span class="absolute top-1/2 translate-y-1 right-2 text-slate-800" @click="togglePassword">
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path
                            d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path
                            d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                </span>
            </div>
            <router-link :to="{ name: 'Login' }" class="text-xs text-slate-600">Do you have an account? <span class="underline">Login</span></router-link>
            <div class="text-center mt-8">
                <button class="text-white bg-orange-500 px-8 py-1 rounded hover:bg-orange-600" type="submit">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const fullName = ref('');

const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

</script>


<style></style>