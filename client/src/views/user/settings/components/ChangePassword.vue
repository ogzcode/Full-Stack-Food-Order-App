<template>
    <div class="bg-white p-8 shadow rounded-lg mb-8">
        <h2 class="text-slate-700 text-xl font-medium tracking-wide mb-4">Change Password</h2>
        <form @submit.prevent="handleSubmit">
            <FormInput label="Current Password" v-model:value="oldPassword" :value="oldPassword"
                :type="showPassword['oldPassword'] ? 'text' : 'password'">
                <template #body>
                    <VisibilityBtn :showPassword="showPassword['oldPassword']"
                        v-model:showPassword="showPassword['oldPassword']" />
                </template>
            </FormInput>

            <FormInput label="New Password" v-model:value="newPassword" :value="newPassword"
                :type="showPassword['newPassword'] ? 'text' : 'password'">
                <template #body>
                    <VisibilityBtn :showPassword="showPassword['newPassword']"
                        v-model:showPassword="showPassword['newPassword']" />
                </template>
            </FormInput>

            <FormInput label="Confirm Password" v-model:value="confirmPassword" :value="confirmPassword"
                :type="showPassword['confirmPassword'] ? 'text' : 'password'">
                <template #body>
                    <VisibilityBtn :showPassword="showPassword['confirmPassword']"
                        v-model:showPassword="showPassword['confirmPassword']" />
                </template>
                <template #error v-if="inputError.includes('password')">
                    <p class="text-red-500 text-xs absolute -bottom-5 left-0">Passwords do not match!</p>
                </template>
            </FormInput>
            <div class="mt-8">
                <button class="text-sm tracking-wide font-medium px-6 py-2 bg-sky-500 text-white rounded ">Update
                    Password</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToastStore } from '../../../../stores/toast';

import { changePassword } from "../../../../services/request/UserRequest.js"

import FormInput from '../../../auth/components/FormInput.vue';
import VisibilityBtn from '../../../auth/components/VisibilityBtn.vue';

const toastStore = useToastStore();

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const showPassword = ref({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
});

const inputError = ref([]);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.value !== confirmPassword.value) {
        inputError.value = ['password'];
        return;
    }

    const data = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
    };

    changePassword(data)
        .then((res) => {
            toastStore.showToast('success', 'Password changed successfully!');
        })
        .catch((err) => {

            toastStore.showToast('error', err.response.data.message);
        })
        .finally(() => {
            oldPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';
        });
};
</script>

<style scoped></style>