const formElement = document.getElementById('tempForm');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('resetBtn');
const inputValue = document.getElementById('tempvalue');
const fromSelect = document.getElementById('yourTemp');
const toSelect = document.getElementById('scale');
formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    const value = parseFloat(inputValue.value);
    const from = fromSelect.value;
    const to = toSelect.value;
    if (isNaN(value)) {
        resultElement.textContent = 'Please enter a valid number.';
        return;
    }
    let celsiusValue;
    if (from === to) {
        celsiusValue = value;
    } else {
        switch (from) {
            case 'celsius': 
                celsiusValue = value;
                break;
            case 'fahrenheit':
                celsiusValue = (value - 32) * 5 / 9;
                break;
            case 'kelvin':
                celsiusValue = value - 273.15;
                break;
        }   
    }
    let convertedValue;
    switch (to) {
        case 'celsius':
            convertedValue = celsiusValue;
            break;
        case 'fahrenheit':
            convertedValue = (celsiusValue * 9 / 5) + 32;
            break;
        case 'kelvin':
            convertedValue = celsiusValue + 273.15;
            break;
    }
    resultElement.style.display = 'block';
    resultElement.textContent = `${value}° ${from.charAt(0).toUpperCase() + from.slice(1)} is ${convertedValue.toFixed(2)}° ${to.charAt(0).toUpperCase() + to.slice(1)}`;
});
resetButton.addEventListener('click', function() {
    inputValue.value = '';
    fromSelect.value = 'celsius';
    toSelect.value = 'fahrenheit';
    resultElement.textContent = '';
    resultElement.style.display = 'none';
});
