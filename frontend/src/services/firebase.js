// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Ensure environment variables are correctly loaded
const firebaseConfig = {
  apiKey: "AIzaSyBYcqrm0TlNG9OWgswuIFIJysolO7cPNRY",
  authDomain: "cooking-assitant.firebaseapp.com",
  projectId: "cooking-assitant",
  storageBucket: "cooking-assitant.firebasestorage.app",
  messagingSenderId: "426003391904",
  appId: "1:426003391904:web:f8a4fdb856b5f8db83f0c5",
  measurementId: "G-ZV17Q0NF8C"
};

// ✅ Ensure Firebase is initialized once
const app = initializeApp(firebaseConfig);

// ✅ Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

