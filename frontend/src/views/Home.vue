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

        <section class="todo-list">
          <h1 class="text-3xl text-center font-bold">List of URLS:</h1>
          <div class="list" id="todo-list">
            <br />
            <div v-for="todo in lists" :class="`todo-item ${todo.done && 'done'}`" :key="todo">
              <br />
              <!-- <a class="underline" :href="`http://localhost:3000/shorts/` + todo.short">
                  http://localhost:5731/{{ todo.short }}
                </a> -->

              <div class="flex items-center flex justify-center">
                <router-link :to="'/' + todo.short" target="_blank">
                  {{ currentHost }}/{{ todo.short }}</router-link>
              </div>

              <!-- <a class="card-text" :href="`http://localhost:3000/shorts/${short}` + todo.short"> -->

              <div class="flex justify-center bg-red-400 rounded-lg" type="delete" value="SUBMIT">
                <button class="delete" @click="removeTodo(todo.id)">
                  Delete
                </button>
              </div>
              <br>
              <div class="flex justify-center bg-blue-400 rounded-lg">
                <!-- <button class="update" @click="updateItem(id, customPath, real_link)"> -->
                <!-- <router-link to="/edit" custom v-slot="{ navigate }">

                  <button @click="navigate" role="link"> Edit </button> </router-link> -->
                <button class="flex justify-center blue-400 rounded-lg"
                  @click="(todo.editState = !todo.editState)">Edit</button>
                <div v-if="todo.editState">
                  <br>
                  <h3>Edit Link</h3>
                  <form>
                    <input v-model="edit_link"
                      class="w-full focus:border-blue-600 focus:ring-1 focus:ring-blue-500 focus:outline-none  text- text-black placeholder-gray-500 border border-gray-200 rounded-lg pl-4 py-2 mb-4"
                      type="url" pattern="https://.*" aria-label="URL" placeholder="blabla.com" required />
                    <br>

                    <button
                      class="w-20 bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
                      @click="(todo.editState = !todo.editState); editLink(todo)">Edit</button>
                    <button
                      class="w-20 bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
                      @click="todo.editState = !todo.editState">Cancel</button>
                  </form>
                </div>
              </div>
              <br>
              <!-- <div class="edit" v-show="editbar">
                <input type="text" placeholder="new slink" v-model="todo.newslink" />
                <input type="text" placeholder="new url" v-model="todo.newflink"/>
                <button type="submit" @click="editHandler(todo.id)">Submit Edit</button>
                </div> -->
              <!-- <form v-if="todo.update" id="update-form" @submit.prevent="editHandler()">
                  <input type="text" placeholder="new url" v-model="real_link.newflink"/>
               -->

              <!-- <input type="text" placeholder="new slink" v-model="newLink.newslink" /> -->

              <!-- <input class="
                  w-full
                  focus:border-green-800 focus:ring-1 focus:ring-green-800 focus
                  outline-none
                  text-black
                  placehorder
                  rounded-lg
                  pl-4
                  py-2
                  mb-4
                " type="text" required name="content" id="content" placeholder="https/" v-model="edit_link" />
              -->
              <!-- <button class="w-full bg-yellow-700 rounded-lg" type="submit" value="SUBMIT">
              Submit!</button> 
          </form> -->
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
      newflink: "",
      newslink: "",
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
          editState: false
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
      // await deleteDoc(doc(db, "shorten_list", todo.id));
      // this.load();
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
  },


  // async updateItem(id, real_link) {
  //             console.log(real_link)
  //             if (this.newRealLink == '') {
  //                 this.newRealLink = real_link
  //             }
  //             const res = await axios.post("/api/update", {
  //                 newRealLink: this.newRealLink,
  //                 id: id
  //             })
  //             this.lists = [];
  //             this.newRealLink = ''
  //         },

  // async editHandler(short) {
  //   const res = await axios.patch(`http://localhost:3000/shorts/${short}`, {
  //     newflink: this.newLink.newflink,
  //     newslink: this.newLink.newslink,
  //   })
  //   .then((response) => {
  //     location.reload()
  //     console.log(response)
  //   })
  // },
  // editLink(todo.id){
  //   this.lists.forEach((short) => {
  //     if(short.id == id){
  //       this.newLink.id = todo.id
  //       this.newLink.newflink = link.flink
  //       this.newLink.newslink = link.slink
  //     }
  //   })
  //   this.editbar = true;
  // })},


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