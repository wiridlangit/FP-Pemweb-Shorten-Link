// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeMPJUXfdmr0lYAWKuKxmJHwE5MO5c25Q",
  authDomain: "cloud-firestore-36a71.firebaseapp.com",
  projectId: "cloud-firestore-36a71",
  storageBucket: "cloud-firestore-36a71.appspot.com",
  messagingSenderId: "652464637762",
  appId: "1:652464637762:web:3c02fc9923b880dd42eadb"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)