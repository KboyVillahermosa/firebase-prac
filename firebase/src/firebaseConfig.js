// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0dlxGNsO49xoolOko7baYzKOG4DvpL00",
  authDomain: "login-d2c1f.firebaseapp.com",
  projectId: "login-d2c1f",
  storageBucket: "login-d2c1f.appspot.com",
  messagingSenderId: "690676817121",
  appId: "1:690676817121:web:425035f2b9d888dcd66ba0",
  measurementId: "G-HR913FNHLV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
