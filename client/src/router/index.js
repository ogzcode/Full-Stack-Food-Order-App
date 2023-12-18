import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

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
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/views/admin/AdminPage.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "AdminHome",
          redirect: { name: "Orders" },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "orders",
          name: "Orders",
          component: () => import("@/views/admin/Orders.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "products",
          name: "Products",
          component: () => import("@/views/admin/Menus.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "users",
          name: "Users",
          component: () => import("@/views/admin/Users.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ]
    },
    {
      path: "/user",
      name: "User",
      component: () => import("@/views/user/UserPage.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "UserHome",
          redirect: { name: "UserProducts" },
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "products",
          name: "UserProducts",
          component: () => import("@/views/user/Products.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "old-orders",
          name: "OldOrders",
          component: () => import("@/views/user/OldOrders.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("@/views/user/settings/UserSettings.vue"),
          meta: {
            requiresAuth: true,
          },
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/auth/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/auth/Signup.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/error",
      name: "Error",
      component: () => import("@/views/auth/Error.vue"),
      meta: {
        requiresAuth: false,
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuth()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        path: '/login'
      })
    }
    else {
      if (authStore.user?.role !== 'admin' && to.name === 'AdminHome') {
        next({
          name: 'UserHome'
        });
      } else if (authStore.user?.role === 'admin' && to.name === 'UserHome') {
        next({
          name: 'AdminHome'
        });
      } else {
        next();
      }
    }
  } else {
    next()
  }
})

export default router
