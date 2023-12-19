// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcrGeP8uj0LlZ9CQJFwF5YpJ43rO6EByU",
  authDomain: "rein-firebase-test.firebaseapp.com",
  databaseURL: "https://rein-firebase-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rein-firebase-test",
  storageBucket: "rein-firebase-test.appspot.com",
  messagingSenderId: "270166841798",
  appId: "1:270166841798:web:2d2c7a5f4bee100f387ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export {auth, db};