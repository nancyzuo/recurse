document.addEventListener("DOMContentLoaded", () => {
  //checks that page is loadedbefore running script
  const board = document.getElementById("board");
  const statusText = document.getElementById("status");
  document.getElementById("twoBtn").classList.add("active");

  // STATE VARIABLES
  let cells = []; // squares for board
  let currentPlayer = "X"; // tracks whose turn it is
  let gameActive = true; // prevents moves after game is over
  let gameMode = "two"; // select 1 player or 2 player, starts as 2 by default

  // initialize background, it is red/blue depending on whose turn it is
  updateBackground();

  // create grid
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", () => handleClick(cell, i));

    board.appendChild(cell);
    cells.push(cell);
  }

  // set mode for game, either 1 player or 2 player, and reset game when mode is changed
  window.setMode = function (mode) {
    gameMode = mode;

    // remove active from both
    document.getElementById("oneBtn").classList.remove("active");
    document.getElementById("twoBtn").classList.remove("active");

    // add active to selected
    if (mode === "one") {
      document.getElementById("oneBtn").classList.add("active");
    } else {
      document.getElementById("twoBtn").classList.add("active");
    }
    resetGame();
  };

  function handleClick(cell, index) {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); //

    if (checkWinner()) {
      statusText.textContent = `player ${currentPlayer} wins!!!`;
      gameActive = false;
      return;
    }

    if (cells.every((c) => c.textContent !== "")) {
      statusText.textContent = "it's a draw!";
      gameActive = false;
      return;
    }

    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    statusText.textContent = `player ${currentPlayer}'s turn`;
    updateBackground();
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPatterns.length; i++) {
      const pattern = winPatterns[i];

      const a = pattern[0];
      const b = pattern[1];
      const c = pattern[2];

      const cellA = cells[a].textContent;
      const cellB = cells[b].textContent;
      const cellC = cells[c].textContent;

      if (cellA !== "" && cellA === cellB && cellA === cellC) {
        return true; // winner found if all cells in a row are the same letter (x or o)
      }
    }
    return false; // no winner
  }

  function updateBackground() {
    document.body.classList.remove("x-turn", "o-turn"); // changes background color based on turn
    document.body.classList.add(currentPlayer.toLowerCase() + "-turn");
  }

  window.resetGame = function () {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "player X's turn";
    updateBackground();
  };
});
