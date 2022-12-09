import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import List from "../components/ListItems/ListItems.vue";

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
      name: 'ListItems',
      component: List
    }
  ],
});

export default router;
