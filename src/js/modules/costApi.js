function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const flightRanges = {
    Paris: [600, 800],
    Tokyo: [1100, 1400],
    "Rio de Janeiro": [800, 1000],
    "New York": [600, 900],
    London: [700, 950],
    Sydney: [1300, 1600]
  };
  
  const hotelRanges = {
    Paris: [150, 220],
    Tokyo: [180, 250],
    "Rio de Janeiro": [90, 140],
    "New York": [180, 260],
    London: [170, 230],
    Sydney: [160, 210]
  };
  
  const attractionRanges = {
    Paris: [60, 100],
    Tokyo: [70, 110],
    "Rio de Janeiro": [40, 80],
    "New York": [80, 120],
    London: [65, 105],
    Sydney: [55, 95]
  };
  
  export async function getEstimatedFlightCost(city) {
    const [min, max] = flightRanges[city] || [700, 1000];
    return randomInRange(min, max);
  }
  
  export async function getEstimatedHotelCost(city) {
    const [min, max] = hotelRanges[city] || [120, 180];
    return randomInRange(min, max);
  }
  
  export async function getEstimatedAttractionCost(city) {
    const [min, max] = attractionRanges[city] || [50, 90];
    return randomInRange(min, max);
  }