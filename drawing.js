import { state } from './state.js';
import { renderHarbor } from './harbor.js';

export function startDrawing(e) {
    if (e.target.id !== 'harbor') return;
    state.isDrawing = true;
    if (state.drawingMode === 'pier') {
        state.tempPier = { x: e.offsetX, y: e.offsetY, width: 0, height: 0 };
    } else if (state.drawingMode === 'slot') {
        state.tempSlot = { x: e.offsetX, y: e.offsetY, width: 30, height: 30 };
    }
    renderHarbor();
}

export function continueDrawing(e) {
    if (!state.isDrawing) return;
    if (state.drawingMode === 'pier' && state.tempPier) {
        state.tempPier.width = e.offsetX - state.tempPier.x;
        state.tempPier.height = e.offsetY - state.tempPier.y;
    } else if (state.drawingMode === 'slot' && state.tempSlot) {
        state.tempSlot.width = e.offsetX - state.tempSlot.x;
        state.tempSlot.height = e.offsetY - state.tempSlot.y;
    }
    renderHarbor();
}

export function finishDrawing() {
    state.isDrawing = false;
}
