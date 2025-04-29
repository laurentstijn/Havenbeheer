import { state } from './state.js';
import { renderHarbor } from './harbor.js';

export function setupEventListeners() {
    document.getElementById('selectMode').addEventListener('click', () => {
        state.drawingMode = 'select';
        updateDrawingModeUI();
    });
    document.getElementById('drawPierMode').addEventListener('click', () => {
        state.drawingMode = 'pier';
        updateDrawingModeUI();
    });
    document.getElementById('drawSlotMode').addEventListener('click', () => {
        state.drawingMode = 'slot';
        updateDrawingModeUI();
    });
}

export function updateUI() {
    renderHarbor();
}

export function updateDrawingModeUI() {
    console.log('Mode veranderd naar', state.drawingMode);
}

export function updateSyncStatus(msg) {
    document.getElementById('syncStatus').textContent = msg;
}
