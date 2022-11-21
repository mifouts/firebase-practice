// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlkB0y50Lv8jR5XnDqMJVbGSfzodTGroo",
  authDomain: "fir-practice-5923b.firebaseapp.com",
  projectId: "fir-practice-5923b",
  storageBucket: "fir-practice-5923b.appspot.com",
  messagingSenderId: "92800915968",
  appId: "1:92800915968:web:0aaa366b64a9224ff896e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();