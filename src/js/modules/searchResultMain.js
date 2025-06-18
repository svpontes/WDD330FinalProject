/*import { handleSearch, displaySearchResults,displayAttractions,displayFlights,displayHotels } from './search.js';
import itinerary from './itinerary.js'; // Asegúrate de tener este módulo


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', async () => {
  const destination = getQueryParam('destination');
  const departure = getQueryParam('departure');
  const ret = getQueryParam('return') || departure;

  if (destination && departure && ret) {
    try {
      const results = await handleSearch(destination, departure, ret);
      displaySearchResults(results);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-itinerary-btn')) {
    const type = e.target.dataset.type;
    const idx = e.target.dataset.idx;
    let item;
    if (type === 'flight') {
      item = window.lastResults.flights[idx];
    } else if (type === 'hotel') {
      item = window.lastResults.hotels[idx];
    } else if (type === 'attraction') {
      item = window.lastResults.attractions[idx];
    }
    if (item) {
      itinerary.addItem({ ...item, type });
      alert('Added to itinerary!');
    }
  }
});

export function displaySearchResults(results) {
  window.lastResults = results; // Para acceso global
  displayFlights(results.flights);
  displayHotels(results.hotels);
  displayAttractions(results.attractions);
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  // ...tu código de filtrado...
  displayFlights(filteredFlights);
  displayHotels(filteredHotels);
  displayAttractions(filteredAttractions);
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const priceRange = e.target.querySelector('input[placeholder="Price Range"]').value;
  const date = e.target.querySelector('input[type="date"]').value;
  const rating = e.target.querySelector('select').value;

  // Filtra los resultados globales según los criterios
  let filteredFlights = window.lastResults.flights;
  let filteredHotels = window.lastResults.hotels;
  let filteredAttractions = window.lastResults.attractions;

  // Ejemplo de filtro por precio (ajusta según tu estructura de datos)
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filteredFlights = filteredFlights.filter(f => f.price.total >= min && f.price.total <= max);
    filteredHotels = filteredHotels.filter(h => h.offers && h.offers[0].price.total >= min && h.offers[0].price.total <= max);
    filteredAttractions = filteredAttractions.filter(a => a.price >= min && a.price <= max);
  }

  // Ejemplo de filtro por rating (solo hoteles)
  if (rating && rating !== 'Hotel Rating') {
    const stars = parseInt(rating);
    filteredHotels = filteredHotels.filter(h => h.hotel.rating && parseInt(h.hotel.rating) === stars);
  }

  // Vuelve a mostrar los resultados filtrados
  displayFlights(filteredFlights);
  displayHotels(filteredHotels);
  displayAttractions(filteredAttractions);
});*/
import { handleSearch, displaySearchResults } from './search.js';
import itinerary from './itinerary.js'; // Assegure que este módulo exista e funcione

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Guarda resultados globais para filtragem
window.lastResults = {
  flights: [],
  hotels: [],
  attractions: []
};

document.addEventListener('DOMContentLoaded', async () => {
  const destination = getQueryParam('destination');
  const departure = getQueryParam('departure');
  const ret = getQueryParam('return') || departure;

  if (destination && departure && ret) {
    try {
      const results = await handleSearch(destination, departure, ret);
      window.lastResults = results;
      displaySearchResults(results);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }
});

// Delegação de evento para botão "Add to Itinerary"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-itinerary-btn')) {
    const type = e.target.dataset.type;
    const idx = parseInt(e.target.dataset.idx, 10);
    if (!window.lastResults) {
      alert('No results available yet.');
      return;
    }
    let item;
    if (type === 'flight') {
      item = window.lastResults.flights[idx];
    } else if (type === 'hotel') {
      item = window.lastResults.hotels[idx];
    } else if (type === 'attraction') {
      item = window.lastResults.attractions[idx];
    }
    if (item) {
      itinerary.addItem({ ...item, type });
      alert('Added to itinerary!');
    } else {
      alert('Item not found.');
    }
  }
});

// Filtragem unificada no formulário
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!window.lastResults) {
      alert('No search results to filter.');
      return;
    }

    const priceRangeInput = e.target.querySelector('input[placeholder="Price Range"]');
    const dateInput = e.target.querySelector('input[type="date"]');
    const ratingSelect = e.target.querySelector('select');

    const priceRange = priceRangeInput ? priceRangeInput.value.trim() : '';
    const date = dateInput ? dateInput.value : '';
    const rating = ratingSelect ? ratingSelect.value : '';

    // Copia dos arrays para filtrar
    let filteredFlights = window.lastResults.flights || [];
    let filteredHotels = window.lastResults.hotels || [];
    let filteredAttractions = window.lastResults.attractions || [];

    // Filtro por faixa de preço
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(n => parseFloat(n.trim()));
      if (!isNaN(min) && !isNaN(max)) {
        filteredFlights = filteredFlights.filter(f => f.price.total >= min && f.price.total <= max);
        filteredHotels = filteredHotels.filter(h => h.offers && h.offers[0].price.total >= min && h.offers[0].price.total <= max);
        filteredAttractions = filteredAttractions.filter(a => a.price >= min && a.price <= max);
      }
    }

    // Filtro por rating (hotéis)
    if (rating && rating !== 'Hotel Rating') {
      const stars = parseInt(rating, 10);
      filteredHotels = filteredHotels.filter(h => h.hotel.rating && parseInt(h.hotel.rating, 10) === stars);
    }

    // TODO: Filtro por data pode ser implementado se tiver dados para isso

    displaySearchResults({
      flights: filteredFlights,
      hotels: filteredHotels,
      attractions: filteredAttractions
    });
  });
}
