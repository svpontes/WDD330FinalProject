/*import { planTrip } from './tripPlanner.js';

// Chama planTrip e retorna os resultados
export async function handleSearch(destination, departureDate, returnDate) {
  return await planTrip(destination, departureDate, returnDate);
}

// Mostra todos os resultados nas tabs
export function displaySearchResults(results) {
  displayFlights(results.flights);
  displayHotels(results.hotels);
  displayAttractions(results.attractions);
}

// Renderiza voos
export function displayFlights(flights) {
  const el = document.getElementById('flights');
  el.innerHTML = flights && flights.length > 0
    ? flights.map((f, idx) => `
        <div class="card h-100 m-2 p-2">
          <h5>${f.itineraries[0].segments[0].departure.iataCode} → ${f.itineraries[0].segments.slice(-1)[0].arrival.iataCode}</h5>
          <p>Precio: ${f.price.total} ${f.price.currency}</p>
          <p>${f.itineraries[0].segments[0].departure.cityName || ''}, ${f.itineraries[0].segments[0].departure.countryName || ''}</p>
          <button class="btn btn-success btn-sm add-itinerary-btn" data-type="flight" data-idx="${idx}">Add to Itinerary</button>
        </div>
      `).join('')
    : '<p>No hay vuelos disponibles.</p>';
}

// Renderiza hotéis
export function displayHotels(hotels) {
  const el = document.getElementById('hotels');
  el.innerHTML = hotels && hotels.length > 0
    ? hotels.map((h, idx) => `
        <div class="card h-100 m-2 p-2">
          <h5>${h.hotel.name}</h5>
          <p>Dirección: ${h.hotel.address.lines.join(', ')}</p>
          <p>${h.hotel.address.state || ''}, ${h.hotel.address.countryCode || ''}</p>
          <button class="btn btn-success btn-sm add-itinerary-btn" data-type="hotel" data-idx="${idx}">Add to Itinerary</button>
        </div>
      `).join('')
    : '<p>No hay hoteles disponibles.</p>';
}

// Renderiza atrações (com imagem, se existir)
export function displayAttractions(attractions) {
  const el = document.getElementById('attractions');
  el.innerHTML = attractions && attractions.length > 0
    ? attractions.map((a, idx) => `
        <div class="card h-100 m-2 p-2">
          ${a.image ? `<img src="${a.image}" class="card-img-top" alt="${a.name}" loading="lazy"
            onerror="this.onerror=null;this.src='/images/attraction-placeholder.jpg';">` : ''}
          <h5>${a.name}</h5>
          <p>${a.address}</p>
          <p>${a.state || ''}, ${a.country || ''}</p>
          <button class="btn btn-success btn-sm add-itinerary-btn" data-type="attraction" data-idx="${idx}">Add to Itinerary</button>
        </div>
      `).join('')
    : '<p>No hay atracciones disponibles.</p>';
}*/

import { planTrip } from './tripPlanner.js'; // 
import itinerary from './itinerary.js'; // Importar o módulo itinerary para adicionar itens

// Guarda resultados globais para filtragem e adição ao itinerário
// Necessário para que searchResultMain possa acessar os dados brutos para adicionar ao itinerário
window.lastResults = {
  flights: [],
  hotels: [],
  attractions: []
}; // 


// Chama planTrip e retorna os resultados
export async function handleSearch(origin, destination, departureDate, returnDate) {
  // Ajuste para passar a origem também para planTrip, se necessário na lógica
  return await planTrip(origin, destination, departureDate, returnDate); // 
}

// Mostra todos os resultados nas tabs
export function displaySearchResults(results) {
  displayFlights(results.flights); // 
  displayHotels(results.hotels); // 
  displayAttractions(results.attractions); // 

  // Esconder a mensagem de loading inicial
  const loadingMessage = document.getElementById('initial-loading-message');
  if (loadingMessage) {
    loadingMessage.style.display = 'none';
  }

  // Adiciona event listeners para os botões "Add to Itinerary"
  setupAddToItineraryButtons();
}

// Renderiza voos
export function displayFlights(flights) {
  const el = document.getElementById('flights').querySelector('.row.g-3'); // Seleciona o contêiner interno
  if (!el) return;

  if (flights && flights.length > 0) { // 
    el.innerHTML = flights.map((f, idx) => {
      // Ajuste para lidar com a estrutura real de dados da API Amadeus
      const departureSegment = f.itineraries[0]?.segments[0];
      const arrivalSegment = f.itineraries[0]?.segments.slice(-1)[0];
      const originCity = f.dictionaries?.locations?.[departureSegment?.departure?.iataCode]?.name || departureSegment?.departure?.iataCode || 'N/A';
      const destinationCity = f.dictionaries?.locations?.[arrivalSegment?.arrival?.iataCode]?.name || arrivalSegment?.arrival?.iataCode || 'N/A';
      const airlineCode = departureSegment?.carrierCode;
      const airlineName = f.dictionaries?.carriers?.[airlineCode] || 'Unknown Airline';

      const price = f.price?.total ? parseFloat(f.price.total).toFixed(2) : 'N/A';
      const currency = f.price?.currency || '';

      // Usar uma imagem genérica ou de API para voos
      const flightImage = 'https://source.unsplash.com/400x200/?airplane,airport';

      return `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${flightImage}" class="card-img-top" alt="Imagem ilustrativa de avião" />
            <div class="card-body">
              <h5 class="card-title">Voo de ${originCity} para ${destinationCity}</h5>
              <p class="card-text">
                Airline: ${airlineName}<br />
                Price: $${price} ${currency}
              </p>
              <button class="btn btn-success btn-sm add-itinerary-btn" data-type="flight" data-idx="${idx}">Add to Itinerary</button>
            </div>
          </div>
        </div>
      `;
    }).join(''); // 
  } else {
    el.innerHTML = '<p class="text-center w-100">No flights available.</p>'; // 
  }
}

// Renderiza hotéis
export function displayHotels(hotels) {
  const el = document.getElementById('hotels').querySelector('.row.g-3'); // Seleciona o contêiner interno
  if (!el) return;

  if (hotels && hotels.length > 0) { // 
    el.innerHTML = hotels.map((h, idx) => {
      const hotelName = h.hotel?.name || 'Hotel Desconhecido';
      const hotelAddress = h.hotel?.address?.lines?.join(', ') || 'Endereço Desconhecido';
      const hotelRating = h.hotel?.rating || 'N/A'; // Amadeus pode retornar rating ou category.
      const price = h.offers?.[0]?.price?.total ? parseFloat(h.offers[0].price.total).toFixed(2) : 'N/A';
      const currency = h.offers?.[0]?.price?.currency || '';
      const hotelImage = 'https://source.unsplash.com/400x200/?hotel,luxuryhotel';

      return `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${hotelImage}" class="card-img-top" alt="Imagem ilustrativa de hotel" />
            <div class="card-body">
              <h5 class="card-title">${hotelName}</h5>
              <p class="card-text">
                Address: ${hotelAddress}<br />
                Rating: ${hotelRating} Stars<br />
                Price: $${price} ${currency}/night
              </p>
              <button class="btn btn-success btn-sm add-itinerary-btn" data-type="hotel" data-idx="${idx}">Add to Itinerary</button>
            </div>
          </div>
        </div>
      `;
    }).join(''); // 
  } else {
    el.innerHTML = '<p class="text-center w-100">No hotels available.</p>'; // 
  }
}

// Renderiza atrações (com imagem, se existir)
export function displayAttractions(attractions) {
  const el = document.getElementById('attractions').querySelector('.row.g-3'); // Seleciona o contêiner interno
  if (!el) return;

  if (attractions && attractions.length > 0) { // 
    el.innerHTML = attractions.map((a, idx) => {
      const attractionName = a.name || 'Atração Desconhecida';
      const attractionAddress = a.address || 'Endereço Desconhecido';
      const attractionImage = a.image || '/src/public/images/attraction-placeholder.jpg'; // Usar a imagem da API ou placeholder
      const price = a.price ? parseFloat(a.price).toFixed(2) : 'N/A'; // Assumindo 'price' direto para atrações
      const currency = a.currency || ''; // Se a API Foursquare não der currency, será vazio

      return `
        <div class="col-md-4">
          <div class="card h-100">
            ${attractionImage ? `<img src="${attractionImage}" class="card-img-top" alt="${attractionName}" loading="lazy"
              onerror="this.onerror=null;this.src='/src/public/images/attraction-placeholder.jpg';">` : ''}
            <div class="card-body">
              <h5 class="card-title">${attractionName}</h5>
              <p class="card-text">
                Address: ${attractionAddress}<br />
                Price: $${price} ${currency}
              </p>
              <button class="btn btn-success btn-sm add-itinerary-btn" data-type="attraction" data-idx="${idx}">Add to Itinerary</button>
            </div>
          </div>
        </div>
      `;
    }).join(''); // 
  } else {
    el.innerHTML = '<p class="text-center w-100">No attractions available.</p>'; // 
  }
}

function setupAddToItineraryButtons() {
  document.querySelectorAll('.add-itinerary-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const type = e.target.dataset.type;
      const idx = parseInt(e.target.dataset.idx, 10);

      if (!window.lastResults || Object.values(window.lastResults).every(arr => arr.length === 0)) {
        alert('No results available yet to add to itinerary.');
        return;
      }

      let item;
      let itemTitle = '';

      if (type === 'flight') {
        item = window.lastResults.flights[idx]; // 
        if (item) {
          const departureCode = item.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || 'N/A';
          const arrivalCode = item.itineraries?.[0]?.segments?.slice(-1)?.[0]?.arrival?.iataCode || 'N/A'; // 
          const price = item.price?.total ? parseFloat(item.price.total).toFixed(2) : 'N/A'; // 
          const currency = item.price?.currency || ''; // 
          itemTitle = `Voo: ${departureCode} → ${arrivalCode} ($${price} ${currency})`; // 
        }
      } else if (type === 'hotel') {
        item = window.lastResults.hotels[idx]; // 
        if (item) {
          const hotelName = item.hotel?.name || 'Hotel Desconhecido'; // 
          const price = item.offers?.[0]?.price?.total ? parseFloat(item.offers[0].price.total).toFixed(2) : 'N/A'; // 
          const currency = item.offers?.[0]?.price?.currency || ''; // 
          itemTitle = `Hotel: ${hotelName} ($${price} ${currency}/noite)`; // 
        }
      } else if (type === 'attraction') {
        item = window.lastResults.attractions[idx]; // 
        if (item) {
          const attractionName = item.name || 'Atração Desconhecida'; // 
          const price = typeof item.price === 'number' ? parseFloat(item.price).toFixed(2) : 'N/A'; // 
          const currency = item.currency || ''; //  (Assumindo que `attraction.price` é um número e pode ter `currency` se definido pela API ou mock)
          itemTitle = `Atração: ${attractionName} ($${price} ${currency})`; // 
        }
      }

      if (item && itemTitle) {
        // Adicione o 'title' ao item antes de adicionar ao itinerário
        itinerary.addItem({ ...item, type, title: itemTitle }); // 
        alert('Added to itinerary!'); // 
      } else {
        alert('Item not found or could not generate title.'); // 
      }
    });
  });
}