// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "vocab-11c75.firebaseapp.com",
  projectId: "vocab-11c75",
  storageBucket: "vocab-11c75.appspot.com",
  messagingSenderId: "299012034450",
  appId: "1:299012034450:web:2ce973b575ecac51edbb4b"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };