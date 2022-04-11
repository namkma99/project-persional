// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArMlaVOYWpdg0jMTF-9dWq2Uw4fisffNY",
  authDomain: "test-1de50.firebaseapp.com",
  databaseURL: "https://test-1de50-default-rtdb.firebaseio.com",
  projectId: "test-1de50",
  storageBucket: "test-1de50.appspot.com",
  messagingSenderId: "686425594604",
  appId: "1:686425594604:web:2380d4ef2a42ac86e9e3c9",
  measurementId: "G-WP71PPYQ4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);