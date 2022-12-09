// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCeMPJUXfdmr0lYAWKuKxmJHwE5MO5c25Q',
	authDomain: 'cloud-firestore-36a71.firebaseapp.com',
	projectId: 'cloud-firestore-36a71',
	storageBucket: 'cloud-firestore-36a71.appspot.com',
	messagingSenderId: '652464637762',
	appId: '1:652464637762:web:3c02fc9923b880dd42eadb'
};

// Initialize Firebase
initializeApp(firebaseConfig);

// initialize Firestore
// const projectFirestore = firebase.firestore()
// export { projectFirestore }
//initialize authentication
const auth = getAuth();
export { auth };
