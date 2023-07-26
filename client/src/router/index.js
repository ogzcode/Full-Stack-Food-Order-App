import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';

import { getToken } from '../services/tokenServices';

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
    {
      path: "/about",
      name: "About",
      component: () => import("@/components/about/About.vue")
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/components/contact/Contact.vue")
    },
    {
      path: "/",
      name: "User",
      component: () => import("@/views/user/User.vue"),
      children: [
        {
          path: "/",
          name: "HomePage",
          component: () => import("@/views/user/home/Home.vue")
        }
      ]
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/views/admin/Admin.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "Orders",
          component: () => import("@/views/admin/Orders.vue")
        },
        {
          path: "products",
          name: "Products",
          component: () => import("@/views/admin/product/Products.vue"),
          children: [
            {
              path: "create",
              name: "CreateProduct",
              component: () => import("@/views/admin/product/CreateProduct.vue")
            },
            {
              path: "all-products",
              name: "AllProducts",
              component: () => import("@/views/admin/product/AllProducts.vue")
            }
          ]
        },
        {
          path: "users",
          name: "Users",
          component: () => import("@/views/admin/Users.vue")
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = getToken();

  if (token && Object.keys(authStore.user).length === 0) {
    authStore.verifyAuth();
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/login',
      });
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});


export default router
