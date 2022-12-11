import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";
import { auth } from '../firebase/config'
import { 
  signOut 
} from 'firebase/auth'

const URL_API = "http://localhost:3000/";

export const useApp = defineStore({
  id: "App",
  state: () => ({
    user: {
      logged_in: false,
    },
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        console.log("work")
        const res = await axios.post('http://localhost:3000/post/login', {
            email: email,
            password: password,
        })
        .then((response) => {
          console.log(response)
          console.log("ini Login")
          localStorage.setItem("userToken", response.data.uid);
          this.router.push("/home")
        })
      }
        catch(err){
          console.log(err)
          console.log("login error")
        }
      
    },
    async register(email, password ) {
      this.loading = true;
      this.error = null;
      console.log("register");
      try {
        const { data } = await axios
          .post(URL_API + "signup", {
            email,
            password,
          })
          .then((res) => {
            document.cookie = `token=${
              res.data.token
            }; path=/; expires=${new Date(
              res.data.expirationTime
            ).toUTCString()}`;
            document.cookie = `refreshToken=${
              res.data.refreshToken
            }; path=/; expires=${new Date(
              res.data.expirationTime
            ).toUTCString()}`;
            this.router.push("/");
          })
          .catch((error) => {
            // Todo: Handle error
            console.log(error.response.data.message.code);
            if (
              error.response.data.message.code === "auth/email-already-in-use"
            ) {
              // Swal.fire("Email already in use");
              Swal.fire({
                title: 'Error!',
                text: 'Email already in use',
                icon: 'error',
                confirmButtonText: 'Try Again'
              })
              console.log('email telah terdaftar')
            // }
          }});
        this.user = data.user;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
      
    },

    async logout () {
      await signOut(auth)
      this.router.push('/')
      localStorage.removeItem('userToken')

    },

    fetchUser () {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          this.CLEAR_USER
        } else {
          this.SET_USER(user)

          if (router.isReady() && router.currentRoute.value.path === '/') {
            this.router.push('/')
          }
        }
      })
    },

    sessionCheckLogin() {
      if (localStorage.getItem('userToken')) {
        this.router.push('/home')
      }
      else
      {
        return;
      }
    },

    sessionCheck() {
      if (!localStorage.getItem('userToken')) {
        this.router.push('/')
      }
      else
      {
        return;
      }
    },
  },
});

