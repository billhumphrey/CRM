import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATS_FJDpzAtM251yrAYpQTDfQym6uplqQ",
  authDomain: "crm-56999.firebaseapp.com",
  projectId: "crm-56999",
  storageBucket: "crm-56999.firebasestorage.app",
  messagingSenderId: "868082155049",
  appId: "1:868082155049:web:7194294869fcd94cd76638",
  measurementId: "G-R382TCJ5XR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
