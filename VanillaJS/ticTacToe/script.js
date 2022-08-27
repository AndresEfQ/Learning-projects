const gameBoard = (() => {
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
);