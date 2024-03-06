//  Grid Array Diagram:
//  0       1       2
//  3       4       5
//  6       7       8

console.log("Connected");
const announcement = document.getElementById("announcement");

let gameIsOver = false;

let moveCounter = 0;

let boardState = ["", "", "", "", "", "", "", "", ""];

let winningScenarios = [];

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

nameInputBtn.addEventListener("click", function () {
  nameInputOverlay.style.display = "none";
  playerNameField.innerText = nameInput.value;
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
    };
};

function resetScore (){
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
};



overlay.addEventListener("click", function () {  
  overlay.style.display = "none";
  resetBoard();  
});


for (let i = 0; i < squaresArray.length; i++) {
  squaresArray[i].addEventListener("click", function () {
    boardState = action(i);
    console.log(boardState);
    for (let x = 0; x < boardState.length; x++) {
      squaresArray[x].textContent = boardState[x];
    }
  });
}

function updateScenarios(board) {
  let topRow = `${board[0]}${board[1]}${board[2]}`; //top row elements
  let middleRow = `${board[3]}${board[4]}${board[5]}`;
  let bottomRow = `${board[6]}${board[7]}${board[8]}`;
  let firstCol = `${board[0]}${board[3]}${board[6]}`; //first column
  let secondCol = `${board[1]}${board[4]}${board[7]}`;
  let thirdCol = `${board[2]}${board[5]}${board[8]}`;
  let diagonalOne = `${board[0]}${board[4]}${board[8]}`;
  let diagonalTwo = `${board[6]}${board[4]}${board[2]}`;

  return [
    topRow,
    middleRow,
    bottomRow,
    firstCol,
    secondCol,
    thirdCol,
    diagonalOne,
    diagonalTwo,
  ];
}

function action(index) {
  let board = boardState;
  let compMoveIndex = 0; //index of computer's move

  console.log(index);
  if (board[index] === "" && !gameIsOver) {
    board[index] = "X";
    moveCounter++;
    gameIsOver = isGameOver(board, moveCounter);
    if (!gameIsOver) {
      compMoveIndex = computerMove(board);
      console.log(compMoveIndex);
      board[compMoveIndex] = "O";
      moveCounter++;
      console.log("move counter", moveCounter);
      gameIsOver = isGameOver(board, moveCounter);
    }
  }

  //console.log(board);

  return board;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max); //returns a random number up to the max, not inclusive
}

function computerMove(board) {
  let freeSpaces = [];
  let moveIndex = 0;
  let circleIndex = -1;
  let scenarios = updateScenarios(board);
  console.log("inside computer move", scenarios);

  for (let x = 0; x < board.length; x++) {
    if (board[x] === "" && board[x] !== "X") {
      freeSpaces.push(x);
    } else {
      continue;
    }
  }
  console.log("free spaces", freeSpaces);
  console.log(scenarios);

  if (scenarios.includes("OO")) {
    circleIndex = scenarios.indexOf("OO");
    moveIndex = bestMove(circleIndex, freeSpaces);
  } else if (scenarios.includes("O")) {
    circleIndex = scenarios.indexOf("O");
    console.log("circleIndex", circleIndex);
    moveIndex = bestMove(circleIndex, freeSpaces);
  } else {
    moveIndex = freeSpaces[getRandomInt(freeSpaces.length)];
  }
  console.log("move Index", moveIndex);
  return moveIndex;
}

function bestMove(index, freeSpaces) {
  console.log("free spaces", freeSpaces);
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
  console.log("isGameOver called");

  if (scenarios.includes("XXX")) {
    console.log("Crosses has won!🎉🎊🥳");
    crossesWon();
    playerScore++;
    playerScoreDisplay.innerHTML = `${playerScore}`;
    return true;
  } else if (scenarios.includes("OOO")) {
    console.log("Noughts has won!🎉🎊🥳");
    noughtsWon();
    computerScore++;
    computerScoreDisplay.innerHTML = `${computerScore}`;
    return true;
  } else if (moveCounter === 9 && !gameIsOver) {
    console.log("It's a draw!");
    neitherWon();
    return true;
  } else {
    return false;
  }
}

function crossesWon() {
  overlay.style.display = "block";
  overlayText.innerHTML = "You win!!! 🎉🎊🥳 "
}

function noughtsWon() {
  overlay.style.display = "block";
  overlayText.innerText = "You lost!";
}

function neitherWon() {
  overlay.style.display = "block";
  overlayText.innerText = "It's a draw!";
}
