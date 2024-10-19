// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPg-qRa-S7jAfHMCNyc6wzrkCW913qKk8",
  authDomain: "authenticationapp-6f771.firebaseapp.com",
  projectId: "authenticationapp-6f771",
  storageBucket: "authenticationapp-6f771.appspot.com",
  messagingSenderId: "841830602984",
  appId: "1:841830602984:web:6ebab5dd11be9d0523d15d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// importamos el metodo de autenticacion
const auth_user = getAuth(app)
export default auth_user;