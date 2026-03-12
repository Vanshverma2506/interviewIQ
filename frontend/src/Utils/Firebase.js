import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-bbfc7.firebaseapp.com",
  projectId: "interviewiq-bbfc7",
  storageBucket: "interviewiq-bbfc7.firebasestorage.app",
  messagingSenderId: "849845609902",
  appId: "1:849845609902:web:2e03eabb39090963a2143f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider= new GoogleAuthProvider();

export {auth,provider};