import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDSum3vVvNzJYhRh4gvhp8w-TRGti8vQw8",
    authDomain: "reactshopify.firebaseapp.com",
    projectId: "reactshopify",
    storageBucket: "reactshopify.appspot.com",
    messagingSenderId: "589816817670",
    appId: "1:589816817670:web:ff29c2ec4a1a5d53583b87"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;