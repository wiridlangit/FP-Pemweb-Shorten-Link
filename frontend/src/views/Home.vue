<template>
  <router-link class="flex-w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white" to="/list">List</router-link>
  <!-- <form @submit.prevent="app.newLink()" class="rounded-lg bg-white-500 w-full itens-center lg:w-3/12 m-auto xl:p-10 lg:p-8 relative flex justify-center lg:flex-col my-40">
    <h3 class="flex justify-center text-3xl font-bold tracking-tight text-gray-900">Shorten Link</h3>

    <label for="email">Full Link:</label>
    <input class="border w-full" type="email" name="email" v-model="email" required>

    <button class="flex-w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Submit</button>
    <div v-if="error">{{ error }}</div>
  </form> -->

  <div>
      <div class="rounded-lg bg-blue-900 w-full itens-center lg:w-3/12 m-auto xl:p-10 lg:p-8 relative flex justify-center lg:flex-col my-40">
     
        <section class="  w-full focus:border-green-800 focus:ring-1 focus:ring-green-800 focus outline-none  text-white placehorder rounded-lg pl-4 py-2 mb-4 ">
          <h1 class="text-3xl text-center font-bold">SHORT YOUR LINK</h1>
          <br />
          <form  @submit.prevent>
            <input class="  w-full focus:border-green-800 focus:ring-1 focus:ring-green-800 focus outline-none  text-black placehorder rounded-lg pl-4 py-2 mb-4" type="text" required name="content" id="content" placeholder='http://' v-model="real_link" />
            <div class="input-group-addon">
                    <strong></strong>
                </div>
            <button @click="addTodo()" class="w-full bg-green-700 rounded-lg" type="submit" value="SUBMIT">
              GO
            </button>
          
          </form>
          <br />
          <section class="todo-list">
            <h1 class="text-3xl text-center font-bold">YOUR CUSTOM LINK :</h1>
            <div class="list" id="todo-list">
              <br />
              <div v-for="todo in lists" :class="`todo-item ${todo.done && 'done'}`" :key="todo">
                <br />
                <div class="todo-content">
                  http://localhost:5731/{{ todo.short }}
                </div>

                <div class="flex justify-center w-full bg-red-700 rounded-lg" type="delete" value="SUBMIT">
                  <button class="delete" @click="removeTodo(todo)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>

</template>


<script>
// import { useView } from "../stores/index.js";
import { initializeApp } from "firebase/app";
import axios from "axios";
import {
  getFirestore,
  collection,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: 'AIzaSyCeMPJUXfdmr0lYAWKuKxmJHwE5MO5c25Q',
	authDomain: 'cloud-firestore-36a71.firebaseapp.com',
	projectId: 'cloud-firestore-36a71',
	storageBucket: 'cloud-firestore-36a71.appspot.com',
	messagingSenderId: '652464637762',
	appId: '1:652464637762:web:3c02fc9923b880dd42eadb'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  data() {
    return {
      name: "HomeView",
      lists: [],
      real_link: "",
    };
  },
  methods: {
    async addTodo() {
      // String Randomize
      let r = (Math.random() + 1).toString(36).substring(7);
      try {
        await axios.post("http://localhost:3000/shorts/", {
          random_link: r,
          real_link: this.real_link
        })

        this.load();
      } catch (e) {
        console.log("Gagal menambahkan", e);
      }
    },

    async removeTodo(todo) {
      const id = todo.id
      await axios.delete("http://localhost:3000/shorts/" + id)
      // await deleteDoc(doc(db, "shorten_test", todo.id));
      this.load();
    },

    selected(slot) {
      this.categor = slot;
    },

    async updatedone(todo) {
      await updateDoc(doc(db, "shorten_test", todo.id), {
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
  },
  mounted() {
    this.load();
  },


// setup() {
//     const view = useView();
//     return {
//       view,
//     };
//   },
};
</script>

