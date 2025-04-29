import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js';
import { 
    getDatabase, 
    ref, 
    set as firebaseSet, 
    onValue as firebaseOnValue 
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js';

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
const database = getDatabase(app);

export { 
    database, 
    ref, 
    firebaseSet as set, 
    firebaseOnValue as onValue 
};
