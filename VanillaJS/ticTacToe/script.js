const gameBoard = (() => {
  let board = new Array(9);
  let mark = 'X'

  const showMove = (e) => {
    if (e.target.textContent) return;
    console.log(mark);
    gameBoard.board[e.target.dataset['index']] = mark;
    e.target.textContent = mark;
    if (mark == "O") {
      e.target.classList.add("red-color");
    } else {
      e.target.classList.remove("red-color")
    }
    mark = mark == "X" ? "O" : "X";
  }
  const checkWinner = () => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],
                   [0,3,6],[1,4,7],[2,5,8],
                   [0,4,8],[2,4,6]]
    lines.some((line) => {
      line.every((box) => {
        gameBoard.board[box]
      })
    })
  }

  return {
    board,
    showMove
  };
})();

/* const player = (name, mark, isActive) => {
  const makeMove = (e) => {
    gameBoard.board[e.target.dataset['index']] = mark;
  }

  return {
    makeMove,
    name,
    isActive
  };
};

const ia = () => {
  const iaNames = [
    "linguo",
    "mars rover",
    "pink robot",
    "metal gear rex",
    "Intergalactic",
    "t-1000",
    "maria",
    "sonny",
    "number six",
    "gerty",
    "kryten",
    "wall-e",
    "eve",
    "gort",
    "rosie",
    "robby",
    "awesom-o",
    "optimus-prime",
    "b-9",
    "hal",
    "terminator",
    "johnny 5",
    "marvin",
    "bishop",
    "bender",
    "r2-d2",
    "tars",
    "case",
    "kipp"
  ];
} */

const displayController = (() => {
  const player1Name = document.getElementById('player1');
  const player2Name = document.getElementById('player2');
  const hideConfig = () => {
    document.querySelector(".configuration").style.display = "none";
  }
  const startGame = () => {
    hideConfig();
  }
  const toogleActivePlayer = () => {
    if (player1Name.classList == "animate-character") {
      player1Name.classList.remove("animate-character");
      player2Name.classList.add("animate-character");
    } else {
      player2Name.classList.remove("animate-character");
      player1Name.classList.add("animate-character");
    }
  }

  return {
    startGame,
    toogleActivePlayer
  };
})();

Array.from(
  document.getElementsByClassName("play")).
  forEach((el) => el.addEventListener("click", displayController.startGame)
);

document.querySelector(".gameboard").addEventListener("click", (e) => {
  gameBoard.showMove(e);
  displayController.toogleActivePlayer();
});