<template>
    <header class="min-h-[5rem] flex justify-between items-center lg:px-20 px-10 relative" ref="header">
        <h1 class="lg:text-4xl text-2xl font-bold tracking-wide text-white">Food<span class="text-orange-600">-ER</span>
        </h1>
        <button class="sm:hidden block" @click="handleShow">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list fill-white"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
        </button>
        <div class="items-center lg:gap-20 gap-10 sm:flex sm:flex-row flex-col"
            :class="[showMenu ? 'mobile-menu' : 'hidden']">
            <nav>
                <a class="lg:mx-8 mx-4 font-medium tracking-wide text-white hover:text-orange-600 transition"
                    href="#home">Home</a>
                <a class="lg:mx-8 mx-4 font-medium tracking-wide text-white hover:text-orange-600 transition"
                    href="#services">Services</a>
                <a class="lg:mx-8 mx-4 font-medium tracking-wide text-white hover:text-orange-600 transition"
                    href="#menu">Menu</a>
                <a class="lg:mx-8 mx-4 font-medium tracking-wide text-white hover:text-orange-600 transition"
                    href="#contact">Contact</a>
            </nav>
            <AuthButton />
        </div>
    </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import AuthButton from './components/AuthButton.vue';

const scrollY = ref(0);
const showMenu = ref(false);
const header = ref(null);


window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY;
});


onMounted(() => {
    if (window.innerWidth > 640) {
        showMenu.value = false;
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
        showMenu.value = false;
    }
})

watch(scrollY, () => {
    if (scrollY.value > window.innerHeight - 160) {
        if (showMenu.value) {
            showMenu.value = false;
        }

        header.value.classList.add('header', 'bg-zinc-900', 'shadow-lg');
        header.value.classList.remove('bg-transparent');
    } else {
        header.value.classList.add('bg-transparent');
        header.value.classList.remove('header', 'bg-zinc-900', 'shadow-lg');
    }
});

const handleShow = () => {
    showMenu.value = !showMenu.value;
};

</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s ease;
}

.mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgb(26, 32, 44, .8);
    padding: 1rem;
    padding-bottom: 2rem;
}

.mobile-menu nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.mobile-menu nav a {
    font-size: 1.5rem;
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

@media screen and (min-width: 640px) {
    .mobile-menu {
        display: none;
    }
}
</style>