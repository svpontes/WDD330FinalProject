/*import { handleSearch, displaySearchResults } from './search.js';
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
  const ret = getQueryParam('return') || departure; // Usa departure como fallback para return

  if (destination && departure) { // 'ret' pode ser opcional, então checamos apenas os essenciais para a busca inicial
    try {
      const results = await handleSearch(destination, departure, ret);
      window.lastResults = results;
      displaySearchResults(results);
    } catch (err) {
      alert('Error: ' + err.message);
      console.error('Error during initial search:', err); // Adicione um console.error para depuração
    }
  } else {
    // Caso não haja parâmetros de busca na URL, exibe uma mensagem
    const resultsTabContent = document.getElementById('resultsTabContent');
    if (resultsTabContent) {
      resultsTabContent.innerHTML = '<p class="text-center mt-5">Por favor, faça uma busca na página inicial para ver os resultados.</p>';
    }
  }
});

// Delegação de evento para botão "Add to Itinerary"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-itinerary-btn')) {
    const type = e.target.dataset.type;
    const idx = parseInt(e.target.dataset.idx, 10);

    if (!window.lastResults || (!window.lastResults.flights.length && !window.lastResults.hotels.length && !window.lastResults.attractions.length)) {
      alert('No results available yet to add to itinerary.');
      return;
    }

    let item;
    let itemTitle = ''; // Variável para armazenar o título formatado

    if (type === 'flight') {
      item = window.lastResults.flights[idx];
      if (item) {
        // Exemplo: "Voo de GRU para CDG (R$ 1500.00)"
        const departureCode = item.itineraries && item.itineraries[0] && item.itineraries[0].segments[0] ? item.itineraries[0].segments[0].departure.iataCode : 'N/A';
        const arrivalCode = item.itineraries && item.itineraries[0] && item.itineraries[0].segments.slice(-1)[0] ? item.itineraries[0].segments.slice(-1)[0].arrival.iataCode : 'N/A';
        const price = item.price && item.price.total ? parseFloat(item.price.total).toFixed(2) : 'N/A';
        const currency = item.price && item.price.currency ? item.price.currency : '';
        itemTitle = `Voo: ${departureCode} → ${arrivalCode} (${price} ${currency})`;
      }
    } else if (type === 'hotel') {
      item = window.lastResults.hotels[idx];
      if (item) {
        // Exemplo: "Hotel Hilton (R$ 300.00/noite)"
        const hotelName = item.hotel ? item.hotel.name : 'Hotel Desconhecido';
        const price = item.offers && item.offers[0] && item.offers[0].price && item.offers[0].price.total ? parseFloat(item.offers[0].price.total).toFixed(2) : 'N/A';
        const currency = item.offers && item.offers[0] && item.offers[0].price && item.offers[0].price.currency ? item.offers[0].price.currency : '';
        itemTitle = `Hotel: ${hotelName} (${price} ${currency}/noite)`;
      }
    } else if (type === 'attraction') {
      item = window.lastResults.attractions[idx];
      if (item) {
        // Exemplo: "Atração: Museu do Louvre (R$ 50.00)"
        const attractionName = item.name || 'Atração Desconhecida';
        const price = item.price ? parseFloat(item.price).toFixed(2) : 'N/A'; // Assumindo 'price' direto para atrações
        const currency = item.currency || '';
        itemTitle = `Atração: ${attractionName} (${price} ${currency})`;
      }
    }

    if (item && itemTitle) {
      // Adicione o 'title' ao item antes de adicionar ao itinerário
      itinerary.addItem({ ...item, type, title: itemTitle });
      alert('Added to itinerary!');
    } else {
      alert('Item not found or could not generate title.');
    }
  }
});

// Filtragem unificada no formulário
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!window.lastResults || (!window.lastResults.flights.length && !window.lastResults.hotels.length && !window.lastResults.attractions.length)) {
      alert('No search results to filter.');
      return;
    }

    const priceRangeInput = e.target.querySelector('input[placeholder="Price Range"]');
    const dateInput = e.target.querySelector('input[type="date"]'); // Não implementado para filtro ainda
    const ratingSelect = e.target.querySelector('select');

    const priceRange = priceRangeInput ? priceRangeInput.value.trim() : '';
    const date = dateInput ? dateInput.value : ''; // Variável 'date' está aqui mas não usada na lógica abaixo
    const rating = ratingSelect ? ratingSelect.value : '';

    // Copia dos arrays para filtrar
    let filteredFlights = window.lastResults.flights || [];
    let filteredHotels = window.lastResults.hotels || [];
    let filteredAttractions = window.lastResults.attractions || [];

    // Filtro por faixa de preço
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(n => parseFloat(n.trim()));
      if (!isNaN(min) && !isNaN(max)) {
        filteredFlights = filteredFlights.filter(f => f.price && f.price.total >= min && f.price.total <= max);
        filteredHotels = filteredHotels.filter(h => h.offers && h.offers[0] && h.offers[0].price && h.offers[0].price.total >= min && h.offers[0].price.total <= max);
        // Filtragem para atrações por preço: exige que a atração tenha uma propriedade 'price' numérica
        filteredAttractions = filteredAttractions.filter(a => typeof a.price === 'number' && a.price >= min && a.price <= max);
      }
    }

    // Filtro por rating (hotéis)
    if (rating && rating !== 'Hotel Rating') {
      const stars = parseInt(rating, 10);
      filteredHotels = filteredHotels.filter(h => h.hotel && h.hotel.rating && parseInt(h.hotel.rating, 10) === stars);
    }

    // TODO: Filtro por data pode ser implementado se tiver dados e lógica para isso

    displaySearchResults({
      flights: filteredFlights,
      hotels: filteredHotels,
      attractions: filteredAttractions
    });
  });
}*/

import { handleSearch, displaySearchResults } from './search.js'; // 
// import itinerary from './itinerary.js'; // Já importado e usado em search.js para o botão Add to Itinerary

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search); // 
  return urlParams.get(param); // 
}

// Guarda resultados globais para filtragem (já definido em search.js, então não precisamos redeclarar aqui)
// window.lastResults = { flights: [], hotels: [], attractions: [] }; // Remover pois já está em search.js

document.addEventListener('DOMContentLoaded', async () => {
  const origin = getQueryParam('origin');
  const destination = getQueryParam('destination');
  const departure = getQueryParam('departure');
  const ret = getQueryParam('return'); // Agora o retorno é explicitamente lido

  const loadingMessage = document.getElementById('initial-loading-message');
  if (loadingMessage) {
    loadingMessage.style.display = 'block'; // Certifica que a mensagem de loading é visível no início
  }

  if (origin && destination && departure) { // Verifica os parâmetros essenciais
    try {
      // Chama handleSearch passando todos os parâmetros
      const results = await handleSearch(origin, destination, departure, ret);
      window.lastResults = results; // Armazena os resultados para filtragem
      displaySearchResults(results); // Exibe os resultados
    } catch (err) {
      alert('Error searching for your trip: ' + err.message); // 
      console.error('Error during initial search:', err); // 
      if (loadingMessage) {
        loadingMessage.innerHTML = '<p class="text-danger">Failed to load trip results. Please try again.</p>';
      }
    } finally {
      // O displaySearchResults já esconde a mensagem de loading, mas para erros podemos garantir
      // if (loadingMessage) { loadingMessage.style.display = 'none'; }
    }
  } else {
    // Caso não haja parâmetros de busca na URL, exibe uma mensagem
    const resultsTabContent = document.getElementById('resultsTabContent'); // 
    if (resultsTabContent) {
      resultsTabContent.innerHTML = '<p class="text-center mt-5">Please search from the homepage to see results.</p>'; // 
    }
    if (loadingMessage) {
      loadingMessage.style.display = 'none'; // Esconde o spinner se não houver parâmetros
    }
  }

  // Lógica de filtragem no formulário de searchResult.html
  const filterForm = document.getElementById('filter-form'); // Usar o ID que adicionei no HTML
  if (filterForm) { // 
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault(); // 

      if (!window.lastResults || (Object.values(window.lastResults).every(arr => arr.length === 0))) {
        alert('No search results to filter. Please perform a search first.'); // 
        return;
      }

      const priceRangeInput = document.getElementById('priceRange');
      const dateInput = document.getElementById('date');
      const ratingSelect = document.getElementById('hotelRating');

      const priceRange = priceRangeInput ? priceRangeInput.value.trim() : '';
      const filterDate = dateInput ? dateInput.value : ''; // Variável 'filterDate' agora é capturada
      const rating = ratingSelect ? ratingSelect.value : '';

      // Copia dos arrays para filtrar
      let filteredFlights = [...window.lastResults.flights];
      let filteredHotels = [...window.lastResults.hotels];
      let filteredAttractions = [...window.lastResults.attractions]; // 

      // Filtro por faixa de preço
      if (priceRange) {
        const [minStr, maxStr] = priceRange.split('-').map(n => n.trim());
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);

        if (!isNaN(min) && !isNaN(max)) { // 
          filteredFlights = filteredFlights.filter(f => f.price && parseFloat(f.price.total) >= min && parseFloat(f.price.total) <= max); // 
          filteredHotels = filteredHotels.filter(h => h.offers && h.offers[0] && h.offers[0].price && parseFloat(h.offers[0].price.total) >= min && parseFloat(h.offers[0].price.total) <= max); // 
          // Filtragem para atrações por preço: exige que a atração tenha uma propriedade 'price' numérica
          filteredAttractions = filteredAttractions.filter(a => typeof a.price === 'number' && a.price >= min && a.price <= max); // 
        } else {
            alert('Invalid price range format. Please use "min-max" (e.g., "100-500").');
        }
      }

      // Filtro por rating (hotéis)
      if (rating && rating !== 'Hotel Rating' && rating !== '') { // Verifica também se não é vazio
        const stars = parseInt(rating, 10); // 
        if (!isNaN(stars)) {
            // Hotéis da Amadeus API podem ter `hotel.rating` como string ou número.
            // Convertemos para inteiro para comparar.
            filteredHotels = filteredHotels.filter(h => h.hotel && h.hotel.rating && parseInt(h.hotel.rating, 10) === stars); // 
        }
      }

      // TODO: Filtro por data pode ser implementado se tiver dados e lógica para isso
      // Para a data, você precisaria de um campo de data nos resultados e comparar com `filterDate`
      // Exemplo: if (filterDate) { filteredFlights = filteredFlights.filter(f => f.departureDate === filterDate); }

      displaySearchResults({
        flights: filteredFlights,
        hotels: filteredHotels,
        attractions: filteredAttractions
      }); // 
    });
  }
});