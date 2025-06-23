
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzK3dawU4u5_GDM6HX4InTkAMFW2A6Ers",
  authDomain: "feed-flow-control-app.firebaseapp.com",
  projectId: "feed-flow-control-app",
  storageBucket: "feed-flow-control-app.firebasestorage.app",
  messagingSenderId: "687818733040",
  appId: "1:687818733040:web:f566954dfe4858707cd935",
  measurementId: "G-2YPL0JRBN6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
