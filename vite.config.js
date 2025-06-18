// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path'; // Para ajudar a resolver caminhos absolutos

export default defineConfig({
  // Seus arquivos estáticos (como imagens, etc.) já devem estar na pasta 'public' na raiz
  // e ser referenciados como '/images/minha-imagem.jpg'

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Adicione seus outros arquivos HTML aqui como pontos de entrada
        searchResult: resolve(__dirname, 'src/search_result/searchResult.html'),
        itinerary: resolve(__dirname, 'src/Itinerary/itinerary.html'), // Verifique o case "Itinerary"
      },
    },
  },
});