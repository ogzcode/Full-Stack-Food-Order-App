<template>
    <div class="min-h-screen bg-zinc-50 flex justify-center">
        <div class="w-3/4">
            <h1 class="text-slate-800 text-2xl font-semibold tracking-wider my-4">Settings</h1>
            <UserDetails />
            <ChangePassword />
            <DeleteAccount />
        </div>

    </div>
</template>

<script setup>
import UserDetails from './components/UserDetails.vue';
import ChangePassword from './components/ChangePassword.vue';
import DeleteAccount from './components/DeleteAccount.vue';

/* const auhtStore = useAuth();
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
        address: address.value,
    };

    auhtStore.updateUserDetails(data);
};

watch(() => auhtStore.error, (error) => {
    if (error) {
        toastStore.showToast('error', error);
    }
})
 */
</script>

<style scoped></style>