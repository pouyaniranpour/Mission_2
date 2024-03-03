//  Grid Array Diagram:
//  0       1       2
//  3       4       5
//  6       7       8

console.log("Connected");

// const squareZero = {
//     reference: document.querySelector('squareZero'),
//     isAvailable: true,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareOne = {
//     reference: document.querySelector('squareOne'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareTwo = {
//     reference: document.querySelector('squareTwo'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareThree = {
//     reference: document.querySelector('squareThree'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareFour = {
//     reference: document.querySelector('squareFour'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareFive = {
//     reference: document.querySelector('squareFive'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareSix = {
//     reference: document.querySelector('squareSix'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }
// const squareSeven = {
//     reference: document.querySelector('squareSeven'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// const squareEight = {
//     reference: document.querySelector('squareEight'),
//     isAvailable: false,
//     currentlyDisplaying: null,  //if displaying nothing, X, or O
// }

// let isAvailable = true;

// let boardStatus = [
//     [isAvailable, isAvailable, isAvailable], //Initialising the board status
//     [isAvailable, isAvailable, isAvailable],
//     [isAvailable, isAvailable, isAvailable]
// ]

// const squareZero = document.getElementById("squareZero");
// squareZero.addEventListener('click', function () {
//     if (isCrosses) {
//         squareZero.textContent = "X";
//         isCrosses = false;
//     } else {
//         squareZero.textContent = "O";
//         isCrosses = true;
//     }

// });
let isCrosses = true; //Current player is X i.e. Crosses

const squareZero = document.getElementById("squareZero");
const squareOne = document.getElementById("squareOne");
const squareTwo = document.getElementById("squareTwo");
const squareThree = document.getElementById("squareThree");
const squareFour = document.getElementById("squareFour");
const squareFive = document.getElementById("squareFive");
const squareSix = document.getElementById("squareSix");
const squareSeven = document.getElementById("squareSeven");
const squareEight = document.getElementById("squareEight");

const announcement = document.getElementById("announcement");

let gameIsOver = false;

let moveCounter = 0;

let boardState = ["", "", "", "", "", "", "", "", ""];

let winningScenarios = [];

squareZero.addEventListener("click", function () {
  boardState = action(squareZero, boardState, 0);
  console.log(boardState);
  winningScenarios = updateScenarios(boardState);
  console.log(winningScenarios);
});

squareOne.addEventListener("click", function () {
  boardState = action(squareOne, boardState, 1);
  console.log(boardState);
  winningScenarios = updateScenarios(boardState);
});

squareTwo.addEventListener("click", function () {
  boardState = action(squareTwo, boardState, 2);
  winningScenarios = updateScenarios(boardState);
  console.log(boardState);
  console.log(winningScenarios);
});

squareThree.addEventListener("click", function () {
  boardState = action(squareThree, boardState, 3);
  console.log(boardState);
  winningScenarios = updateScenarios(boardState);
});

squareFour.addEventListener("click", function () {
  boardState = action(squareFour, boardState, 4);
  winningScenarios = updateScenarios(boardState);
});

squareFive.addEventListener("click", function () {
  boardState = action(squareFive, boardState, 5);
  winningScenarios = updateScenarios(boardState);
});

squareSix.addEventListener("click", function () {
  boardState = action(squareSix, boardState, 6);
  winningScenarios = updateScenarios(boardState);
});

squareSeven.addEventListener("click", function () {
  boardState = action(squareSeven, boardState, 7);
  winningScenarios = updateScenarios(boardState);
});

squareEight.addEventListener("click", function () {
  boardState = action(squareEight, boardState, 8);
  winningScenarios = updateScenarios(boardState);
});

const squaresArray = [
  squareZero,
  squareOne,
  squareTwo,
  squareThree,
  squareFour,
  squareFive,
  squareSix,
  squareSeven,
  squareEight,
];

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

function action(currentSquare, board, index) {
  const updatedBoard = board;
  let compMoveIndex = 0; //index of computer's move

  console.log(index);
  if (board[index] === "" && !gameIsOver) {
    currentSquare.textContent = "X";
    updatedBoard[index] = "X";
    moveCounter++;
    gameIsOver = isGameOver(updatedBoard, moveCounter);      
    if (!gameIsOver) {
      compMoveIndex = computerMove(updatedBoard);
      console.log(compMoveIndex);
      squaresArray[compMoveIndex].textContent = "O";
      moveCounter++;
      console.log("move counter", moveCounter);
      gameIsOver = isGameOver(updatedBoard, moveCounter);
    }
  }

  console.log(updatedBoard);

  return updatedBoard;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max); //returns a random number up to the max, not inclusive
}


function computerMove(board) {
  let freeSpaces = [];
  let y = 0;
  let moveIndex = 0;
  let circleIndex = -1;
  let scenarios = updateScenarios(board);
  console.log("inside computer move", scenarios);

  for (let x = 0; x < board.length; x++) {
    if (board[x] === "" && board[x] !== 'X') {
      freeSpaces[y] = x;
      y++;
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
};

function isGameOver(board, moveNum) {
  let scenarios = updateScenarios(board);
  console.log("isGameOver called");
  // const topRow = `${boardState[0]}${boardState[1]}${boardState[2]}`; //top row elements
  // const middleRow = `${boardState[3]}${boardState[4]}${boardState[5]}`;
  // const bottomRow = `${boardState[6]}${boardState[7]}${boardState[8]}`;
  // const firstCol = `${boardState[0]}${boardState[3]}${boardState[6]}`; //first column
  // const secondCol = `${boardState[1]}${boardState[4]}${boardState[7]}`;
  // const thirdCol = `${boardState[2]}${boardState[5]}${boardState[8]}`;
  // const diagonalOne = `${boardState[0]}${boardState[4]}${boardState[8]}`;
  // const diagonalTwo = `${boardState[6]}${boardState[4]}${boardState[2]}`;

  // const winningScenarios = [
  //   topRow,
  //   middleRow,
  //   bottomRow,
  //   firstCol,
  //   secondCol,
  //   thirdCol,
  //   diagonalOne,
  //   diagonalTwo,
  // ];

  if (scenarios.includes("XXX")) {
    console.log("Crosses has won!🎉🎊🥳");
    //fanfare.play();
    announcement.innerText = "CROSSES WINS!";
    return true;
  } else if (scenarios.includes("OOO")) {
    console.log("Noughts has won!🎉🎊🥳");
    announcement.innerText = "NOUGHTS WINS!";
    return true;
  } else if (moveCounter === 9 && !gameIsOver) {
    console.log("It's a draw!");
    return true;
  } else {
    return false;
  }
}
