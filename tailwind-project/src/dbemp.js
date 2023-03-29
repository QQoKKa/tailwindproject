import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc,setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBaLUQN4KC3eg4ej_qKCBYaferGezexg0E",
  authDomain: "workpanel-71266.firebaseapp.com",
  databaseURL: "https://workpanel-71266-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "workpanel-71266",
  storageBucket: "workpanel-71266.appspot.com",
  messagingSenderId: "564285495355",
  appId: "1:564285495355:web:e09b9e8af9d67c9a62241e",
  measurementId: "G-K6T9N8QWLT"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 const db = getFirestore();


export {db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc,setDoc};