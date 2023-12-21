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
                <FormInput label="User Name" v-model:value="username" :value="username" />
                <FormInput label="Email" v-model:value="email" :value="email" :type="email">
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
                        <p class="text-red-500 text-xs mt-1">Enter a valid password(0-9, A-Z, a-z and longer than 8
                            characters).</p>
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
import VisibilityBtn from './components/VisibilityBtn.vue';
import { validateInputForSubmit } from "../../utils/util.js";

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const username = ref('');
const inputError = ref([]);

const authStore = useAuth();
const toastStore = useToastStore();

const handleSubmit = (e) => {
    e.preventDefault();

    inputError.value = validateInputForSubmit(email.value, password.value)

    if (inputError.value.length > 0) {
        return;
    }

    authStore.signup({ email: email.value, password: password.value, username: username.value });
    showPassword.value = false;
    email.value = '';
    password.value = '';
    username.value = '';
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