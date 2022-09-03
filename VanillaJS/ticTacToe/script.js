/* const gameBoard = (() => {
  const winnerMessage = document.getElementById('winner-message');
  const winnerDiv = document.getElementById('winner');
  const screen = Array.from(document.getElementsByClassName('box'));
  let board = new Array(9).fill(null);
  let inactivePlayer;

  const showMove = (index, mark, markColor) => {
    if (board[index]) return;
    board[index] = mark;
    screen[index].textContent = mark;
    screen[index].classList = `box ${markColor}`
  }
  const showResults = (winner) => {
    const message = winner ? `Congratulations ${winner.getName()}`: `It's a draw`; 
    winnerMessage.textContent = message;
    winnerDiv.style.display = 'flex';
  }
  const hideResults = () => {
    winnerDiv.style.display = 'none';
  }
  const showActivePlayer = (activePlayer) => {
    console.log(activePlayer == player1);
    inactivePlayer = activePlayer == player1 ? player2 : player1;
    const activePlayerName = document.getElementById(`${activePlayer.getId()}`);
    const inactivePlayerName = document.getElementById(`${inactivePlayer.getId()}`);
    activePlayerName.classList.add('animate-character');
    inactivePlayerName.classList.remove('animate-character');
  }
  const cleanBoard = () => {
    board.fill(null);
    screen.forEach((box) => {
      box.textContent = '';
      box.classList = 'box'
    })
    hideResults();
  }

  return {
    board,
    showMove,
    showResults,
    showActivePlayer,
    cleanBoard,
    inactivePlayer
  };
})();

const controler = (() => {
  const gameBoardElement = document.querySelector(".gameboard");
  let mode;
  let activePlayer;
  const hideConfig = () => {
    document.querySelector(".configuration").style.display = "none";
  }
  const setMode = () => {
    mode = document.getElementById('game-mode').value;
    console.log(mode);
  }
  const getMode = () => {
    return mode;
  }
  const startGame = () => {
    hideConfig();
    gameBoard.cleanBoard();
    gameBoardElement.addEventListener("click", controler.makeMove);
  }
  const setActivePlayer = (player) => {
    activePlayer = player
    gameBoard.showActivePlayer(activePlayer);
  }
  const toogleActivePlayer = () => {
    activePlayer = activePlayer == player1 ? player2 : player1;
    gameBoard.showActivePlayer(activePlayer);
  }
  const checkWinner = () => {
    let winner;
    const board = gameBoard.board;
    const lines = [[0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] == board[b] && board[a] == board[c]) {
        winner = board[a] == player1.mark ? player1 : player2;
      }
    }
    if (winner) {
      gameBoard.showResults(winner);
      gameBoardElement.removeEventListener('click', controler.makeMove);
    }
    if (board.every(Boolean)) gameBoard.showResults();
  }
  const makeMove = (e) => {
    activePlayer.play(e);
    checkWinner();
    toogleActivePlayer();
  }

  return {
    startGame,
    getMode,
    setMode,
    toogleActivePlayer,
    setActivePlayer,
    makeMove,
  };
})();

const player = (id, type, name, mark) => {
  const nameElement = document.getElementById(`${name}`);
  const markColor = mark == 'O' ? 'red-color' : 'black-color';
  const setName = (newName) => {
    name = newName;
  }
  const getName = () => {
    return name;
  }
  const getId = () => {
    return id;
  }
  const play = (e) => {
    const index = e.target.dataset['index'];
    gameBoard.showMove(index, mark, markColor);
  }
  nameElement.addEventListener('change', (e) => {
    setName(e.target.value);
  })

  return {
    getName,
    getId,
    play,
    mark
  }
}

let player1 = player('player1', 'human', 'player1', 'X');
let player2 = player('player2', 'human', 'player2', 'O');
controler.setActivePlayer(player1);

Array.from(
  document.getElementsByClassName("play")).
  forEach((el) => el.addEventListener("click", () => {
    controler.startGame();
    controler.setMode();
  })
); */

const gameBoard = (() => {
  let board = new Array(9).fill(null);
  //let emptyBoxes;
  const winnerMessage = document.getElementById('winner-message');
  const winnerDiv = document.getElementById('winner');
  const displayBoxes = Array.from(document.getElementsByClassName('box'));

  const checkWinner = (board, player) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    return lines.some(line => line.every(box => board[box] == player.mark))
  }
  const checkTie = (board) => {
    const emptyBoxes = board.filter(box => box == null);
    if (emptyBoxes.length == 0) return true;
  }
  const showResult = (board, player) => {
    let message;
    if (checkWinner(board, player)) {
      message = `${player.name} WINS!!`; 
    } else if (checkTie(board)) {
      message = `It's a tie`;
    } else {
      return false;
    }
    winnerMessage.textContent = message;
    winnerDiv.style.display = 'flex';
    return true;
  } 
  const move = (player, index) => {
    if (board[index]) return;
    board[index] = player.mark;
    /*emptyBoxes = board.reduce((prev, curr, currIndex) => {
      if (curr == null) {
        prev.push(currIndex);
      }
      return prev;
    }, []);*/
    displayBoxes[index].textContent = `${player.mark}`;
    displayBoxes[index].classList = `box ${player.markColor}`;
    let gameFinished = showResult(board, player);
    if (!gameFinished) {
      displayController.toogleActivePlayer();
    }
    return true;
  }
  /*const getEmptyBoxes = () => {
    return emptyBoxes;
  }*/
  return {
    board,
    // checkWinner,
    // checkTie,
    move,
    //getEmptyBoxes
  }
})();

const displayController = (() => {
  let player1;
  let player2;
  let activePlayer;
  let inactivePlayer;

  const assignStartingTurn = (player) => {
    activePlayer = player;
    inactivePlayer = player == player1 ? player2 : player1;
    showActivePlayer(activePlayer);
    player.play();
  }
  const toogleActivePlayer = () => {
    inactivePlayer = activePlayer;
    activePlayer = activePlayer == player1 ? player2 : player1;
    showActivePlayer(activePlayer);
    activePlayer.play();
  }
  const showActivePlayer = (player) => {
    const activePlayerName = document.getElementById(`${player.id}`);
    const inactivePlayerName = document.getElementById(`${inactivePlayer.id}`);
    activePlayerName.className = 'animate-character';
    inactivePlayerName.className = '';
  }
  /* const setActivePlayer = (player) => {
    activePlayer = player
    showActivePlayer();
  } */
  const startGame = (mode, difficulty) => {
    document.querySelector(".configuration").style.display = "none";
    player1 = player('player1', 'Player 1', 'human', 'X');
    let player2Type = mode == 'single' ? 'ia' : 'human';
    player2 = player('player2', 'Player 2', player2Type, 'O', difficulty);
    assignStartingTurn(player1); // Here I can change who starts
  }
  const getPlayer1 = function() { //only to check if working
    return player1;
  }

  const getActivePlayer = () => {
    return activePlayer;
  }

  return {
    startGame,
    getPlayer1, //may delete
    /* setActivePlayer, */
    getActivePlayer,
    toogleActivePlayer,
    assignStartingTurn
  }
})();

const human = () => {
  let index;
  const displayBoard = document.querySelector('.gameboard');
  let bindedHandler;

  const play = function() {
    bindedHandler = handleHumanMove.bind(this);
    displayBoard.addEventListener('click', bindedHandler);
  }
  const handleHumanMove = function(e) {
    index = e.target.dataset['index'];
    let moved = gameBoard.move(this, index);
    if (moved) displayBoard.removeEventListener('click', bindedHandler);
  }
  return { play };
}

const ia = (difficulty) => {
  let play;
  let index;

  const easyPlay = function() {
    let emptyBoxes = gameBoard.board.reduce((prev, curr, currIndex) => {
      if (curr == null) {
        prev.push(currIndex);
      }
      return prev;
    }, []);
    if (emptyBoxes.length == 0) return;
    console.log({emptyBoxes});
    let random = Math.floor(Math.random()*emptyBoxes.length)
    index = emptyBoxes[random];
    gameBoard.move(this, index);
    /* do {
      index = Math.floor(Math.random()*9);
      console.log(index);
      console.log(emptyBoxes);
    } while (!(emptyBoxes.some(box => box == index)))
    console.log(index)
    gameBoard.move(this, index); */
  }
  switch (difficulty) {
    case 'easy':
      play = easyPlay;
      break;
    case 'extreme':
      play = () => {console.log('ia is playing extreme')};
      break;
  }

  return { play };
}

const player = (id, name, type, mark, difficulty) => {
  const {play} = type == 'ia' ? ia(difficulty) : human();
  const markColor = mark == 'X' ? 'black' : 'red';
  /* const getMark = () => {
    return mark;
  }
  const getMarkColor = () => {
    return markColor;
  } */

  return {
    play,
    mark,
    markColor,
    id,
    name,
    type,
    mark,
    difficulty
  }
};

const options = Array.from(document.getElementsByClassName('game-option'));
options.forEach(option => option.addEventListener('click', () => displayController.startGame(option.dataset['mode'], option.dataset['difficulty'])));
