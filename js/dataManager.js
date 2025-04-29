import { database, ref, set } from './firebase.js';
import { state } from './harborManager.js';

export function init() {
    console.log('DataManager geïnitialiseerd');
}

export function savePiersToFirebase() {
    set(ref(database, 'piers'), state.piers)
        .catch(error => console.error("Fout bij opslaan pieren:", error));
}

export function saveSlotsToFirebase() {
    set(ref(database, 'slots'), state.slots)
        .catch(error => console.error("Fout bij opslaan ligplaatsen:", error));
}

export function saveBoatsToFirebase() {
    set(ref(database, 'boats'), state.boats)
        .catch(error => console.error("Fout bij opslaan boten:", error));
}
