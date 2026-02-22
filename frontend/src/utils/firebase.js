import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-exams-notes.firebaseapp.com",
  projectId: "ai-exams-notes",
  storageBucket: "ai-exams-notes.firebasestorage.app",
  messagingSenderId: "1026261891022",
  appId: "1:1026261891022:web:842a054b9387e657691d9f"
};

const app = initializeApp(firebaseConfig);

const auth= getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider}