// src/js/modules/budget.js

export function calculateEstimatedCost(flights, hotels, activities) {
    const flightCost = flights.reduce((total, flight) => total + flight.price, 0);
    const hotelCost = hotels.reduce((total, hotel) => total + hotel.price, 0);
    const activityCost = activities.reduce((total, activity) => total + activity.price, 0);
    
    return flightCost + hotelCost + activityCost;
}

export function displayEstimatedCost(costElement, estimatedCost) {
    costElement.textContent = `Total Estimated Cost: $${estimatedCost.toFixed(2)}`;
}