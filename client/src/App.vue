<template>
  <main class="min-h-screen">
    <RouterView />
    <Toast />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuth } from './stores/auth';
import Toast from "./components/Toast.vue";
import Footer from "./views/landing/section/Footer.vue";

const authStore = useAuth();

onMounted(() => {
  authStore.checkAuth();
});
</script>

<style scoped></style>
