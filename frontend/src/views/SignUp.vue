<template>
  <form @submit.prevent="app.register(email, password)" class="mt-4 flex flex-col">
    <h3 class="text-3xl font-bold tracking-tight text-gray-900">Sign up</h3>

    <label for="email">Email:</label>
    <input class="border w-4/12" type="email" name="email" v-model="email" required>


    <label for="email">Password:</label>
    <input class="border w-4/12" type="password" name="password" v-model="password" required>


    <button class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>
  
<script>
import { useApp } from "../stores/index.js";
export default {
  name: "RegisterView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
};
</script>