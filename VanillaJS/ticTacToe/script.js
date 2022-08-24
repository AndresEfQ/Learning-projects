const gameBoard = (() => {
  let board = new Array(9);
  let mark = 'X'
  board = [
    "X","O","O",
    "X","X","X",
    "X","X","X"
  ];
  const showMove = (e) => {
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

  return {
    board,
    showMove
  };
})();

const player = (name, mark, isActive) => {
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
}

const displayController = (() => {
  
  const hideConfig = () => {
    document.querySelector(".configuration").style.display = "none";
  }
  const startGame = () => {
    hideConfig();
  }
 /*  const showMove = (e, mark) => {
    e.target.textContent = mark;
  } */

  return {
    startGame,
/*     player1,
    player2 */
  };
})();

Array.from(
  document.getElementsByClassName("play")).
  forEach((el) => el.addEventListener("click", displayController.startGame)
);

document.querySelector(".gameboard").addEventListener("click", gameBoard.showMove);