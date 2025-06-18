/*import { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from './config.js';

async function getAmadeusToken() {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const body = `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await response.json();
  return data.access_token;
}

export async function searchFlights(origin, destination, departureDate) {
  const token = await getAmadeusToken();
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Error al buscar vuelos');
  const data = await response.json();
  return data.data || [];
}

export async function searchHotels(cityCode, checkInDate, checkOutDate) {
  const token = await getAmadeusToken();
  const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=1`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Error al buscar hoteles');
  const data = await response.json();
  return data.data || [];
}*/
import { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from './config.js';

async function getAmadeusToken() {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const body = `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await response.json();
  return data.access_token;
}

export async function searchFlights(origin, destination, departureDate) {
  const token = await getAmadeusToken();
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Error al buscar vuelos');
  const data = await response.json();
  return data.data || [];
}

export async function searchHotels(cityCode, checkInDate, checkOutDate) {
  const token = await getAmadeusToken();
  const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=1`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Error al buscar hoteles');
  const data = await response.json();
  return data.data || [];
}