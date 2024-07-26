// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyArW8D6wiKZdZ29MbLZWN6Y52Ccfoa5Nuk",
    authDomain: "dilgenie-339b9.firebaseapp.com",
    databaseURL: "https://dilgenie-339b9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dilgenie-339b9",
    storageBucket: "dilgenie-339b9.appspot.com",
    messagingSenderId: "521589499173",
    appId: "1:521589499173:web:894e475b006ae9d06666cc",
    measurementId: "G-GFZ47SL7YQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);