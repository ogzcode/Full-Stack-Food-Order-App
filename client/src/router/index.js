import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Landing",
      component: () => import("@/views/landing/LandingPage.vue"),
      meta: {
        requiresAuth: false,
      },
    }
  ]
})

export default router
