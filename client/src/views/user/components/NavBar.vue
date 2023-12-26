<template>
    <header class="min-h-[5rem] flex justify-between items-center lg:px-12 px-6 border-b">
        <h1 class="lg:text-4xl text-3xl font-bold tracking-wide text-slate-800">Food<span class="text-orange-600">-ER</span>
        </h1>
        <template v-if="!showMenu">
            <NormalMenu @open-order-dialog="handleOpen" @logout="logout" />
        </template>
        <MobileMenu :active="showMenu" @close-menu="handleShow" @logout="logout" @open-order-dialog="handleOpen" />
        <button class="md:hidden block p-3 border border-gray-700 rounded-full text-gray-700" @click="handleShow">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="currentColor" viewBox="0 0 448 512">
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
        </button>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from "../../../stores/auth";
import NormalMenu from './menu/NormalMenu.vue';
import MobileMenu from './menu/MobileMenu.vue';

const authStore = useAuth();
const showMenu = ref(false);

const handleShow = () => {
    showMenu.value = !showMenu.value;
};

const emits = defineEmits(['openDialog']);

const logout = () => {
    authStore.logout();
}

const handleOpen = () => {
    emits('openDialog', true);
}

onMounted(() => {
    if (window.innerWidth > 768) {
        showMenu.value = false;
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        showMenu.value = false;
    }
})

window.addEventListener("scroll", () => {
    if (window.innerWidth > 768 || showMenu.value === true) {
        showMenu.value = false;
    }
})

</script>

<style scoped></style>