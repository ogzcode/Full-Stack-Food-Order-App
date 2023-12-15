<template>
    <div class="min-h-screen w-screen bg-orange-50 flex justify-center items-center overflow-hidden">
        <div class="flex-1 image-container">
            <img :src="register" alt="register" />
        </div>
        <div class="flex-1">
            <form class="p-8 mx-20" @submit.prevent="handleSubmit">
                <h1 class="text-3xl text-left text-slate-700 mb-2 font-semibold tracking-wide">Sign Up</h1>
                <p class="text-zinc-600 mb-4">
                    Sign up to access amazing food!
                </p>
                <FormInput label="Full Name" v-model:value="fullName" :value="fullName"/>
                <FormInput label="Email" v-model:value="email" :value="email" :type="email">
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
                        <p class="text-red-500 text-xs mt-1">Enter a valid password(0-9, A-Z, a-z and longer than 8 characters).</p>
                    </template>
                </FormInput>
                <router-link :to="{ name: 'Login' }" class="text-xs text-slate-600">Do you have an account? <span
                        class="underline">Sign In</span></router-link>
                <FormBtn text="Sign Up" />
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '../../stores/auth';
import { useToastStore } from '../../stores/toast';
import register from "../../assets/images/other/register.jpg"
import FormBtn from './components/FormBtn.vue';
import FormInput from './components/FormInput.vue';
import { validateInputForSubmit } from "../../utils/util.js";

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const fullName = ref('');
const inputError = ref([]);

const authStore = useAuth();
const toastStore = useToastStore();

const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

const handleSubmit = (e) => {
    e.preventDefault();

    inputError.value = validateInputForSubmit(email.value, password.value)

    if (inputError.value.length > 0) {
        return;
    }

    authStore.signup({ email: email.value, password: password.value, fullName: fullName.value });
    showPassword.value = false;
    email.value = '';
    password.value = '';
    fullName.value = '';
}
watch(() => authStore.error, (value) => {
    if (value) {
        toastStore.showToast('error', value);
        authStore.clearError();
    }
});

</script>


<style scoped>
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