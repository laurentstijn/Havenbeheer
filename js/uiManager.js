import { state, boatTypes, getRandomOwner, checkCollision } from './harborManager.js';
import { savePiersToFirebase, saveSlotsToFirebase, saveBoatsToFirebase } from './dataManager.js';

let harbor, noSelection, pierInfoDisplay, slotInfoDisplay, boatInfoDisplay, syncStatus;

export function init() {
    cacheDOMElements();
    setupEventListeners();
    updateDrawingModeUI();
    console.log('UI Manager geïnitialiseerd');
}

function cacheDOMElements() {
    harbor = document.getElementById('harbor');
    noSelection = document.getElementById('noSelection');
    pierInfoDisplay = document.getElementById('pierInfoDisplay');
    slotInfoDisplay = document.getElementById('slotInfoDisplay');
    boatInfoDisplay = document.getElementById('boatInfoDisplay');
    syncStatus = document.getElementById('syncStatus');
}

export function renderHarbor() {
    harbor.innerHTML = '';
    
    // Render piers
    state.piers.forEach(pier => {
        const pierEl = createPierElement(pier);
        harbor.appendChild(pierEl);
    });
    
    // Render slots
    state.slots.forEach(slot => {
        const slotEl = createSlotElement(slot);
        harbor.appendChild(slotEl);
    });
    
    // Render boats
    state.boats.forEach(boat => {
        const boatEl = createBoatElement(boat);
        harbor.appendChild(boatEl);
    });
    
    // Render temporary elements
    renderTempElements();
}

function createPierElement(pier) {
    const pierEl = document.createElement('div');
    pierEl.className = 'pier' + (state.selectedPier?.id === pier.id ? ' selected' : '');
    pierEl.style.left = `${pier.x}px`;
    pierEl.style.top = `${pier.y}px`;
    pierEl.style.width = `${pier.width}px`;
    pierEl.style.height = `${pier.height}px`;
    pierEl.dataset.id = pier.id;
    
    pierEl.addEventListener('click', (e) => handlePierClick(e, pier));
    return pierEl;
}

function createSlotElement(slot) {
    const slotEl = document.createElement('div');
    slotEl.className = `slot ${slot.occupied ? 'occupied' : 'available'}`;
    slotEl.style.left = `${slot.x}px`;
    slotEl.style.top = `${slot.y}px`;
    slotEl.style.width = `${slot.width}px`;
    slotEl.style.height = `${slot.height}px`;
    slotEl.dataset.id = slot.id;
    
    const nameEl = document.createElement('div');
    nameEl.className = 'slot-name';
    nameEl.textContent = slot.name;
    slotEl.appendChild(nameEl);
    
    slotEl.addEventListener('contextmenu', (e) => handleSlotContextMenu(e, slot));
    slotEl.addEventListener('click', (e) => handleSlotClick(e, slot));
    
    return slotEl;
}

function createBoatElement(boat) {
    const boatEl = document.createElement('div');
    boatEl.className = 'boat' + (state.selectedBoat?.id === boat.id ? ' selected' : '');
    boatEl.style.left = `${boat.x}px`;
    boatEl.style.top = `${boat.y}px`;
    boatEl.style.width = `${boat.width}px`;
    boatEl.style.height = `${boat.height}px`;
    boatEl.style.backgroundColor = boat.color;
    boatEl.dataset.id = boat.id;
    
    boatEl.innerHTML = `
        <div class="boat-name">${boat.name}</div>
        <div class="boat-type">${boat.typeName}</div>
        <div class="boat-size-info">${boat.size}m × ${boat.width}px</div>
    `;
    
    if (checkCollision(boat)) {
        boatEl.classList.add('collision-warning');
    }
    
    boatEl.addEventListener('click', (e) => handleBoatClick(e, boat));
    return boatEl;
}

function renderTempElements() {
    if (state.tempPier) {
        const tempPierEl = document.createElement('div');
        tempPierEl.className = 'pier temp-element';
        tempPierEl.style.left = `${state.tempPier.x}px`;
        tempPierEl.style.top = `${state.tempPier.y}px`;
        tempPierEl.style.width = `${Math.abs(state.tempPier.width)}px`;
        tempPierEl.style.height = `${Math.abs(state.tempPier.height)}px`;
        harbor.appendChild(tempPierEl);
    }
    
    if (state.tempSlot) {
        const tempSlotEl = document.createElement('div');
        tempSlotEl.className = 'slot temp-element';
        tempSlotEl.style.left = `${state.tempSlot.x}px`;
        tempSlotEl.style.top = `${state.tempSlot.y}px`;
        tempSlotEl.style.width = `${Math.abs(state.tempSlot.width)}px`;
        tempSlotEl.style.height = `${Math.abs(state.tempSlot.height)}px`;
        harbor.appendChild(tempSlotEl);
    }
}

export function updateUI() {
    renderHarbor();
    updateInfoPanel();
    updateFormFields();
}

function updateInfoPanel() {
    if (state.selectedBoat) {
        showBoatInfo();
    } else if (state.selectedSlot) {
        showSlotInfo();
    } else if (state.selectedPier) {
        showPierInfo();
    } else {
        showNoSelection();
    }
}

function updateFormFields() {
    document.getElementById('pierName').value = state.selectedPier?.name || '';
    document.getElementById('slotName').value = state.selectedSlot?.name || '';
}

// Event handlers en andere hulpfuncties blijven vergelijkbaar...
// [Hier zou je de rest van de event handlers implementeren]

export function updateSyncStatus(message, type = 'success') {
    syncStatus.textContent = message;
    syncStatus.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    setTimeout(() => {
        syncStatus.textContent = 'Verbonden met Firebase';
        syncStatus.style.backgroundColor = '#28a745';
    }, 3000);
}
