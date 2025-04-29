import { setupEventListeners } from './ui.js';
import { setupFirebaseListeners } from './firebase.js';
import { startDrawing, continueDrawing, finishDrawing } from './drawing.js';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupFirebaseListeners();
    const harbor = document.getElementById('harbor');
    harbor.addEventListener('mousedown', startDrawing);
    harbor.addEventListener('mousemove', continueDrawing);
    harbor.addEventListener('mouseup', finishDrawing);
});
