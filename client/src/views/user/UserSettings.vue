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

            <h1 class="text-slate-800 text-2xl font-medium tracking-wide mb-2 mt-12">Delete Account</h1>
            <p class="text-slate-600 font-light text-sm mb-4">
                Are you sure you want to delete your account?
                This action cannot be undone.
                All your data, including profile information, posts,
                and comments, will be permanently deleted.
                Please be certain before proceeding.
                If you still wish to proceed, enter your password to confirm:
            </p>
            <div class="mb-4">
                <label class="text-xs text-slate-500">Password</label>
                <input type="password" class="border border-slate-200 rounded w-full p-2 outline-0 text-slate-800" />
            </div>
            <button class="text-sm tracking-wide font-medium px-6 py-2 text-red-500 border border-red-500 rounded transition hover:bg-red-500 hover:text-white">Delete Account</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>