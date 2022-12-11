<template>
  <nav>
    <router-link
      class="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline"
      to="/list">List</router-link>
    <!-- <router-link class="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline" to="/home">Home</router-link> -->
  </nav>
  <div>
    <div class="rounded-lg
            bg-blue-900
            w-full
            items-center
            lg:w-5/12
            my-44
            mx-auto
            xl:p-10
            lg:p-8
            relative
            flex
            justify-center
            lg:flex-row
            hover:shadow-md
            border border-green-800
          ">
      <section class="
              w-full
              focus:border-green-800 focus:ring-1 focus:ring-green-800 focus
              outline-none
              text-white
              placehorder
              rounded-lg
              pl-4
              py-2
              mb-4
            ">
        <h1 class="text-3xl text-center font-bold">Pendekin</h1>
        <br />
        <form id="new-todo-form" @submit.prevent="addTodo">
          <input class="
                  w-full
                  focus:border-green-800 focus:ring-1 focus:ring-green-800 focus
                  outline-none
                  text-black
                  placehorder
                  rounded-lg
                  pl-4
                  py-2
                  mb-4
                " type="text" required name="content" id="content" placeholder="https/" v-model="real_link" />

          <button class="w-full bg-green-700 rounded-lg" type="submit" value="SUBMIT">
            Transform!
          </button>
        </form>
        <br />

        <section>
          <h1 class="text-3xl text-center font-bold">List of URLS:</h1>
          <div class="list" id="todo-list">
            <br />
            <div class="bg-gray-800 rounded-lg gap-y-5" v-for="todo in lists" :class="`todo-item ${todo.done && 'done'}`" :key="todo">
              <br />
              <a @click="counterTodo(todo)" class="flex items-center flex justify-center" target="_blank"
                v-bind:href="todo.short">{{ currentHost
                }}/{{ todo.short }}</a>

              <div class="rounded-lg bg-blue-500 w-20 itens-center m-auto relative flex justify-center lg:flex-col">
                <button class="delete">
                  {{ todo.count }}
                </button>
              </div>
              <br />
              <h3 class="flex items-center flex justify-center">Delete</h3>
              <div class="rounded-lg bg-red-500 w-20 itens-center m-auto relative flex justify-center lg:flex-col" type="delete" value="SUBMIT">
                <button class="delete" @click="removeTodo(todo.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
              <br>
              <h3 class="flex items-center flex justify-center">Edit</h3>
              <div >
                <button  class="rounded-lgitens-center m-auto relative flex justify-center lg:flex-col"
                  @click="(todo.editState = !todo.editState)"><i class="fa fa-edit rounded-lg bg-green-300 w-20 h-9 itens-center m-auto relative flex justify-center lg:flex-col"></i></button>
                <div v-if="todo.editState">
                  <br>
                  <form>
                    <input v-model="edit_link"
                      class="
                  w-full
                  focus:border-green-800 focus:ring-1 focus:ring-green-800 focus
                  outline-none
                  text-black
                  placehorder
                  rounded-lg
                  pl-4
                  py-2
                  mb-4
                " 
                      type="url" pattern="https://.*" aria-label="URL" placeholder="https//" required />
                    <br>

                    <button
                      class="w-20 bg-green-700 text-white text-sm font-bold py-2 px-4 rounded"
                      @click="(todo.editState = !todo.editState); editLink(todo)">Save</button>
                  
                    <button
                      class="w-20 bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
                      @click="todo.editState = !todo.editState">Cancel</button>
                  </form>
                </div>
              </div>
              <br>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>

</template>
  
<script>
import { ref, onMounted, computed, watch } from "vue";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  increment,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeMPJUXfdmr0lYAWKuKxmJHwE5MO5c25Q",
  authDomain: "cloud-firestore-36a71.firebaseapp.com",
  projectId: "cloud-firestore-36a71",
  storageBucket: "cloud-firestore-36a71.appspot.com",
  messagingSenderId: "652464637762",
  appId: "1:652464637762:web:3c02fc9923b880dd42eadb"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export default {
  data() {
    return {
      lists: [],
      name: "HomeView",
      real_link: "",
      edit_link: "",
      short: "",
      update: false,
      currentHost: window.location.host,
    };
  },
  methods: {
    async addTodo() {
      // String Randomize
      let r = (Math.random() + 1).toString(36).substring(7);
      try {
        await axios.post("http://localhost:3000/shorts/", {
          random_link: r,
          real_link: this.real_link,
          uid: localStorage.getItem('userToken'),
          editState: false,
          count: 0
        })
        this.load();
      } catch (e) {
        console.log("Gagal menambahkan", e);
      }
    },

    signOut() {
      auth
        .signOut()
        .then(() => {
          console.log("Sign Out completed");
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },

    async removeTodo(short) {
      const res = await axios.delete(`http://localhost:3000/shorts/${short}`)
        .then((response) => {
          console.log(response);
          this.load()
        })
    },

    async updatedone(todo) {
      await updateDoc(doc(db, "shorten_list", todo.id), {
        done: !todo.done,
      });
    },
    async load() {
      try {
        axios.get("http://localhost:3000/shorts").then((res) => {
          console.log(res.data);
          this.lists = res.data;
          console.log(this.lists);
        });
      } catch (err) {
        console.log(err);
      }
    },

    async editLink(todo) {
      const id = todo.id
      console.log(todo.id)
      await axios.patch("http://localhost:3000/shorts/" + id, {
        real_link: this.edit_link
      })
        .then((result) => {
          console.log(result);
          this.load();
        }).catch((error) => {
          console.log(error);
        });
    },

    async counterTodo(todo) {
      const counter = doc(db, "shorten_list", todo.id);
      await updateDoc(counter, {
        "count": increment(1)
      })
      this.load();
    }

  },

  mounted() {
    // this.app.sessionCheck();
    this.load();
  },
};
</script>
  
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>