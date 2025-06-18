/*// Asegura que cada item tenga la propiedad price (si no, usa 0)
function safePrice(item) {
    return typeof item.price === "number" ? item.price : 0;
  }
  
  export function calculateEstimatedCost(flights, hotels, activities) {
    const flightCost = flights.reduce((total, flight) => total + safePrice(flight), 0);
    const hotelCost = hotels.reduce((total, hotel) => total + safePrice(hotel), 0);
    const activityCost = activities.reduce((total, activity) => total + safePrice(activity), 0);
    return flightCost + hotelCost + activityCost;
  }
  
  // costElement puede ser un <strong> o cualquier elemento donde quieras mostrar el costo
  export function displayEstimatedCost(costElement, estimatedCost) {
    if (costElement) {
      costElement.textContent = `Total Estimated Cost: $${estimatedCost.toFixed(2)}`;
    }
  }*/
 // Função para garantir que o item tem propriedade price válida (número)
// Ajuste para acessar preço corretamente dependendo da estrutura do item
function safePrice(item) {
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
}
