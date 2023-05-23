// Obtener datos de cotización de criptomonedas
const currencyList = document.getElementById('currency-list');
const updatedTime = document.getElementById('updated-time');
const errorMessage = document.getElementById('error-message');
const loadingMessage = document.getElementById('loading-message');

fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then(response => response.json())
  .then(data => {
    updatedTime.textContent = `Actualizado: ${data.time.updated}`;
    errorMessage.style.display = 'none';
    loadingMessage.style.display = 'none';

    for (const currencyCode in data.bpi) {
      const currency = data.bpi[currencyCode];
      const currencyElement = document.createElement('div');
      currencyElement.className = 'currency';

      const currencyDescription = document.createElement('span');
      currencyDescription.textContent = `${currency.description}: `;
      currencyElement.appendChild(currencyDescription);

      const currencyRate = document.createElement('span');
      currencyRate.className = 'lighten';
      currencyRate.innerHTML = `${currency.symbol}${currency.rate_float}`;
      currencyElement.appendChild(currencyRate);

      currencyList.appendChild(currencyElement);
    }
  })
  .catch(error => {
    console.log('Error al obtener los datos de cotización:', error);
    errorMessage.style.display = 'block';
    loadingMessage.style.display = 'none';
  });
