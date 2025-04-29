import { init as initFirebase } from './firebase.js';
import { init as initHarborManager } from './harborManager.js';
import { init as initUI } from './uiManager.js';
import { init as initDataManager } from './dataManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialisatie volgorde is belangrijk
    initFirebase();
    initHarborManager();
    initUI();
    initDataManager();
    
    console.log('Applicatie geïnitialiseerd');
});
