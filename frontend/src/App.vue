<template>
  <div class="left-0 right-0 bottom-0 top-0 h-screen">
    <Navbar />
    <RouterView />
  </div>

  <div class="bottomm-full"><Footer/></div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import './index.css';
import { useApp } from "./stores";
export default {
  name: "App",
  components: {Navbar, Footer},
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
