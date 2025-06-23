import { autocompleteCity } from './geoapify.js';
import { searchFlights, searchHotels } from './amadeus.js';
import { searchAttractions } from './foursquare.js';

const DEFAULT_ORIGIN_CODE = "MEX"; // Pode parametrizar depois

export async function planTrip(cityQuery, departureDate, returnDate) {
  const cities = await autocompleteCity(cityQuery);
  if (cities.length === 0) throw new Error('Ciudad no encontrada');

  const city = cities[0];

  let flights = [];
  try {
    flights = await searchFlights(DEFAULT_ORIGIN_CODE, city.cityCode, departureDate);
  } catch (e) {
    console.error('Error searching flights:', e);
    flights = [];
  }

  let hotels = [];
  try {
    hotels = await searchHotels(city.cityCode, departureDate, returnDate);
  } catch (e) {
    console.error('Error searching hotels:', e);
    hotels = [];
  }

  let attractions = [];
  try {
    attractions = await searchAttractions(city.lat, city.lon);
  } catch (e) {
    console.error('Error searching attractions:', e);
    attractions = [];
  }

  return {
    city,
    flights,
    hotels,
    attractions
  };
}
