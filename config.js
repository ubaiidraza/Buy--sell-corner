// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDEDzRnUZZFez2aPafI5mJoGCfMzo44XZA",
    authDomain: "buy-sell-corner-caea9.firebaseapp.com",
    projectId: "buy-sell-corner-caea9",
    storageBucket: "buy-sell-corner-caea9.appspot.com",
    messagingSenderId: "70066684385",
    appId: "1:70066684385:web:408a8fe2a6eed13e1192a0",
    measurementId: "G-KKDMRSKTVS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
