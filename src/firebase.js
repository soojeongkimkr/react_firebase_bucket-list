// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA39OnY93hBgJaOCVEdLUhIN4MtyruSsF4",
  authDomain: "sparta-react-basic-a99f9.firebaseapp.com",
  projectId: "sparta-react-basic-a99f9",
  storageBucket: "sparta-react-basic-a99f9.appspot.com",
  messagingSenderId: "780248010538",
  appId: "1:780248010538:web:07939b407a9bbdd4d29853",
  measurementId: "G-84NJ9Z42XK"
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();