
const currency_one = document.getElementById('currency-one');
const amt_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amt_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// get the exchange rate 
function calculate() {
    const currencyOne = currency_one.value;
    const currencyTwo = currency_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.rates[currencyTwo]+ Number.EPSILON;
        //rate = Math.round((rate + Number.EPSILON) * 100) / 100;

        rateElement.innerText = `1 ${currencyOne} is worth ${rate} of ${currencyTwo}`;
        amt_two.value = (amt_one.value * rate).toFixed(2);
    });
}

function swapCurr() {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;

    calculate();
}

// event listeners
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
amt_one.addEventListener('input', calculate);
amt_two.addEventListener('input', calculate);
swap.addEventListener('click', swapCurr);

calculate();