import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDqdJpDtzX2XkyYyebeMWh1DwnWEgS_srQ",
  authDomain: "web-dev-d4f57.firebaseapp.com",
  projectId: "web-dev-d4f57",
  storageBucket: "web-dev-d4f57.appspot.com", 
  messagingSenderId: "287764447000",
  appId: "1:287764447000:web:ce8a4f23a17c70fe4ee86d",
  measurementId: "G-T6HZ3T36QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
