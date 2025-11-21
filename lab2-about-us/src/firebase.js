// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbVO4DSQOqbl30BNwRGsvRpFbjcqHISOw",
  authDomain: "fir-react-d1db1.firebaseapp.com",
  projectId: "fir-react-d1db1",
  storageBucket: "fir-react-d1db1.firebasestorage.app",
  messagingSenderId: "421519947624",
  appId: "1:421519947624:web:53ef368cb89541ebab48dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
