import { database, ref, set, onValue } from './firebase.js';

export const state = {
    piers: [],
    slots: [],
    boats: [],
    nextPierId: 1,
    nextSlotId: 1,
    nextBoatId: 1,
    selectedPier: null,
    selectedSlot: null,
    selectedBoat: null,
    drawingMode: 'select',
    tempPier: null,
    tempSlot: null,
    isDrawing: false
};

export const boatTypes = {
    sailboat: { name: 'Zeilboot', color: '#1E90FF', widthMultiplier: 1.5, height: 30 },
    motorboat: { name: 'Motorboot', color: '#FF6347', widthMultiplier: 1.2, height: 25 },
    yacht: { name: 'Jacht', color: '#9370DB', widthMultiplier: 2, height: 40 },
    small: { name: 'Kleine boot', color: '#3CB371', widthMultiplier: 1, height: 20 }
};

const sampleOwners = [
    { name: "Jan van Dijk", phone: "06-12345678", email: "jan@voorbeeld.nl" },
    { name: "Marie Jansen", phone: "06-87654321", email: "marie@voorbeeld.nl" },
    { name: "Piet Smit", phone: "06-11223344", email: "piet@voorbeeld.nl" },
    { name: "Anna de Vries", phone: "06-44332211", email: "anna@voorbeeld.nl" }
];

export function init() {
    setupFirebaseListeners();
    console.log('HarborManager geïnitialiseerd');
}

function setupFirebaseListeners() {
    // Implementeer Firebase listeners zoals eerder
}

export function getRandomOwner() {
    return sampleOwners[Math.floor(Math.random() * sampleOwners.length)];
}
