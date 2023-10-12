<template>
    <div class="min-h-screen bg-orange-50 flex justify-center">
        <div class="w-1/2 bg-white p-8">
            <h1 class="text-slate-800 text-2xl font-medium tracking-wide mb-2">Settings</h1>
            <form>
                <div class="mb-4">
                    <label class="text-xs text-slate-500">Name</label>
                    <input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" />
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Email</label>
                    <input type="email" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" />
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Old Password</label>
                    <input type="password" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" />
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">New Password</label>
                    <input type="password" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" />
                </div>

                <div class="mb-4">
                    <label class="text-xs text-slate-500">Phone</label>
                    <input type="text" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" />
                </div>
                <div class="mb-4">
                    <label class="text-xs text-slate-500">Address</label>
                    <textarea class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800"></textarea>
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
import DeleteAccount from './components/DeleteAccount.vue';
</script>

<style scoped></style>