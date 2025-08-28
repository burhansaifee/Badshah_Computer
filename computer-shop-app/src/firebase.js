import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCVT7XZTOn9M0HjXIbX3QTNUe7xTb41gy4",
  authDomain: "badshah-computer-d3717.firebaseapp.com",
  projectId: "badshah-computer-d3717",
  storageBucket: "badshah-computer-d3717.firebasestorage.app",
  messagingSenderId: "196143400271",
  appId: "1:196143400271:web:38eeea7e1fc90e304cb13a",
  measurementId: "G-V00LG65VES"
};

const app = initializeApp(firebaseConfig);

// Export Firestore and Auth services
export const db = getFirestore(app);
export const auth = getAuth(app);