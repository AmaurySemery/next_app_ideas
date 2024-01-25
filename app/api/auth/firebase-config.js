// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAz51QKjcyak3rgd0ig80YGaGZ4JomktZA",
  authDomain: "next-app-ideas-ee2e2.firebaseapp.com",
  projectId: "next-app-ideas-ee2e2",
  storageBucket: "next-app-ideas-ee2e2.appspot.com",
  messagingSenderId: "194245947666",
  appId: "1:194245947666:web:c99d77d7cceaec6fce83cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;