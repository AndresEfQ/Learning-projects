// DOM constants

const display = document.querySelector('.display');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const floatPointBtn = document.getElementById('float-point');
const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');


// working variables

let valToDisplay = '0';
display.textContent = '0';
let numbInMemory = 0;
let overwrite = true;
let operation = '';
let input = 'disabled';

const operations = {
  '+': function(a, b) {return roundVal(parseFloat(a) + parseFloat(b))},
  '-': function(a, b) {return roundVal(parseFloat(a) - parseFloat(b))},
  '*': function(a, b) {return roundVal(parseFloat(a) * parseFloat(b))},
  '%': function(a, b) {return roundVal(parseFloat(a) * parseFloat(b) / 100)},
  '/': function(a, b) {
    if (b == 0) {
      return 'division by 0';
    } else {
      return roundVal(parseFloat(a) / parseFloat(b));
    } 
  },
};


// Event listeners 

window.addEventListener('load', enableInput);
clearBtn.addEventListener('click', clear);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Delete') {
    clear(event);
  } else {
    return;
  }
})


//keyboard functionality

function keyboardInput(event) {

  if ((/[0-9]/).test(event.key)) {
    enterDigit(event);
  } else if ((/[+/*%\-]/).test(event.key)) {
    enterOperator(event);
  } else if (event.key === 'Enter') {
    equal(event);
  } else if (event.key === 'Backspace') {
    backspace(event);
  } else if (event.key === '.') {
    floatPoint(event);
  } else {
    return;
  }
}


// function definitions

function clear(event) {
  event.target.blur();
  valToDisplay = 0;
  numbInMemory = 0;
  overwrite = true;
  operation = '';
  display.style.fontSize = '56px';
  showDisplay();
  if (input === 'disabled') {
    enableInput();
  }
}

function backspace(event) {
  event.target.blur();
  valToDisplay = `${valToDisplay}`.slice(0, `${valToDisplay}`.length - 1);
  showDisplay();
}

function floatPoint(event) {
  event.target.blur();
  if (!overwrite && display.textContent.indexOf('.') !== -1) {
    return;
  } else if (overwrite) {
    valToDisplay = '0.'
  } else {
    valToDisplay += '.';
  }
  overwrite = false;
  showDisplay(); 
}

function enterDigit(event) {
  event.target.blur();
  if (valToDisplay === '0' || overwrite) {
    valToDisplay = event.key || event.target.id;
    overwrite = false;
    showDisplay();

  } else if (!overwrite) {

  // Had to specify a string like behaviour when the input is shorter than 7 digits to deal with float points
    valToDisplay = (`${valToDisplay}`.length < 9) ? 
            display.textContent + (event.key || event.target.id):
            (valToDisplay * 10) + parseInt(event.key || event.target.id);
  
    showDisplay();
  }
}

function enterOperator(event) {
  event.target.blur();
  numbInMemory = numbInMemory ? operation(numbInMemory, +valToDisplay) : valToDisplay;
  valToDisplay = numbInMemory;
  operation = operations[event.key] || operations[event.target.id];
  overwrite = true;
  showDisplay();
}

function equal(event) {
  event.target.blur();
  valToDisplay = operation(numbInMemory, valToDisplay);
  showDisplay();
  numbInMemory = '';
  operation = '';
  overwrite = true;
}

function showDisplay() {

  if (valToDisplay > 9.999e99) {
    valToDisplay = Infinity;
    display.textContent = 'You\'re gone too far my friend. To Infinity and Beyond!';
    display.style.fontSize = '24px';
    disableInput();

  } else if (valToDisplay === 'division by 0') {
    display.textContent = 'I pity the fool who tries to divide by 0';
    display.style.fontSize = '24px';
    disableInput();

  } else if (`${valToDisplay}`.length === 0) {
    valToDisplay = 0;
    display.textContent = 0;

  } else if (`${valToDisplay}`.length >= 9){
    display.textContent = parseFloat(valToDisplay).toExponential(3);

  } else {
    display.textContent = valToDisplay;
  }

  let cover = document.createElement('div');
  cover.style.cssText = 'background-color: var(--black);position: absolute; width: 100%; height: 100%; top: 0;bottom: 0;'
  display.appendChild(cover);
  setTimeout(() => {
    display.removeChild(cover);
  }, 10);
}

function enableInput() {
  console.log('Input enabled');
  digits.forEach(element => {
    element.addEventListener('click', enterDigit);
  });

  operators.forEach(element => {
    element.addEventListener('click', enterOperator);
  });

  backspaceBtn.addEventListener('click', backspace);
  floatPointBtn.addEventListener('click', floatPoint);
  equalBtn.addEventListener('click', equal);
  window.addEventListener('keydown', keyboardInput);
  input = 'enabled';
}

function disableInput() {

  digits.forEach(element => {
    element.removeEventListener('click', enterDigit);
  });

  operators.forEach(element => {
    element.removeEventListener('click', enterOperator);
  });

  backspaceBtn.removeEventListener('click', backspace);
  floatPointBtn.removeEventListener('click', floatPoint);
  equalBtn.removeEventListener('click', equal);
  window.removeEventListener('keydown', keyboardInput);
  input = 'disabled';
}

function roundVal(value) {
  return Math.round(value * 100000) / 100000;
}