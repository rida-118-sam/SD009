// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDixaaiIyG41MqaCYeBFeQHiTSVSGx8REg",
  authDomain: "webd-e8563.firebaseapp.com",
  projectId: "webd-e8563",
  storageBucket: "webd-e8563.firebasestorage.app",
  messagingSenderId: "676827359863",
  appId: "1:676827359863:web:5583a9e5091883a8d2b472",
  measurementId: "G-6P4XVDL7S0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
