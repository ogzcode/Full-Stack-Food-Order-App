import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/auth/Login.vue")
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/auth/Register.vue")
    },
  ]
})

export default router
