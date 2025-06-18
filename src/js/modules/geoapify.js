import { GEOAPIFY_API_KEY } from './config.js';

export async function autocompleteCity(query) {
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al buscar ciudades');
  const data = await response.json();
  return data.features.map(f => ({
    name: f.properties.city || f.properties.name,
    country: f.properties.country,
    lat: f.properties.lat,
    lon: f.properties.lon,
    cityCode: f.properties.city || f.properties.name // Para Amadeus, deberías mapear a un código IATA real
  }));
}