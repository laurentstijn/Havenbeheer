import { state } from './state.js';

export function renderHarbor() {
    const harbor = document.getElementById('harbor');
    harbor.innerHTML = '';
    state.piers.forEach(pier => {
        const el = document.createElement('div');
        el.className = 'pier';
        el.style.left = pier.x + 'px';
        el.style.top = pier.y + 'px';
        el.style.width = pier.width + 'px';
        el.style.height = pier.height + 'px';
        harbor.appendChild(el);
    });
    state.slots.forEach(slot => {
        const el = document.createElement('div');
        el.className = 'slot';
        el.style.left = slot.x + 'px';
        el.style.top = slot.y + 'px';
        el.style.width = slot.width + 'px';
        el.style.height = slot.height + 'px';
        harbor.appendChild(el);
    });
}
