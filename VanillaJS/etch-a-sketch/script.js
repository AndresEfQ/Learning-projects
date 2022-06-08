// Variables

const RED = 'rgb(256, 0, 0)';
let slider = document.querySelector('input[type=range]');
let drawingArea = document.querySelector('.drawingArea');
let root = document.querySelector(':root');
let colorPicker = document.querySelector('input[type=color]');
let powerLight = document.querySelector('.power-light');
let gridSize = slider.value;
let gridCellColor = colorPicker.value;
let R = colorDecompose('R', colorPicker.value);
let G = colorDecompose('G', colorPicker.value);
let B = colorDecompose('B', colorPicker.value);
let RStep = Math.floor(R/5);
let GStep = Math.floor(G/5);
let BStep = Math.floor(B/5);
let opacity;
let powerOn = false;
let eraseMode = false;
let softMode = false;
let rainbowMode = false;
let randomMode = false;
let rainbowState = 'greenIncrease';
let rainbowColor = RED;

// Initialize the drawing area with default grid size and color

window.onload = drawGrid;

function drawGrid() {
  drawingArea.innerHTML = '';
  root.style.setProperty(`--grid-col-number`, `${gridSize}`);
  for (let i = 0; i < Math.pow(gridSize, 2); i++) {
    let gridCell = document.createElement('div');
    gridCell.addEventListener('mouseenter', (e) => {
      if (eraseMode) {
        eraseCell(e);
      } else if (powerOn) {
        if (softMode) {
          softPaintCell(e);
        } else if (rainbowMode) {
          rainbowPaintCell(e);
        } else if (randomMode) {
          randomPaintCell(e);
        } else {
          paintCell(e);
        }
      }
    });
    drawingArea.appendChild(gridCell);
  }
}

drawingArea.addEventListener('click', togglePower);

function togglePower() {
  if (!powerOn) {
    powerOn = true;
  } else {
    powerOn = false;
  }
  powerLight.classList.toggle('turned-on');
}

function paintCell(e) {
  e.target.style.opacity = opacity;
  e.target.style.backgroundColor = gridCellColor;  
}

// change grid cell color and calculate step for soft mode when input color changes

colorPicker.addEventListener('change', () => {
  R = colorDecompose('R', colorPicker.value);
  G = colorDecompose('G', colorPicker.value);
  B = colorDecompose('B', colorPicker.value);
  gridCellColor = `rgb(${R},${G},${B})`;
  RStep = Math.floor(R/5);
  GStep = Math.floor(G/5);
  BStep = Math.floor(B/5);
});

// Update label text with slider value for the change size slider 

slider.addEventListener('mousemove', () => {
  slider.nextElementSibling.textContent = slider.value;
});

// draw a new grid when the grid size changes

slider.addEventListener('mouseup', () => {
  gridSize = slider.value;
  drawGrid();
  if (powerOn) {togglePower()};
});

// erase button function

let eraseButton = document.querySelector('.erase');
eraseButton.addEventListener('click', toggleErase);

function toggleErase() {
  if (!eraseMode) {
    eraseMode = true;
    gridCellColor = '';
    opacity = '';
    powerLight.classList.add('turned-on');
    drawingArea.removeEventListener('click', togglePower);
  } else {
    eraseMode = false;
    gridCellColor = colorPicker.value;
    rainbowState = 'greenIncrease';
    rainbowColor = RED;
    powerLight.classList.remove('turned-on');
    drawingArea.addEventListener('click', togglePower);
  }
  eraseButton.classList.toggle('pushed');
}

function eraseCell(e) {
  e.target.style.opacity = '';
  e.target.style.backgroundColor = '';  
}

// soft mode function

let softButton = document.querySelector('.soft');
softButton.addEventListener('click', toggleSoft);

function toggleSoft() {
  if (!softMode) {
    softMode = true;
    
    if (rainbowMode) {toggleRainbow()};
    if (randomMode) {toggleRandom()};

  } else {
    softMode = false
  }
  softButton.classList.toggle('pushed');
}

function softPaintCell(e) {
  opacity = +e.target.style.opacity;
  if (e.target.style.backgroundColor === '') {
    gridCellColor = colorPicker.value;
  } else {
    gridCellColor = e.target.style.backgroundColor;
  }
  if (opacity < 1) {
    opacity += 0.2;
  } else if (opacity === 1) {
    R = colorDecompose('R', gridCellColor) - RStep;
    G = colorDecompose('G', gridCellColor) - GStep;
    B = colorDecompose('B', gridCellColor) - BStep;
    gridCellColor = `rgb(${R},${G},${B})`;
  }
  e.target.style.opacity = opacity;
  e.target.style.backgroundColor = gridCellColor;
}

// rainbow mode function

let rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener('click', toggleRainbow);

function toggleRainbow() {
  if (!rainbowMode) {
    rainbowMode = true;
    rainbowColor = RED;
    rainbowState = 'greenIncrease';

    if (softMode) {toggleSoft()};
    if (randomMode) {toggleRandom()};

  } else {
    rainbowMode = false
  }
  rainbowButton.classList.toggle('pushed');
}

function rainbowPaintCell(e) {
  switch (rainbowState) {
    case 'greenIncrease':
      R = +colorDecompose('R', rainbowColor);
      G = +colorDecompose('G', rainbowColor) + 64;
      B = +colorDecompose('B', rainbowColor);
      console.log(rainbowColor);
      if (G === 256) {rainbowState = 'redDecrease'}
      rainbowColor = `rgb(${R}, ${G}, ${B})`;
    break;
    case 'redDecrease':
      R = +colorDecompose('R', rainbowColor) - 64;
      G = +colorDecompose('G', rainbowColor);
      B = +colorDecompose('B', rainbowColor);
      console.log(rainbowColor);
      if (R === 0) {rainbowState = 'blueIncrease'}
      rainbowColor = `rgb(${R}, ${G}, ${B})`;
    break;
    case 'blueIncrease':
      R = +colorDecompose('R', rainbowColor);
      G = +colorDecompose('G', rainbowColor);
      B = +colorDecompose('B', rainbowColor) + 64;
      if (B === 256) {rainbowState = 'greenDecrease'}
      rainbowColor = `rgb(${R}, ${G}, ${B})`;
    break;
    case 'greenDecrease':
      R = +colorDecompose('R', rainbowColor);
      G = +colorDecompose('G', rainbowColor) - 64;
      B = +colorDecompose('B', rainbowColor);
      if (G === 0) {rainbowState = 'redIncrease'}
      rainbowColor = `rgb(${R}, ${G}, ${B})`;
    break;
    case 'redIncrease':
      R = +colorDecompose('R', rainbowColor) + 64;
      G = +colorDecompose('G', rainbowColor);
      B = +colorDecompose('B', rainbowColor);
      if (R === 256) {rainbowState = 'blueDecrease'}
      rainbowColor = `rgb(${R}, ${G}, ${B})`;
    break;
    case 'blueDecrease':
      R = +colorDecompose('R', rainbowColor);
      G = +colorDecompose('G', rainbowColor);
      B = +colorDecompose('B', rainbowColor) - 64;
      if (B === 0) {rainbowState = 'greenIncrease'}
      rainbowColor = `rgb(${R}, ${G}, ${B})`;
    break;
  }
  e.target.style.opacity = '';
  e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
}

// random mode function

let randomButton = document.querySelector('.random');
randomButton.addEventListener('click', toggleRandom);

function toggleRandom() {
  if (!randomMode) {
    randomMode = true;
    
    if (softMode) {toggleSoft()};
    if (rainbowMode) {toggleRainbow()};

  } else {
    randomMode = false
  }
  randomButton.classList.toggle('pushed');
}

function randomPaintCell(e) {
  R = random(256);
  G = random(256);
  B = random(256);
  e.target.style.opacity = '';
  e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
}

function random (max, min = 0) {
  return Math.floor(Math.random() * max) + min;
}

function colorDecompose (component, source) {
  let result;
  if (source.charAt(0) === '#') {
    switch (component) {
      case 'R':
        result = parseInt(source.slice(1, 3), 16);
        break;
      case 'G':
        result = parseInt(source.slice(3, 5), 16);
        break;
      case 'B':
        result = parseInt(source.slice(5), 16);
        break;
    }
  } else if (source.charAt(0) === 'r') {
    switch (component) {
      case 'R':
        result = +source.slice((source.indexOf('(') + 1), (source.indexOf(',')));
        break;
      case 'G':
        result = +source.slice((source.indexOf(',') + 1), (source.lastIndexOf(',')));
        break;
      case 'B':
        result = +source.slice((source.lastIndexOf(',') + 1), (source.indexOf(')')));
        break;
    }
  }
  return result;
}