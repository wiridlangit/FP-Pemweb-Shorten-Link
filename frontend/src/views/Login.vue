<template>
  <form @submit.prevent="app.login(email, password)" class="rounded-lg bg-white-500 w-full itens-center lg:w-3/12 m-auto xl:p-10 lg:p-8 relative flex justify-center lg:flex-col my-40">
    <h3 class="flex justify-center text-3xl font-bold tracking-tight text-gray-900">Login</h3>

    <label for="email">Email:</label>
    <input class="border w-full" type="email" name="email" v-model="email" required>

    <label for="email">Password:</label>
    <input class="border w-full" type="password" name="password" v-model="password" required>

    <button class="flex-w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Login</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>


<script>
import { useApp } from "../stores/index.js";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  beforeMount() {
    if(this.app.user.logged_in) {
      this.$router.push("/");
    }
  },
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
  mounted() {
    this.app.sessionCheckLogin();
  }
};
</script>

