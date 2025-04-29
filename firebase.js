import { state } from './state.js';
import { updateUI, updateSyncStatus } from './ui.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js";

const firebaseConfig = {
    apiKey: "XXX",
    authDomain: "XXX",
    databaseURL: "XXX",
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX",
    appId: "XXX"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export function setupFirebaseListeners() {
    onValue(ref(database, 'piers'), snapshot => {
        state.piers = snapshot.val() || [];
        updateUI();
        updateSyncStatus('Steigers geladen');
    });
    onValue(ref(database, 'slots'), snapshot => {
        state.slots = snapshot.val() || [];
        updateUI();
        updateSyncStatus('Ligplaatsen geladen');
    });
    onValue(ref(database, 'boats'), snapshot => {
        state.boats = snapshot.val() || [];
        updateUI();
        updateSyncStatus('Boten geladen');
    });
}
