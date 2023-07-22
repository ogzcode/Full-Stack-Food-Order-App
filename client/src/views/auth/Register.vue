<template>
    <div class="flex justify-center items-center min-h-screen bg-red-50 relative">
        <ErrorAlert :errors="errors" />
        <div class="max-[425px]:w-full xl:w-1/2 md:w-2/3 h-[520px] flex bg-white rounded-lg overflow-hidden shadow-lg">
            <div class="max-[768px]:hidden relative flex-1 z-0 flex justify-end items-center flex-col pb-4">
                <h1 class="text-white text-4xl font-black mb-4">Welcome!</h1>
                <p class="text-center w-2/3 text-white font-semibold">We are here to sign up for our restaurant. We aim to
                    bring you delicious food and a pleasant experience.</p>
                <img class="absolute top-0 left-0 w-full h-full object-cover opacity-90 -z-10"
                    src="../../assets/image/register.jpg" alt="" />
            </div>
            <div class="flex-1 flex justify-center items-center">
                <form class="lg:w-2/3" @submit.prevent="onSubmit">
                    <h1 class="text-4xl text-center font-semibold text-slate-600">Register</h1>

                    <div
                        class="my-8 flex items-center gap-4 before:h-0.5 before:flex-1 before:bg-rose-400  before:content-[''] after:h-0.5 after:flex-1 after:bg-rose-400  after:content-['']">
                        <span class="w-5 h-5 rounded-full bg-rose-400"></span>
                    </div>

                    <div class="mb-4">
                        <label :class="labelStyle">Username</label>
                        <input v-model="username" :class="inputStyle" type="text" placeholder="Enter your username" required />
                    </div>
                    <div class="mb-4">
                        <label :class="labelStyle">Email</label>
                        <input v-model="email" :class="inputStyle" type="email" placeholder="Enter your email" required />
                    </div>
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <label :class="labelStyle">Password</label>
                            <span v-if="showPassword" @click="handleShowPassword">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    class="bi bi-eye-fill fill-slate-700" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path
                                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                            </span>
                            <span v-else @click="handleShowPassword">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                    class="bi bi-eye-slash-fill fill-slate-700" viewBox="0 0 16 16">
                                    <path
                                        d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                    <path
                                        d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                            </span>
                        </div>
                        <input v-model="password" :class="inputStyle" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required />
                    </div>
                    <p class="text-sm text-center text-gray-500">Do you have an account ? <router-link
                            class="text-rose-500 font-medium" :to="{ name: 'Login' }">Login</router-link></p>
                    <button type="submit"
                        class="block mx-auto mt-6 bg-rose-500 px-8 py-2 text-white font-medium shadow-lg shadow-rose-500/50">Register</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '../../stores/auth';
import ErrorAlert from '../../components/alert/ErrorAlert.vue';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { errors } = storeToRefs(store);

const email = ref('');
const password = ref('');
const username = ref('');
const showPassword = ref(false);

const handleShowPassword = () => {
    showPassword.value = !showPassword.value;
}

const labelStyle = computed(() => "block text-gray-500 text-sm mb-1");
const inputStyle = computed(() => "border border-gray-400 outline-0 w-full px-2 py-1 rounded text-base text-gray-700 font-medium");

const onSubmit = () => {
    store.register({ email: email.value, password: password.value, username: username.value });
    email.value = '';
    password.value = '';
    username.value = '';
}

watch(errors, (value) => {
    if (value) {
        setTimeout(() => {
            store.setError("");
        }, 3000);
    }
});
</script>

<style scoped>
input::placeholder {
    font-weight: 400;
}</style>