import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js';

const firebaseConfig = {
    apiKey: "AIzaSyBrvdXyuMpgkC4lFKjQDeHNihzFRbzMANU",
    authDomain: "tekensvg.firebaseapp.com",
    databaseURL: "https://tekensvg-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tekensvg",
    storageBucket: "tekensvg.appspot.com",
    messagingSenderId: "180262088073",
    appId: "1:180262088073:web:6470e50e3ad8a587ef8558"
};

let database;

export function init() {
    const app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    console.log('Firebase geïnitialiseerd');
}

export { database, ref, set, onValue };
