<template>
  <RouterView />
  <Toast />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuth } from './stores/auth';
import Toast from "./components/Toast.vue";

const authStore = useAuth();

onMounted(() => {
  authStore.checkAuth();
});
</script>

<style scoped>

</style>
