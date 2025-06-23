/*  const itinerary = (() => {
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
      // Retorna uma cópia para proteger o array interno
      return [...items];
    };
  
    const updateLocalStorage = () => {
      try {
        localStorage.setItem("itineraryItems", JSON.stringify(items));
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
      }
    };
  
    const loadFromLocalStorage = () => {
      const storedItems = localStorage.getItem("itineraryItems");
      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems);
          if (Array.isArray(parsed)) {
            items = parsed;
          } else {
            console.warn('Itens no localStorage não são um array válido.');
            items = [];
          }
        } catch (e) {
          console.error('Erro ao ler do localStorage:', e);
          items = [];
        }
      }
    };
  
    // Inicializa desde localStorage
    loadFromLocalStorage();
  
    return {
      addItem,
      editItem,
      removeItem,
      getItems,
    };
  })();
  
  export default itinerary;*/

  const itinerary = (() => {
    let items = []; // 
  
    const addItem = (item) => {
      items.push(item); // 
      updateLocalStorage(); // 
    };
  
    const editItem = (index, updatedItem) => {
      if (index >= 0 && index < items.length) { // 
        items[index] = updatedItem; // 
        updateLocalStorage(); // 
      }
    };
  
    const removeItem = (index) => {
      if (index >= 0 && index < items.length) { // 
        items.splice(index, 1); // 
        updateLocalStorage(); // 
      }
    };
  
    const getItems = () => {
      // Retorna uma cópia para proteger o array interno
      return [...items]; // 
    };
  
    const updateLocalStorage = () => {
      try {
        localStorage.setItem("itineraryItems", JSON.stringify(items)); // 
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e); // 
      }
    };
  
    const loadFromLocalStorage = () => {
      const storedItems = localStorage.getItem("itineraryItems"); // 
      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems); // 
          if (Array.isArray(parsed)) { // 
            items = parsed; // 
          } else {
            console.warn('Itens no localStorage não são um array válido.'); // 
            items = []; // 
          }
        } catch (e) {
          console.error('Erro ao ler do localStorage:', e); // 
          items = []; // 
        }
      }
    };
    // Inicializa desde localStorage
    loadFromLocalStorage(); // 
  
    return {
      addItem, // 
      editItem, // 
      removeItem, // 
      getItems, // 
    };
  })();
  
  export default itinerary; //
  