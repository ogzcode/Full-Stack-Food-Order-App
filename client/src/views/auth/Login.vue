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
                        <VisibilityBtn :showPassword="showPassword" v-model:showPassword="showPassword" />
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
import VisibilityBtn from './components/VisibilityBtn.vue';

import login from "../../assets/images/other/login.jpg"

const authStore = useAuth();
const toastStore = useToastStore();

const showPassword = ref(false);
const email = ref('');
const password = ref('');

const inputError = ref([]);

const handleLogin = (e) => {
    e.preventDefault();

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