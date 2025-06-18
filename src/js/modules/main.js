import { autocompleteCity } from './geoapify.js';
import { getEstimatedFlightCost, getEstimatedHotelCost, getEstimatedAttractionCost } from './costApi.js'; 
import { FOURSQUARE_API_KEY } from './config.js';

const allDestinations = [
  { name: 'Paris', description: 'The city of lights and romance.', image: 'src/public/images/paris.jpg' },
  { name: 'Tokyo', description: 'A blend of tradition and technology.', image: 'src/public/images/tokyo.jpg' },
  { name: 'Rio de Janeiro', description: 'Vibrant culture and stunning beaches.', image: 'src/public/images/rio.jpg' },
  { name: 'New York', description: 'The city that never sleeps.', image: 'src/public/images/newyork.jpg' },
  { name: 'London', description: 'History and modernity combined.', image: 'src/public/images/london.jpg' },
  { name: 'Sydney', description: 'Harbour city with iconic Opera House.', image: 'src/public/images/sydney.jpg' }
];

// Busca la imagen de la ciudad en Foursquare, si no hay usa la imagen manual
async function getCityImage(city, fallbackImage) {
  const cacheKey = `cityImage_${city}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  try {
    const searchUrl = `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(city)}&query=tourist%20attraction&limit=1`;
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
  const container = document.querySelector('.row.g-3.mb-5');
  if (!container) return;
  container.innerHTML = `
    <div class="text-center w-100 my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;

  const shuffled = allDestinations.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const destinationsWithImages = await Promise.all(selected.map(async dest => {
    let image = await getCityImage(dest.name, dest.image);
    if (!image) image = 'src/public/images/city-placeholder.jpg';
    return { ...dest, image };
  }));

  container.innerHTML = '';
  destinationsWithImages.forEach(dest => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${dest.image}" class="card-img-top" alt="${dest.name}" loading="lazy"
               onerror="this.onerror=null;this.src='src/public/images/city-placeholder.jpg';">
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
      modalBody.textContent = desc;

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
        costSummary.innerHTML = `<div class="text-danger small">Could not load estimated costs.</div>`;
      }

      const modal = new bootstrap.Modal(document.getElementById('cityModal'));
      modal.show();
    });
  });
}

function setupAutocomplete() {
  const input = document.querySelector('input[placeholder="Where do you want to go?"]');
  if (!input) return;
  const datalistId = "city-suggestions";
  let datalist = document.getElementById(datalistId);
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = datalistId;
    document.body.appendChild(datalist);
    input.setAttribute('list', datalistId);
  }
  input.addEventListener('input', async () => {
    const query = input.value.trim();
    if (query.length < 2) return;
    const results = await autocompleteCity(query);
    datalist.innerHTML = '';
    results.forEach(city => {
      const option = document.createElement('option');
      option.value = city.name + (city.country ? ', ' + city.country : '');
      datalist.appendChild(option);
    });
  });
}

// Mostra custos estimados quando o input muda
async function showEstimatedCosts(city) {
  const costDiv = document.getElementById('cost-summary');
  if (!costDiv) return;
  if (!city) {
    costDiv.innerHTML = '';
    return;
  }
  costDiv.innerHTML = '<div class="alert alert-info">Loading estimated costs...</div>';

  try {
    const [flightCost, hotelCost, attractionCost] = await Promise.all([
      getEstimatedFlightCost(city),
      getEstimatedHotelCost(city),
      getEstimatedAttractionCost(city)
    ]);
    costDiv.innerHTML = `
      <div class="alert alert-info">
        <strong>Estimated Costs for ${city}:</strong><br>
        Flight: $${flightCost}<br>
        Hotel: $${hotelCost}<br>
        Attractions: $${attractionCost}
      </div>
    `;
  } catch (err) {
    costDiv.innerHTML = `<div class="alert alert-danger">Could not load estimated costs.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayRandomDestinations();
  setupAutocomplete();

  const destInput = document.getElementById('destination-input');
  if (destInput) {
    destInput.addEventListener('change', e => {
      showEstimatedCosts(e.target.value);
    });
  }

  const form = document.getElementById('main-search-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const destination = destInput.value;
      const departureDate = document.getElementById('departure-date').value;
      window.location.href = `src/search_result/searchResult.html?destination=${encodeURIComponent(destination)}&departure=${departureDate}`;
    });
  }
});
