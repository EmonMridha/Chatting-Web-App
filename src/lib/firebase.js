// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-7a14b.firebaseapp.com",
  projectId: "chatapp-7a14b",
  storageBucket: "chatapp-7a14b.firebasestorage.app",
  messagingSenderId: "339992728836",
  appId: "1:339992728836:web:e9fae07c4b49e87078ec51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()