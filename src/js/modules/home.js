// src/js/modules/home.js

export const initHomePage = () => {
    const searchBar = document.getElementById('search-bar');
    const featuredDestinations = document.getElementById('featured-destinations');

    // Event listener for search bar
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value;
        // Implement search functionality here
    });

    // Function to display featured destinations
    const displayFeaturedDestinations = (destinations) => {
        featuredDestinations.innerHTML = '';
        destinations.forEach(destination => {
            const destinationCard = document.createElement('div');
            destinationCard.classList.add('destination-card');
            destinationCard.innerHTML = `
                <img src="${destination.image}" alt="${destination.name}">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
            `;
            featuredDestinations.appendChild(destinationCard);
        });
    };

    // Sample data for featured destinations
    const sampleDestinations = [
        { name: 'Paris', description: 'The city of lights.', image: 'path/to/paris.jpg' },
        { name: 'Tokyo', description: 'A bustling metropolis.', image: 'path/to/tokyo.jpg' },
        { name: 'Rio de Janeiro', description: 'Famous for its beaches.', image: 'path/to/rio.jpg' }
    ];

    displayFeaturedDestinations(sampleDestinations);
};