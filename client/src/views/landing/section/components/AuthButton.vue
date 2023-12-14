<template>
    <div class="flex items-center gap-x-8 container">
        <router-link :to="{ name: 'Login' }">
            <div  class="auth-box">
                <span class="font-medium tracking-wide text-white hover:text-orange-600">Login</span>
                <span class="auth-icon hidden text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </span>
            </div>
        </router-link>
        <router-link :to="{ name: 'Signup' }">
            <div class="auth-box">
                <span
                    class="font-medium tracking-wide text-white lg:bg-orange-600 lg:hover:bg-orange-700 transition lg:px-6 lg:py-2 lg:rounded">Sign
                    Up</span>
                <span class="auth-icon hidden text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                        class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                        <path fill-rule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </span>
            </div>
        </router-link>
    </div>
</template>

<script setup>

</script>

<style scoped>
@media screen and (max-width: 1024px) {
    .auth-box > span:nth-child(1) {
        display: none;
    }

    .auth-icon {
        display: inline;
        margin-bottom: 0;
    }
}

@media screen and (max-width: 640px) {
    .container {
        justify-content: center;
    }
}
</style>