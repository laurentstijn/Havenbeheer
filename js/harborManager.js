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
    // Piers listener
    onValue(ref(database, 'piers'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            state.piers = data;
            if (state.piers.length > 0) {
                state.nextPierId = Math.max(...state.piers.map(p => p.id)) + 1;
            }
        }
    });

    // Slots listener
    onValue(ref(database, 'slots'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            state.slots = data;
            if (state.slots.length > 0) {
                state.nextSlotId = Math.max(...state.slots.map(s => s.id)) + 1;
            }
        }
    });

    // Boats listener
    onValue(ref(database, 'boats'), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            state.boats = data;
            if (state.boats.length > 0) {
                state.nextBoatId = Math.max(...state.boats.map(b => b.id)) + 1;
            }
        }
    });
}

export function getRandomOwner() {
    return sampleOwners[Math.floor(Math.random() * sampleOwners.length)];
}

export function addPier(pier) {
    state.piers.push(pier);
    return set(ref(database, `piers/${pier.id}`), pier);
}

export function removePier(pierId) {
    state.piers = state.piers.filter(p => p.id !== pierId);
    return set(ref(database, 'piers'), state.piers);
}

export function addSlot(slot) {
    state.slots.push(slot);
    return set(ref(database, `slots/${slot.id}`), slot);
}

export function removeSlot(slotId) {
    state.slots = state.slots.filter(s => s.id !== slotId);
    return set(ref(database, 'slots'), state.slots);
}

export function addBoat(boat) {
    state.boats.push(boat);
    return set(ref(database, `boats/${boat.id}`), boat);
}

export function removeBoat(boatId) {
    state.boats = state.boats.filter(b => b.id !== boatId);
    return set(ref(database, 'boats'), state.boats);
}

export function updateBoat(boat) {
    const index = state.boats.findIndex(b => b.id === boat.id);
    if (index !== -1) {
        state.boats[index] = boat;
    }
    return set(ref(database, `boats/${boat.id}`), boat);
}

export function checkCollision(boat) {
    if (boat.slotId) {
        const slot = state.slots.find(s => s.id === boat.slotId);
        if (slot && (
            boat.x < slot.x || 
            boat.x + boat.width > slot.x + slot.width || 
            boat.y < slot.y || 
            boat.y + boat.height > slot.y + slot.height
        )) {
            return true;
        }
    }

    return state.boats.some(otherBoat => {
        if (otherBoat.id === boat.id) return false;
        return (
            boat.x < otherBoat.x + otherBoat.width &&
            boat.x + boat.width > otherBoat.x &&
            boat.y < otherBoat.y + otherBoat.height &&
            boat.y + boat.height > otherBoat.y
        );
    });
}
