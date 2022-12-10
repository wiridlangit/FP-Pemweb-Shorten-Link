<template>

    <div>
      <div class="
            rounded-lg
            bg-gray-900
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
                <div class="todo-content">
                  http://localhost:5731/{{ todo.short }}
                </div>
  
                <div class="flex justify-center bg-red-400 rounded-lg" type="delete" value="SUBMIT">
                  <button class="delete" @click="removeTodo(todo.id)">
                    Delete
                  </button>
                </div>
                <br>
                <div class="flex justify-center bg-blue-400 rounded-lg" >
                <button class="delete" @click="editLink(todo.id)">
                  Update
                </button></div>
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
            uid: localStorage.getItem('userToken')
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
        // await deleteDoc(doc(db, "shorten_test", todo.id));
        // this.load();
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
     editLink() {
      Swal.fire({
        title: "Edit Link",
        input: "text",
        inputValue: "https://example.com",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Changed Successfully",
            "Your file has been changed.",
            "success"
          );
        }
      });
    },
    mounted() {
        this.app.sessionCheck();
        
    //   this.load();
    },
  };
  </script>
  
  