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
    {
      path: "/",
      name: "User",
      component: () => import("@/views/user/User.vue"),
      children: [
        {
          path: "/",
          name: "HomePage",
          component: () => import("@/views/user/home/Home.vue")
        },
        {
          path: "about",
          name: "About",
          component: () => import("@/views/user/about/About.vue")
        },
        {
          path: "contact",
          name: "Contact",
          component: () => import("@/views/user/contact/Contact.vue")
        },
      ]
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/views/admin/Admin.vue"),
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

export default router
