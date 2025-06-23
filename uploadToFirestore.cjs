// uploadToFirestore.js

const fs = require("fs");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDixaaiIyG41MqaCYeBFeQHiTSVSGx8REg",
  authDomain: "webd-e8563.firebaseapp.com",
  projectId: "webd-e8563",
  storageBucket: "webd-e8563.firebasestorage.app",
  messagingSenderId: "676827359863",
  appId: "1:676827359863:web:5583a9e5091883a8d2b472",
  measurementId: "G-6P4XVDL7S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to load JSON and upload
async function uploadJsonToFirestore(filePath, collectionName) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  for (const item of data) {
    await addDoc(collection(db, collectionName), item);
  }
  console.log(`✅ Uploaded ${data.length} items to ${collectionName}`);
}

// Upload all three files
(async () => {
  try {
    await uploadJsonToFirestore("./docs/photofeed.json", "photofeed");
    await uploadJsonToFirestore("./docs/reelfeed.json", "reelfeed");
    await uploadJsonToFirestore("./docs/videofeed.json", "videofeed");
  } catch (err) {
    console.error("❌ Error uploading data:", err);
  }
})();
