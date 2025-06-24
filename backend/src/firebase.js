// Replace values below with your actual Firebase config
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaam8RVhRTX22jS0k1wUnThdXcE_5pkJQ",
  authDomain: "sd009-4f86c.firebaseapp.com",
  projectId: "sd009-4f86c",
  storageBucket: "sd009-4f86c.firebasestorage.app",
  messagingSenderId: "955262693622",
  appId: "1:955262693622:web:c938d15a3773aed9c23cd7",
  measurementId: "G-ZZWPXE42JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db services
export const auth = getAuth(app);
export const db = getFirestore(app);
