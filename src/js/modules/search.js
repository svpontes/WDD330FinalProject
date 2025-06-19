import { planTrip } from './tripPlanner.js';

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
}