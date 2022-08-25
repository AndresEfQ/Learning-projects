const gameBoard = (() => {
  let board = new Array(9).fill(null);

  const showMove = (index, mark, markColor) => {
    const screen = Array.from(document.getElementsByClassName('box'));
    if (board[index]) return;
    board[index] = mark;
    screen[index].textContent = mark;
    screen[index].classList = `box ${markColor}`
  }
  const checkWinner = () => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],
                   [0,3,6],[1,4,7],[2,5,8],
                   [0,4,8],[2,4,6]]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] == board[b] && board[a] == board[c]) {
        return board[a];
      }
    }
  }

  return {
    showMove,
    checkWinner
  };
})();

const controler = (() => {
  /* const player1Name = document.getElementById('player1');
  const player2Name = document.getElementById('player2'); */
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
  }
  const setActivePlayer = (player) => {
    activePlayer = player
    showActivePlayer();
  }
  const toogleActivePlayer = () => {
    activePlayer = activePlayer == player1 ? player2 : player1;
    showActivePlayer();
  }
  const showActivePlayer = () => {
    const activePlayerName = document.getElementById(`${activePlayer.getName()}`);
    const inactivePlayerName = document.getElementById(`${
      activePlayer.getName() == 'player1' ? 'player2' : 'player1'}`
    )
    activePlayerName.classList.add('animate-character');
    inactivePlayerName.classList.remove('animate-character');
  }
  const makeMove = (e) => {
    activePlayer.play(e);
  }

  return {
    startGame,
    getMode,
    setMode,
    toogleActivePlayer,
    setActivePlayer,
    showActivePlayer,
    makeMove
  };
})();

const player = (type, name, mark) => {
  const markColor = mark == 'O' ? 'red-color' : 'black-color';
  const setName = (newName) => {
    name = newName;
  }
  const getName = () => {
    return name;
  }
  const play = (e) => {
    const index = e.target.dataset['index'];
    gameBoard.showMove(index, mark, markColor);
  }

  return {
    setName,
    getName,
    play
  }
}

let player1 = player('human', 'player1', 'X');
let player2 = player('human', 'player2', 'O');
controler.setActivePlayer(player1);

Array.from(
  document.getElementsByClassName("play")).
  forEach((el) => el.addEventListener("click", () => {
    controler.startGame();
    controler.setMode();
  })
);

document.querySelector(".gameboard").addEventListener("click", (e) => {
  controler.makeMove(e);
  controler.toogleActivePlayer();
  if (gameBoard.checkWinner()) console.log(gameBoard.checkWinner());
});