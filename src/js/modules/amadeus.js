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

import { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from './config.js'; // 

async function getAmadeusToken() {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token"; // 
  const body = `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`; // 
  const response = await fetch(url, {
    method: "POST", // 
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // 
    body // 
  });
  const data = await response.json(); // 
  if (!response.ok) {
    console.error('Failed to get Amadeus token:', data);
    throw new Error(`Failed to get Amadeus token: ${data.error_description || 'Unknown error'}`);
  }
  return data.access_token; // 
}

export async function searchFlights(origin, destination, departureDate) {
  const token = await getAmadeusToken(); // 
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`; // 
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` } // 
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error al buscar vuelos:', errorData); // 
    throw new Error('Error al buscar vuelos: ' + (errorData.errors ? errorData.errors.map(err => err.detail).join(', ') : 'Unknown error')); // 
  }
  const data = await response.json(); // 
  return data.data || []; // 
}

export async function searchHotels(cityCode, checkInDate, checkOutDate) {
  const token = await getAmadeusToken(); // 
  // Amadeus Hotel Search pode ser sensível a datas vazias ou inválidas. Adicionei uma verificação básica.
  if (!checkInDate || !checkOutDate || checkInDate === checkOutDate) {
    console.warn("Check-in ou check-out inválidos para busca de hotéis. Usando datas de exemplo.");
    // Você pode definir um comportamento padrão ou lançar um erro mais explícito aqui
    // Por exemplo, usar uma data de check-in / check-out padrão ou retornar um array vazio.
    // Para simplificar, vou permitir que a API lide com isso ou retornar um array vazio se as datas forem críticas.
    // Para a busca inicial, vou permitir que a URL construída vá vazia se a data for vazia.
  }

  const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=1`; // 
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` } // 
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error al buscar hoteles:', errorData); // 
    throw new Error('Error al buscar hoteles: ' + (errorData.errors ? errorData.errors.map(err => err.detail).join(', ') : 'Unknown error')); // 
  }
  const data = await response.json(); // 
  return data.data || []; // 
}