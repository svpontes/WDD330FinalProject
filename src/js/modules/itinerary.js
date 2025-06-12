// src/js/modules/itinerary.js
import { load } from 'flat-cache';
import { loadHeaderFooter } from '../utils.js';  

loadHeaderFooter();

const itinerary = (() => {
    let items = [];

    const addItem = (item) => {
        items.push(item);
        updateLocalStorage();
    };

    const editItem = (index, updatedItem) => {
        if (index >= 0 && index < items.length) {
            items[index] = updatedItem;
            updateLocalStorage();
        }
    };

    const removeItem = (index) => {
        if (index >= 0 && index < items.length) {
            items.splice(index, 1);
            updateLocalStorage();
        }
    };

    const getItems = () => {
        return items;
    };

    const updateLocalStorage = () => {
        localStorage.setItem('itineraryItems', JSON.stringify(items));
    };

    const loadFromLocalStorage = () => {
        const storedItems = localStorage.getItem('itineraryItems');
        if (storedItems) {
            items = JSON.parse(storedItems);
        }
    };

    // Load items from local storage when the module is initialized
    loadFromLocalStorage();

    return {
        addItem,
        editItem,
        removeItem,
        getItems,
    };
})();

export default itinerary;