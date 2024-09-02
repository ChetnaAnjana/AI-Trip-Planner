// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEmR5ntKI7FOECVUFJzfCZc3-HgCuMUK0",
  authDomain: "ai-travel-planner-83fd3.firebaseapp.com",
  projectId: "ai-travel-planner-83fd3",
  storageBucket: "ai-travel-planner-83fd3.appspot.com",
  messagingSenderId: "900340908141",
  appId: "1:900340908141:web:fe87ca0c1908acad167f64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);