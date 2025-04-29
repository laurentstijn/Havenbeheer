import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrvdXyuMpgkC4lFKjQDeHNihzFRbzMANU",
    authDomain: "tekensvg.firebaseapp.com",
    databaseURL: "https://tekensvg-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tekensvg",
    storageBucket: "tekensvg.appspot.com",
    messagingSenderId: "180262088073",
    appId: "1:180262088073:web:6470e50e3ad8a587ef8558"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
