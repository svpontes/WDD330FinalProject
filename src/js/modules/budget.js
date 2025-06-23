/*function safePrice(item) {
  if (!item) return 0;

  // Exemplo: voos podem ter price.total, hotéis podem ter offers[0].price.total, atrações podem ter price direto
  if (typeof item.price === "number") {
    return item.price;
  } else if (item.price && typeof item.price.total === "number") {
    return item.price.total;
  } else if (item.offers && item.offers[0] && item.offers[0].price && typeof item.offers[0].price.total === "number") {
    return item.offers[0].price.total;
  }

  return 0;
}

export function calculateEstimatedCost(flights, hotels, activities) {
  const flightCost = flights.reduce((total, flight) => total + safePrice(flight), 0);
  const hotelCost = hotels.reduce((total, hotel) => total + safePrice(hotel), 0);
  const activityCost = activities.reduce((total, activity) => total + safePrice(activity), 0);
  return flightCost + hotelCost + activityCost;
}

// costElement pode ser qualquer elemento HTML onde mostrar o custo estimado
export function displayEstimatedCost(costElement, estimatedCost) {
  if (costElement) {
    costElement.textContent = `Total Estimated Cost: $${estimatedCost.toFixed(2)}`;
  }
}*/

function safePrice(item) {
  if (!item) return 0; // 

  // Exemplo: voos podem ter price.total, hotéis podem ter offers[0].price.total, atrações podem ter price direto
  if (typeof item.price === "number") {
    return item.price; // 
  } else if (item.price && typeof item.price.total === "number") {
    return item.price.total; // 
  } else if (item.offers && item.offers[0] && item.offers[0].price && typeof item.offers[0].price.total === "number") {
    return item.offers[0].price.total; // 
  }

  return 0; // 
}

export function calculateEstimatedCost(flights, hotels, activities) {
  const flightCost = flights.reduce((total, flight) => total + safePrice(flight), 0); // 
  const hotelCost = hotels.reduce((total, hotel) => total + safePrice(hotel), 0); // 
  const activityCost = activities.reduce((total, activity) => total + safePrice(activity), 0); // 
  return flightCost + hotelCost + activityCost; // 
}

// costElement pode ser qualquer elemento HTML onde mostrar o custo estimado
export function displayEstimatedCost(costElement, estimatedCost) {
  if (costElement) {
    costElement.textContent = `Total Estimated Cost: $${estimatedCost.toFixed(2)}`; // 
  }
}
