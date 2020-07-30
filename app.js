// Basic functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? 'Cannot divide with zero' : a / b;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case 'add':
      return add(num1, num2);
      break;
    case 'subtract':
      return subtract(num1, num2);
      break;
    case 'multiply':
      return multiply(num1, num2);
      break;
    case 'divide':
      return divide(num1, num2);
  }
}

// DOM elements
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator');
let output = document.querySelector('.output');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

// Variables
let displayValue, operation, operator, number1, number2;
let isOperatorPressed = false;
let result = 0;

// Functions

function init() {
  number1 = 0;
  number2 = 0;
  displayValue = '';
  result = 0;
  output.innerHTML = result;
}

// runs as soon as user clicked one of the number key
function updateDisplay(e) {
  displayValue += e.target.textContent;
  output.innerHTML = displayValue;
  if (isOperatorPressed) {
    number2 = e.target.textContent;
    displayValue = operate(operation, number1, number2);
  }
}

// runs whenever operator is clicked and save operation to global variable;
function handleOperation(e) {
  number1 = displayValue;
  displayValue += e.target.innerHTML;
  operation = e.target.dataset.action;
  isOperatorPressed = true;
  if (result) {
    number1 = result;
  }
}

// Events
numberKeys.forEach(numberKey =>
  numberKey.addEventListener('click', e => updateDisplay(e))
);

operatorKeys.forEach(operator =>
  operator.addEventListener('click', e => handleOperation(e))
);

clearButton.addEventListener('click', e => {
  init();
});
equalButton.addEventListener('click', () => {
  // set number 2 to be either the first number after the operation or the first number after the first operation(before the equal operator)
  number2 =
    number2 || displayValue.replace(number1, '').match(/[^\+|\-|\*|\/]\d*/);
  result = operate(operation, number1, number2);
  output.innerHTML = result % 1 ? Number(result.toFixed(4)) : result;
  operation = '';
});

// runs as soon as the page loads or reloads
init();
