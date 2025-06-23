// src/main.js (nova localização)

import { autocompleteCity } from './js/modules/geoapify.js';
import { getEstimatedFlightCost, getEstimatedHotelCost, getEstimatedAttractionCost } from './js/modules/costApi.js';
import { FOURSQUARE_API_KEY } from './js/modules/config.js';

const allDestinations = [
  { name: 'Paris', description: 'The city of lights and romance.', image: '/src/public/images/paris.webp' }, // Ajustado caminho
  { name: 'Tokyo', description: 'A blend of tradition and technology.', image: '/src/public/images/tokyo.webp' }, // Ajustado caminho
  { name: 'Rio de Janeiro', description: 'Vibrant culture and stunning beaches.', image: '/src/public/images/rio.webp' }, // Ajustado caminho
  { name: 'New York', description: 'The city that never sleeps.', image: '/src/public/images/newyork.webp' }, // Ajustado caminho
  { name: 'London', description: 'History and modernity combined.', image: '/src/public/images/london.webp' }, // Ajustado caminho
  { name: 'Sydney', description: 'Harbour city with iconic Opera House.', image: '/src/public/images/sydney.webp' } // Ajustado caminho
];

// Busca la imagen de la ciudad en Foursquare, si no hay usa la imagen manual
async function getCityImage(city, fallbackImage) {
  const cacheKey = `cityImage_${city}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  try {
    const searchUrl = `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(city)}&query=city%20landmark&limit=1`; // Mudado query para "city landmark"
    const searchRes = await fetch(searchUrl, {
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY
      }
    });
    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) return fallbackImage;
    const fsq_id = searchData.results[0].fsq_id;

    const photoUrl = `https://api.foursquare.com/v3/places/${fsq_id}/photos?limit=1`;
    const photoRes = await fetch(photoUrl, {
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY
      }
    });
    const photoData = await photoRes.json();

    if (photoData.length > 0) {
      const imageUrl = `${photoData[0].prefix}original${photoData[0].suffix}`;
      localStorage.setItem(cacheKey, imageUrl);
      return imageUrl;
    }
    return fallbackImage;
  } catch (err) {
    console.error("Failed to fetch city image:", err);
    return fallbackImage;
  }
}

async function displayRandomDestinations() {
  const container = document.getElementById('featured-destinations'); // Selecionar por ID
  if (!container) return;

  container.innerHTML = `
    <div class="text-center w-100 my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading featured destinations...</p>
    </div>`;

  const shuffled = allDestinations.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const destinationsWithImages = await Promise.all(selected.map(async dest => {
    let image = await getCityImage(dest.name, dest.image);
    if (!image) image = '/src/public/images/city-placeholder.jpg'; // Ajustado caminho
    return { ...dest, image };
  }));

  container.innerHTML = '';
  destinationsWithImages.forEach(dest => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${dest.image}" class="card-img-top" alt="${dest.name}" loading="lazy"
               onerror="this.onerror=null;this.src='/src/public/images/city-placeholder.jpg';">
          <div class="card-body">
            <h5 class="card-title">${dest.name}</h5>
            <a href="#" class="btn btn-outline-primary btn-sm explore-btn"
               data-name="${dest.name}" data-desc="${dest.description}">Explore</a>
          </div>
        </div>
      </div>
    `;
  });

  // Evento para "Explore": mostra descrição e custos no modal
  document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const name = btn.dataset.name;
      const desc = btn.dataset.desc;
      const modalTitle = document.getElementById('cityModalLabel');
      const modalBody = document.getElementById('cityModalBody');
      modalTitle.textContent = name;
      modalBody.innerHTML = `<p>${desc}</p>`; // Use innerHTML para formatar texto e adicionar elementos

      // Adiciona div para custos estimados
      const costSummary = document.createElement('div');
      costSummary.classList.add('mt-2');
      costSummary.textContent = 'Loading estimated costs...';
      modalBody.appendChild(costSummary);

      try {
        const [flightCost, hotelCost, attractionCost] = await Promise.all([
          getEstimatedFlightCost(name),
          getEstimatedHotelCost(name),
          getEstimatedAttractionCost(name)
        ]);
        costSummary.innerHTML = `
          <div class="small text-muted">
            Flight: $${flightCost} | Hotel: $${hotelCost} | Attractions: $${attractionCost}
          </div>
        `;
      } catch (err) {
        console.error("Erro ao carregar custos estimados:", err);
        costSummary.innerHTML = `<div class="text-danger small">Could not load estimated costs.</div>`;
      }

      const modal = new bootstrap.Modal(document.getElementById('cityModal'));
      modal.show();
    });
  });
}

function setupAutocomplete() {
  const originInput = document.getElementById('origin-input');
  const destinationInput = document.getElementById('destination-input');
  if (!originInput || !destinationInput) return; // Se não encontrar os inputs, sai

  // Configura autocomplete para o campo de ORIGEM
  const originDatalistId = "origins-suggestions";
  let originDatalist = document.getElementById(originDatalistId);
  if (!originDatalist) {
    originDatalist = document.createElement('datalist');
    originDatalist.id = originDatalistId;
    document.body.appendChild(originDatalist);
    originInput.setAttribute('list', originDatalistId);
  }

  originInput.addEventListener('input', async () => {
    const query = originInput.value.trim();
    if (query.length < 2) {
      originDatalist.innerHTML = '';
      return;
    }
    try {
      const results = await autocompleteCity(query);
      originDatalist.innerHTML = '';
      results.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name + (city.country ? ', ' + city.country : '');
        originDatalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error during origin autocomplete:", error);
    }
  });


  // Configura autocomplete para o campo de DESTINO (já existia, mas ajustado)
  const destDatalistId = "destinations"; // Já existe no HTML
  let destDatalist = document.getElementById(destDatalistId);
  if (!destDatalist) { // Redundante se o datalist já está no HTML, mas garante.
    destDatalist = document.createElement('datalist');
    destDatalist.id = destDatalistId;
    document.body.appendChild(destDatalist);
    destinationInput.setAttribute('list', destDatalistId);
  }

  destinationInput.addEventListener('input', async () => {
    const query = destinationInput.value.trim();
    if (query.length < 2) {
      destDatalist.innerHTML = '';
      return;
    }
    try {
      const results = await autocompleteCity(query);
      destDatalist.innerHTML = '';
      results.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name + (city.country ? ', ' + city.country : '');
        destDatalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error during destination autocomplete:", error);
    }
  });
}

// Mostra custos estimados quando o input de destino muda
async function showEstimatedCosts(city) {
  const costDiv = document.getElementById('cost-summary');
  if (!costDiv) return;

  if (!city || city.trim() === '') {
    costDiv.innerHTML = '';
    return;
  }
  costDiv.innerHTML = '<div class="alert alert-info">Loading estimated costs...</div>';
  try {
    const [flightCost, hotelCost, attractionCost] = await Promise.all([
      getEstimatedFlightCost(city.split(',')[0].trim()), // Passa apenas o nome da cidade, removendo o país
      getEstimatedHotelCost(city.split(',')[0].trim()),
      getEstimatedAttractionCost(city.split(',')[0].trim())
    ]);
    costDiv.innerHTML = `
      <div class="alert alert-info">
        <strong>Estimated Costs for ${city.split(',')[0].trim()}:</strong><br>
        Flight: $${flightCost}<br>
        Hotel: $${hotelCost}<br>
        Attractions: $${attractionCost}
      </div>
    `;
  } catch (err) {
    console.error("Error showing estimated costs:", err);
    costDiv.innerHTML = `<div class="alert alert-danger">Could not load estimated costs.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayRandomDestinations();
  setupAutocomplete();

  const originInput = document.getElementById('origin-input');
  const destInput = document.getElementById('destination-input');
  const departureDateInput = document.getElementById('departure-date');
  const returnDateInput = document.getElementById('return-date'); // Novo campo de data de retorno

  if (destInput) {
    destInput.addEventListener('change', e => {
      showEstimatedCosts(e.target.value);
    });
  }

  const form = document.getElementById('main-search-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const origin = originInput.value.trim();
      const destination = destInput.value.trim();
      const departureDate = departureDateInput.value;
      const returnDate = returnDateInput.value; // Captura a data de retorno

      if (!origin || !destination || !departureDate) {
        alert('Please fill in all required fields (Origin, Destination, Departure Date).');
        return;
      }

      // Redireciona para a página de resultados com os parâmetros na URL
      let url = `src/search_result/searchResult.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&departure=${departureDate}`;
      if (returnDate) { // Adiciona returnDate apenas se for fornecida
        url += `&return=${returnDate}`;
      }
      window.location.href = url;
    });
  }
});
