<template>
  <nav>
      <router-link class="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline" to="/home">Home</router-link>
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
          <br />
          <br />

          <section class="todo-list">
            <h1 class="text-3xl text-center font-bold">List of URLS:</h1>
            <div class="list" id="todo-list">
              <br />
              <div v-for="todo in lists" :class="`todo-item ${todo.done && 'done'}`" :key="todo">
                <br />
                <div class="todo-content">
                  http://localhost:5731/{{ todo.short }}
                </div>
  
                <div class="flex justify-center bg-red-400 rounded-lg" type="delete" value="SUBMIT">
                  <button class="delete" @click="removeTodo(todo.id)">
                    Delete
                  </button>
                </div>
                <br>
                <div class="flex justify-center bg-blue-400 rounded-lg">
                <!-- <button class="update" @click="updateItem(id, customPath, real_link)"> -->
                    <button class="update" @click= "todo.update = !todo.update">
                  Update
                </button>
            </div>
            <br>
            <form v-if="todo.update" id="update-form" @submit.prevent="updateItem()">
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
                " type="text" required name="content" id="content" placeholder="https/" v-model="edit_link" />
  
            <button class="w-full bg-yellow-700 rounded-lg" type="submit" value="SUBMIT">
              Submit!
            </button>
          </form>
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
          short:"",
          update:false,
          newRealLink:"",
          newCustomPath:"",
        };
      },
      methods: {
    
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
      },
       
      async updateItem(id, customPath, real_Link) {
                  console.log(customPath)
                  console.log(real_Link)
                  if (this.newCustomPath == '') {
                      this.newCustomPath = customPath.replace("http://localhost:5731/")
                  }
                  if (this.newRealLink == '') {
                      this.newRealLink = real_Link
                  }
                  const res = await axios.post("/api/update", {
                      newCustomPath: this.newCustomPath,
                      newRealLink: this.newRealLink,
                      id: id
                  })
                  this.links = [];
                  this.getLinks()
                  this.newCustomPath = ''
                  this.newRealLink = ''
              },
      mounted() {
          // this.app.sessionCheck();
        this.load();
      },
    };
    </script>
    
    