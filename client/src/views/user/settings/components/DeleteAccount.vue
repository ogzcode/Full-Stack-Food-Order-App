<template>
    <div class="bg-white p-8 shadow rounded-lg mb-8">
        <h2 class="text-slate-800 text-xl font-medium tracking-wide mb-4">Delete Account</h2>
        <p class="text-slate-700 font-normal text-sm mb-4">
            Are you sure you want to delete your account?
            This action cannot be undone.
            All your data, including profile information, posts,
            and comments, will be permanently deleted.
            Please be certain before proceeding.
            If you still wish to proceed, enter your password to confirm:
        </p>
        <FormInput label="Password" v-model:value="password" :value="password" :type="showPassword ? 'text' : 'password'">
            <template #body>
                <VisibilityBtn :showPassword="showPassword" v-model:showPassword="showPassword" />
            </template>
        </FormInput>
        <button @click="handleClickDelete"
            class="text-sm tracking-wide font-medium px-6 py-2 text-red-500 border border-red-500 rounded transition hover:bg-red-500 hover:text-white">Delete
            Account</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '../../../../stores/auth';
import { useToastStore } from '../../../../stores/toast';
import FormInput from '../../../auth/components/FormInput.vue';
import VisibilityBtn from '../../../auth/components/VisibilityBtn.vue';

const authStore = useAuth();
const toastStore = useToastStore();

const showPassword = ref(false);
const password = ref('');

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