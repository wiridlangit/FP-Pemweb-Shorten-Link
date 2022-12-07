<template>
  <div class="left-0 right-0 bottom-0 top-0">
    <Navbar />
    <RouterView />
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import './index.css';
import { useApp } from "./stores";
export default {
  name: "App",
  components: {Navbar},
  setup() {
    
    const app = useApp();
    return {
      app,
    };
  },
  beforeMount() {
    this.app.sessionCheck();
  },
};
</script>
