<template>
    <div class="min-h-screen w-screen bg-orange-50 flex justify-center items-center overflow-hidden">
        <div class="flex-1 image-container">
            <img :src="login" alt="login" />
        </div>
        <div class="flex-1">
            <form class=" rounded p-8 mx-20" @submit.prevent="handleLogin">
                <h1 class="text-3xl text-left text-slate-700 mb-2 font-semibold tracking-wide">Sign In</h1>
                <p class="text-zinc-600 mb-4">
                    Sign in for delicious food and amazing offers!
                </p>
                <FormInput label="Email" v-model:value="email" :value="email">
                    <template #error v-if="inputError.includes('email')">
                        <p class="text-red-500 text-xs mt-1">Enter a valid email address.</p>
                    </template>
                </FormInput>
                <FormInput label="Password" v-model:value="password" :value="password"
                    :type="showPassword ? 'text' : 'password'">
                    <template #body>
                        <span class="absolute top-1/2 translate-y-1 right-2 text-slate-800" @click="togglePassword">
                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
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
                    </template>
                    <template #error v-if="inputError.includes('password')">
                        <p class="text-red-500 text-xs absolute -bottom-4 left-0">Enter a valid password(0-9, A-Z, a-z and
                            longer than 8
                            characters).</p>
                    </template>
                </FormInput>
                <FormBtn text="Sign In" />
                <router-link :to="{ name: 'Signup' }" class="text-xs text-slate-600 mt-2 block">Don't have an account? <span
                        class="underline">Sign Up</span></router-link>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '../../stores/auth';
import { useToastStore } from '../../stores/toast';
import FormBtn from './components/FormBtn.vue';
import FormInput from './components/FormInput.vue';

import login from "../../assets/images/other/login.jpg"
import { validateInputForSubmit } from "../../utils/util.js";

const authStore = useAuth();
const toastStore = useToastStore();

const showPassword = ref(false);
const email = ref('');
const password = ref('');

const inputError = ref([]);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

const handleLogin = (e) => {
    e.preventDefault();

    inputError.value = validateInputForSubmit(email.value, password.value);

    if (inputError.value.length > 0) {
        return;
    }

    authStore.login({ email: email.value, password: password.value });
    showPassword.value = false;
    email.value = '';
    password.value = '';
}

watch(() => authStore.error, (value) => {
    if (value) {
        toastStore.showToast('error', value);
        authStore.clearError();
    }
});

</script>


<style scoped>
input:focus {
    outline: 2px solid #fed7aa;
}

img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
}

@media (max-width: 768px) {
    .image-container {
        display: none;
    }
}
</style>