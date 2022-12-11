import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
// import Edit from '../views/Edit.vue';
import List from "../components/List.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    // {
    //   path: '/edit',
    //   name: 'edit',
    //   component: Edit
    // },
    {
      path: '/:full',
      name: 'Redirect',
      component: () =>
      import(/* webpackChunkName: "about" */ "../views/Redirect.vue"),
    }
  ],
});

export default router;
