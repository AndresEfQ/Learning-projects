const gameBoard = (() => {
  let board = new Array(9);
  board = [
    "X","O","O",
    "X","X","X",
    "X","X","X"
  ];
  return {
    board
  };
})();

const player = (name, mark) => {

  return {
    name,
    mark
  };
};

const displayController = (() => {

  return {

  };
})();