//  Grid Array Diagram:
//  0       1       2
//  3       4       5
//  6       7       8

console.log("Connected");
const announcement = document.getElementById("announcement");

let gameIsOver = false;

let moveCounter = 0;

let boardState = ["", "", "", "", "", "", "", "", ""];

let playerScore = 0;
let computerScore = 0;

let playerScoreDisplay = document.getElementById("playerScore");
let computerScoreDisplay = document.getElementById("computerScore");

const squaresArray = document.getElementsByClassName("grid-item");

const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlayText");
const nameInputBtn = document.getElementById("nameInputBtn");
const nameInput = document.getElementById("nameInput");
const nameInputOverlay = document.getElementById("nameInputOverlay");
const playerNameField = document.getElementById("playerName");
const resetBtn = document.getElementById("resetBtn");

let compMoveIndex = 0;

const movesArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

nameInputBtn.addEventListener("click", function () {
  nameInputOverlay.style.display = "none";
  if (nameInput.value !== "") {
    playerNameField.innerText = `${nameInput.value}:`;
  }
});

nameInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    nameInputBtn.click();
  }
});

resetBtn.addEventListener("click", function () {
  resetBoard();
  resetScore();
});

function resetBoard() {
  gameIsOver = false;
  moveCounter = 0;
  boardState = ["", "", "", "", "", "", "", "", ""];
  for (const square in squaresArray) {
    squaresArray[square].textContent = "";
  }
}

function resetScore() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
}

overlay.addEventListener("click", function () {
  overlay.style.display = "none";
  resetBoard();
});

for (let i = 0; i < squaresArray.length; i++) {
  squaresArray[i].addEventListener("click", function () {
    compMoveIndex = action(i);
    squaresArray[i].textContent = boardState[i];
    setTimeout(function () {
      squaresArray[compMoveIndex].textContent = boardState[compMoveIndex];
    }, 200);
  });
}

function updateScenarios(board) {
  let scenarioStr = "";
  let combos = [];
  for (let x = 0; x < movesArray.length; x++){
    scenarioStr = "";
    for (let y = 0; y < movesArray[x].length; y++) {
      scenarioStr += board[movesArray[x][y]];
    }
    combos.push(scenarioStr);
  }
  return combos;
};

function action(index) {
  let board = boardState;
  if (board[index] === "" && !gameIsOver) {
    board[index] = "X";
    moveCounter++;
    gameIsOver = isGameOver(board, moveCounter);
    if (!gameIsOver) {
      compMoveIndex = computerMove(board);
      board[compMoveIndex] = "O";
      moveCounter++;
      gameIsOver = isGameOver(board, moveCounter);
    }
  }

  return compMoveIndex;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max); //returns a random number up to the max, not inclusive
}

function computerMove(board) {
  let freeSpaces = [];
  let moveIndex = 0;
  let circleIndex = -1;
  let scenarios = updateScenarios(board);

  for (let x = 0; x < board.length; x++) {
    if (board[x] === "" && board[x] !== "X") {
      freeSpaces.push(x);
    } else {
      continue;
    }
  }

  if (scenarios.includes("OO")) {
    circleIndex = scenarios.indexOf("OO");
    moveIndex = bestMove(circleIndex, freeSpaces);
  } else if (scenarios.includes("O")) {
    circleIndex = scenarios.indexOf("O");
    moveIndex = bestMove(circleIndex, freeSpaces);
  } else {
    moveIndex = freeSpaces[getRandomInt(freeSpaces.length)];
  }
  return moveIndex;
}

function bestMove(index, freeSpaces) {

  let innerArray = movesArray[index];
  for (let i = 0; i < innerArray.length; i++) {
    if (freeSpaces.includes(innerArray[i])) {
      return innerArray[i];
    } else {
      continue;
    }
  }
}

function isGameOver(board, moveNum) {
  let scenarios = updateScenarios(board);

  if (scenarios.includes("XXX")) {
    displayFinal("crosses");
    playerScore++;
    playerScoreDisplay.innerHTML = `${playerScore}`;
    return true;
  } else if (scenarios.includes("OOO")) {
    displayFinal("noughts");
    computerScore++;
    computerScoreDisplay.innerHTML = `${computerScore}`;
    return true;
  } else if (moveCounter === 9 && !gameIsOver) {
    displayFinal("draw");
    return true;
  } else {
    return false;
  }
}

function displayFinal(outcome) {
  if (outcome === "crosses") {
    overlay.style.display = "block";
    overlayText.innerHTML = "You win!!! 🎉🎊🥳 ";
  } else if (outcome === "noughts") {
    setTimeout(function () {
      overlay.style.display = "block";
      overlayText.innerText = "You lost!";
    }, 500);
  } else if (outcome === "draw") {
    overlay.style.display = "block";
    overlayText.innerText = "It's a draw!";
  } else {
    return;
  }
}
