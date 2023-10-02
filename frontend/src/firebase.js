// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-30ae8.firebaseapp.com",
  projectId: "mern-auth-30ae8",
  storageBucket: "mern-auth-30ae8.appspot.com",
  messagingSenderId: "766495800833",
  appId: "1:766495800833:web:feaeedf03afe68f69d0a00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);