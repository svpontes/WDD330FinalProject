import { FOURSQUARE_API_KEY } from './config.js';

// Obtiene la primera imagen de un lugar por su fsq_id
async function getPlaceImage(fsq_id) {
  const url = `https://api.foursquare.com/v3/places/${fsq_id}/photos?limit=1`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: FOURSQUARE_API_KEY
    }
  });
  if (!response.ok) return null;
  const data = await response.json();
  if (data.length > 0) {
    // Construye la URL de la imagen
    return `${data[0].prefix}original${data[0].suffix}`;
  }
  return null;
}

// Busca atracciones y les agrega la imagen de Foursquare
export async function searchAttractions(lat, lon, query = "tourist attraction") {
  const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&query=${encodeURIComponent(query)}&limit=10`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: FOURSQUARE_API_KEY
    }
  });
  if (!response.ok) throw new Error('Error al buscar atracciones');
  const data = await response.json();

  // Para cada atracción, busca la imagen
  const results = await Promise.all(data.results.map(async place => {
    const image = await getPlaceImage(place.fsq_id);
    return {
      name: place.name,
      address: place.location.formatted_address,
      categories: place.categories.map(cat => cat.name),
      fsq_id: place.fsq_id,
      lat: place.geocodes.main.latitude,
      lon: place.geocodes.main.longitude,
      image: image || 'src/public/images/attraction-placeholder.jpg', // Imagen genérica si no hay
      price: 0 // Puedes ajustar si tienes precios
    };
  }));

  return results;
}