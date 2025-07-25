import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv_AUYhyQzAleV0MkQBekkdjMyzystqHc",
  authDomain: "jonas-681de.firebaseapp.com",
  projectId: "jonas-681de",
  storageBucket: "jonas-681de.firebasestorage.app",
  messagingSenderId: "652136167878",
  appId: "1:652136167878:web:2ee119cf2d7be52fc99ac7",
  measurementId: "G-VV2HR7YN26"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
