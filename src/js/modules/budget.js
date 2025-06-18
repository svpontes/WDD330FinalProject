// Asegura que cada item tenga la propiedad price (si no, usa 0)
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
  }