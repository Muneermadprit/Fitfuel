import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDisd4S3EzaqythFq--clLN6lPjksfKLgA",
    authDomain: "red-cable-434719-f8.firebaseapp.com",
    projectId: "red-cable-434719-f8",
    storageBucket: "red-cable-434719-f8.firebasestorage.app",
    messagingSenderId: "909650559623",
    appId: "1:909650559623:web:71ebe69e9a88efd68fae22",
    measurementId: "G-HK3CZR2L57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
