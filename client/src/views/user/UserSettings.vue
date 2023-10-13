<template>
    <div class="min-h-screen bg-orange-50 flex justify-center">
        <div class="w-1/2 bg-white p-8">
            <h1 class="text-slate-800 text-2xl font-medium tracking-wide mb-2">Settings</h1>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="text-xs text-slate-500">Name</label>
                    <input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="name"/>
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Email</label>
                    <input type="email" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="email"/>
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Old Password</label>
                    <input type="password" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="oldPassword" required/>
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">New Password</label>
                    <input type="password" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="newPassword"/>
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Phone</label>
                    <input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="phone"/>
                </div>
                <div class="mb-4">
                    <label class="text-xs text-slate-500">Address</label>
                    <textarea class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" v-model="address"></textarea>
                </div>
                <div class="mb-4">
                    <button class="text-sm tracking-wide font-medium px-6 py-2 bg-sky-500 text-white rounded ">Update
                        Profile</button>
                </div>
            </form>
            <DeleteAccount />
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useAuth } from '../../stores/auth';
import { useToastStore } from '../../stores/toast';
import DeleteAccount from './components/DeleteAccount.vue';

const auhtStore = useAuth();
const toastStore = useToastStore();

const name = ref(auhtStore.user.name);
const email = ref(auhtStore.user.email);
const oldPassword = ref('');
const newPassword = ref('');
const phone = ref(auhtStore.user.phone);
const address = ref(auhtStore.user.address);


const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
        name: name.value || auhtStore.user.name,
        email: email.value || auhtStore.user.email,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        phone: phone.value || auhtStore.user.phone,
        address: address.value ,
    };

    auhtStore.updateUserDetails(data);
};

watch(() => auhtStore.error, (error) => {
    if (error) {
        toastStore.showToast('error', error);
    }
})

</script>

<style scoped></style>