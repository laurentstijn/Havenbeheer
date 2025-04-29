// js/dataManager.js
import { collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from './firebase.js';

export async function loadPiers() {
    const pierRef = collection(db, "piers");
    const querySnapshot = await getDocs(pierRef);
    const piers = [];

    querySnapshot.forEach((docSnap) => {
        const pier = docSnap.data();
        pier.id = docSnap.id;
        piers.push(pier);
    });

    return piers;
}

export async function savePier(pierData) {
    const pierRef = collection(db, "piers");
    const docRef = await addDoc(pierRef, pierData);
    console.log("Nieuwe steiger opgeslagen met ID:", docRef.id);
    return docRef.id;
}

export async function deletePier(pierId) {
    const pierDocRef = doc(db, "piers", pierId);
    await deleteDoc(pierDocRef);
    console.log("Steiger verwijderd:", pierId);
}
