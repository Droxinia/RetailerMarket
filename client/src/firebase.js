// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "retailer-market.firebaseapp.com",
  projectId: "retailer-market",
  storageBucket: "retailer-market.appspot.com",
  messagingSenderId: "221071906648",
  appId: "1:221071906648:web:516b1559bbbb1ad820b72d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);