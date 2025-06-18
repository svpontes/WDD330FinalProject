import { autocompleteCity } from './geoapify.js';
import { searchFlights, searchHotels } from './amadeus.js';
import { searchAttractions } from './foursquare.js';

export async function planTrip(cityQuery, departureDate, returnDate) {
  const cities = await autocompleteCity(cityQuery);
  if (cities.length === 0) throw new Error('Ciudad no encontrada');
  const city = cities[0];

  let flights = [];
  try {
    flights = await searchFlights("MEX", city.cityCode, departureDate); // Origen fijo "MEX"
  } catch (e) {
    flights = [];
  }

  let hotels = [];
  try {
    hotels = await searchHotels(city.cityCode, departureDate, returnDate);
  } catch (e) {
    hotels = [];
  }

  let attractions = [];
  try {
    attractions = await searchAttractions(city.lat, city.lon);
  } catch (e) {
    attractions = [];
  }

  return {
    city,
    flights,
    hotels,
    attractions
  };
}