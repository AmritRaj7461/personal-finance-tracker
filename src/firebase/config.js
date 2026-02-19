// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9tYUM2L8HuUlw_b70Jt6GNN5772z5dRs",
  authDomain: "personal-finance-tracker-a87d0.firebaseapp.com",
  projectId: "personal-finance-tracker-a87d0",
  storageBucket: "personal-finance-tracker-a87d0.firebasestorage.app",
  messagingSenderId: "10058034965",
  appId: "1:10058034965:web:8ab73a29cf62cadfccc31c",
  measurementId: "G-BC0ZC2SS7Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { db, auth, googleProvider };
