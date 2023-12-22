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
</script>

<style scoped></style>