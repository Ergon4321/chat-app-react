import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-da43a.firebaseapp.com",
  projectId: "chatapp-da43a",
  storageBucket: "chatapp-da43a.appspot.com",
  messagingSenderId: "849283479971",
  appId: "1:849283479971:web:9f32f99a3c04dc950c8216"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()