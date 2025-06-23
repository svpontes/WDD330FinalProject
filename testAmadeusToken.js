// testAmadeusToken.js

// Substitua com suas chaves reais do config.js
const AMADEUS_API_KEY = '47lYUmwSxHXI0ON9U3AqphYdVyewc6jA'; // Seu Client ID

const AMADEUS_API_SECRET = "ynVg8DOZcS9GSXrG"; // Seu Client Secret

async function getAmadeusAccessToken() {
    try {
        const response = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao obter token Amadeus:', response.status, response.statusText, errorText);
            throw new Error(`Failed to get Amadeus token: ${response.status}`);
        }

        const data = await response.json();
        console.log('Token Amadeus obtido com sucesso:');
        console.log('Access Token:', data.access_token);
        console.log('Tipo de Token:', data.token_type);
        console.log('Expira em (segundos):', data.expires_in);
        return data.access_token;

    } catch (error) {
        console.error('Erro na requisição do token Amadeus:', error);
        return null;
    }
}

// Chamar a função para obter o token
getAmadeusAccessToken();