function init() { 
  // function to start the game: Get the fire button and input from the app
  // and generate the ships radomly
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeydown = handleKeyDown;
  model.generateShipLocations();
  var clickCells = document.getElementsByTagName("td");
  for (cell of clickCells) {
    cell.onclick = handleClick;
  }
}

function handleFireButton() {
  // When the fire button is pressed, the controller process guess method 
  // is invoked.
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.parseProcessGuess(guess);
  guessInput.value = '';
}

function handleKeyDown(enter) {
  // When the user press return (keycode = 13), the fire button onclick method
  // is invoked
  var fireButton = document.getElementById("fireButton");
  if (enter.keyCode === 13) {
    fireButton.onclick();
    return false // return false, so the app doesn't try to send info to a server
  }
}

function handleClick(objEvent) {
  var location = objEvent.target.id;
  controller.processGuess(location);
}

window.onload = init; // invoke the init function after the page is loaded.

// The view object is in charge of updating the game display
var view = {
  // This method takes a string and displays it in the message area
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  // This method places a miss image in a cell of the grid
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.classList.add("miss");
  },

  // This method places a hit in a cell of the grid
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.classList.add("hit");
  }
}

// The model object is in charge of keeping the game state and handiling its 
// logic
var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [ { locations: [0, 0, 0], hits: ["", "", ""] },
           { locations: [0, 0, 0], hits: ["", "", ""] },
           { locations: [0, 0, 0], hits: ["", "", ""] } ],

  // This method checks if the guess hits or misses and if a ship is sunk  
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) { // loop through all the ships
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);

      // If the guess is equal to one of the ship's locations it's a hit, else
      // it's a miss
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("¡Acertaste!")

        if (this.isSunk(ship)) {
          this.shipsSunk++;
          view.displayMessage("¡Hundiste mi barco!")
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("¡Fallaste!");
    return false;
  },

  // This method checks if all the ship's hits posittions are equal to hit, 
  // then the ship is sunk.
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") return false;
    }
    return true;
  },

  // This method keeps generating ships until the number of ships is reached
  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      // If any of the ship's location collide with another ship, it's 
      // discarted and the generateShip function is invoked again.

      this.ships[i].locations = locations;
      // When no locations collide, they are saved inside the ship's locations
    }
  },

  // this method generates a random ship
  generateShip: function() {
    // coin toss to choose horizontal (1) or vertical (0)
    var direction = Math.floor(Math.random() * 2); 
    var row;
    var col;

    if (direction === 1) {
      // generate a starting location for horizontal ship
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
    } else {
      // generate a starting location for vertical ship
      row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];

    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        // add location to array for new horizontal ship
        newShipLocations.push(row + "" + (col + i));
      } else {
        // add location to array for new vertical ship
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  // this method checks if any of the locations from a locations array
  // collides with the locations of any of the already located ships
  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

// the controller object is in charge of getting the user guess validate it
// and send it to the model object in the proper format
var controller = {
  guesses: 0,
  guessList: [],

  // This method sends the guess to the model fire method to check if the 
  // guess is a hit or a miss and finishes the game if all ships are sunk.
  parseProcessGuess: function(guess) {
    var location = this.parseGuess(guess);
    this.processGuess(location);
  },

  processGuess: function(location) {
    // if the guess is valid, add it to the guesses count and list, 
    // sends it to the model fire method and saves the result in the hit 
    // variable.
    if (location) {
      if (this.guessList.indexOf(location) >= 0) {
      // checks if the guess is already choosen.
      alert("Ya disparaste en esa posición, por favor elije otra")
      } else {
        this.guesses++;
        this.guessList.push(location);
        var hit = model.fire(location);
      }
      // if the guess is a hit and all ships are sunk, ends the game
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("Hundiste todos mis barcos, en " + this.guesses + " intentos");
        var input = document.getElementById("input");
        input.classList.add("hidden"); // hides the guess input to end the game
      }
    }
  },

  // this method parses the guess from alphanumeric to numeric format 
  // ex. from A0 to 00 and checks if it's valid, it's inside the board and
  // and hasn't been coosen before. 
  parseGuess: function(guess) {
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
                    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
                    'W', 'X', 'Y', 'Z'];

    if (guess == null || guess.length !== 2) {
      // checkes if the guess is empty or is bigger than 2 chars.  
      alert("Oops, por favor elije un número y letra que estén en el tablero");
    } else {
      // parses from alphanumeric to numeric format using the alphabet array.
      var row = alphabet.indexOf(guess.charAt(0).toUpperCase());
      var col = guess.charAt(1);

      if (isNaN(row) || isNaN(col)) {
        // checks if the parsed guess is not a number.
        alert("Oops, eso no está en el tablero.");

      } else if (row < 0 || row >= model.boardSize ||
                 col < 0 || col >= model.boardSize) {
        // checkes if the guess is negative or bigger than the board size.
        alert("Oops, eso no está en el tablero")

      } else {
        return row + col;
      }
    }
    return null;
  }
}
