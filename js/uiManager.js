import { state, boatTypes } from './harborManager.js';
import { savePiersToFirebase, saveSlotsToFirebase, saveBoatsToFirebase } from './dataManager.js';

export function init() {
    setupEventListeners();
    updateDrawingModeUI();
    console.log('UI Manager geïnitialiseerd');
}

export function renderHarbor() {
    // Implementeer render logica zoals eerder
}

export function updateUI() {
    // Implementeer UI update logica zoals eerder
}

function setupEventListeners() {
    // Implementeer event listeners zoals eerder
}

function updateDrawingModeUI() {
    // Implementeer drawing mode UI update
}
