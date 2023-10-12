<template>
    <h1 class="text-slate-800 text-2xl font-medium tracking-wide mb-2 mt-12">Delete Account</h1>
    <p class="text-slate-600 font-light text-sm mb-4">
        Are you sure you want to delete your account?
        This action cannot be undone.
        All your data, including profile information, posts,
        and comments, will be permanently deleted.
        Please be certain before proceeding.
        If you still wish to proceed, enter your password to confirm:
    </p>
    <div class="mb-4 relative">
        <label class="text-sm text-slate-500">Password</label>
        <input class="border border-red-400 rounded w-full p-2 outline-0 text-slate-800" v-model="password"
            :type="showPassword ? 'text' : 'password'" required />
        <span class="absolute top-1/2 translate-y-1 right-2 text-slate-800" @click="togglePassword">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
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
    <button @click="handleClickDelete"
        class="text-sm tracking-wide font-medium px-6 py-2 text-red-500 border border-red-500 rounded transition hover:bg-red-500 hover:text-white">Delete
        Account</button>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '../../../stores/auth';
import { useToastStore } from '../../../stores/toast';

const authStore = useAuth();
const toastStore = useToastStore();

const showPassword = ref(false);
const password = ref('');


const togglePassword = () => {
    showPassword.value = !showPassword.value;
}

const handleClickDelete = () => {
    authStore.deleteAccountByUser(password.value);
    showPassword.value = false;
    password.value = '';
}

watch(() => authStore.error, (value) => {
    if (value) {
        toastStore.showToast("error", value);
    }
});
</script>

<style scoped></style>