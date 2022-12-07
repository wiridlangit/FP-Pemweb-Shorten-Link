<template>
  <nav class="flex items-center justify-between">
    <h1 class="text-2xl">Pemweb FP Kelompok Pemdat</h1>

    <!-- for all users -->
    <!-- <div class="">
        <router-link to="/">Home</router-link>
      </div> -->

    <!-- for logged in users -->
    <div class="flex space-x-4">
      <button className="text-gray-600 hover:text-indigo-600" v-on:click="logout">Logout</button>
    </div>

    <!-- for logged out users -->
    <div class="flex space-x-4">
      <router-link class="py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0" to="/">Login</router-link>
      <router-link class="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline" to="/signup">Signup</router-link>
    </div>
  </nav>
</template>

<script>
import { useApp, useView } from "../stores/index.js";

export default {
  name: "App",
  setup() {
    const app = useApp();
    const view = useView();
    return {
      app,
      view,
    };
  },
  methods: {
    async logout () {
        await store.dispatch('logout')
        router.push('/')
  }
    }
  }
</script>
