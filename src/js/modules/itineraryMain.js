import itinerary from './itinerary.js';
import { calculateEstimatedCost, displayEstimatedCost } from './budget.js';

document.addEventListener('DOMContentLoaded', () => {
  renderItinerary();

  function renderItinerary() {
    const items = itinerary.getItems();
    // Suponiendo que tienes tabs para varios días
    const days = [document.getElementById('day1'), document.getElementById('day2')];
    days.forEach(day => {
      if (day) day.querySelector('ul').innerHTML = '';
    });

    items.forEach((item, idx) => {
      const dayIdx = idx % days.length;
      const ul = days[dayIdx]?.querySelector('ul');
      if (!ul) return;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${item.title}
        <span>
          <button class="btn btn-outline-secondary btn-sm me-2 edit-btn">Edit</button>
          <button class="btn btn-outline-danger btn-sm remove-btn">Remove</button>
        </span>
      `;
      // Eliminar
      li.querySelector('.remove-btn').addEventListener('click', () => {
        itinerary.removeItem(idx);
        renderItinerary();
      });
      // Editar
      li.querySelector('.edit-btn').addEventListener('click', () => {
        const newTitle = prompt('Edit item:', item.title);
        if (newTitle) {
          itinerary.editItem(idx, { ...item, title: newTitle });
          renderItinerary();
        }
      });
      ul.appendChild(li);
    });

    // Calcular y mostrar el costo estimado usando budget.js
    const cost = calculateEstimatedCost(
      items.filter(i => i.type === 'flight'),
      items.filter(i => i.type === 'hotel'),
      items.filter(i => i.type === 'attraction')
    );
    // Muestra el costo en el div de alerta
    const alertDiv = document.querySelector('.alert-info strong');
    displayEstimatedCost(alertDiv, cost);
  }
});

