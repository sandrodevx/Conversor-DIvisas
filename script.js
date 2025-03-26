// Elementos del DOM
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert');
const swapBtn = document.getElementById('swap');
const rateInfo = document.getElementById('rate-info');

// API Key (gratuita para testing)
const API_KEY = '13e315fad97334de7cdaf3bb'; // Reemplaza con tu API Key de https://www.exchangerate-api.com/

// Fetch tasas de cambio
async function getExchangeRate() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`);
    const data = await response.json();
    
    if (data.result === 'success') {
      const rate = data.conversion_rate;
      const convertedAmount = (amount.value * rate).toFixed(2);
      result.value = convertedAmount;
      rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    } else {
      throw new Error(data['error-type']);
    }
  } catch (error) {
    rateInfo.textContent = 'Error al obtener tasas. Intenta más tarde.';
    console.error(error);
  }
}

// Event Listeners
convertBtn.addEventListener('click', getExchangeRate);

swapBtn.addEventListener('click', () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  getExchangeRate();
});

// Cargar tasas al iniciar
document.addEventListener('DOMContentLoaded', getExchangeRate);