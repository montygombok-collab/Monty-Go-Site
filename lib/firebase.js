// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTW6fLFYH28zwGN4ttpNYYCuI9egK_jt8",
    authDomain: "siri-stor-databases.firebaseapp.com",
    projectId: "siri-stor-databases",
    storageBucket: "siri-stor-databases.firebasestorage.app",
    messagingSenderId: "1044668950685",
    appId: "1:1044668950685:web:e873644d88e2df20d70c74",
    measurementId: "G-9K075PPBD6"
};

// تهيئة Firebase وتجنب تكرار الاتصال
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
