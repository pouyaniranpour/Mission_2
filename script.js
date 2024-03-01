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

let gameIsActive = true;

let moveCounter = 0;

const boardState = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

squareZero.addEventListener("click", function () {
  playerMove(squareZero, 0);
});

squareOne.addEventListener("click", function () {
  playerMove(squareOne, 1);
});

squareTwo.addEventListener("click", function () {
  playerMove(squareTwo, 2);
});

squareThree.addEventListener("click", function () {
  playerMove(squareThree, 3);
});

squareFour.addEventListener("click", function () {
  playerMove(squareFour, 4);
});

squareFive.addEventListener("click", function () {
  playerMove(squareFive, 5);
});

squareSix.addEventListener("click", function () {
  playerMove(squareSix, 6);
});

squareSeven.addEventListener("click", function () {
  playerMove(squareSeven, 7);
});

squareEight.addEventListener("click", function () {
  playerMove(squareEight, 8);
});

function playerMove(currentSquare, index) {
  if (boardState[index] === "-" && gameIsActive) {
    if (isCrosses) {
      currentSquare.textContent = "X";
      isCrosses = false;
      boardState[index] = "X";
    } else {
      // currentSquare.textContent = "O";
      // isCrosses = true;
      // boardState[index] = "O";

    }
    moveCounter++;
    if (isGameOver(boardState, moveCounter)) {
      gameIsActive = false;
      return;
    }
  } else {
    return;
  }
}

function computerMove(board){
  ddd
}

function isGameOver(board, moves) {
  const topRow = `${boardState[0]}${boardState[1]}${boardState[2]}`; //top row elements
  const middleRow = `${boardState[3]}${boardState[4]}${boardState[5]}`;
  const bottomRow = `${boardState[6]}${boardState[7]}${boardState[8]}`;
  const firstCol = `${boardState[0]}${boardState[3]}${boardState[6]}`; //first column
  const secondCol = `${boardState[1]}${boardState[4]}${boardState[7]}`;
  const thirdCol = `${boardState[2]}${boardState[5]}${boardState[8]}`;
  const diagonalOne = `${boardState[0]}${boardState[4]}${boardState[8]}`;
  const diagonalTwo = `${boardState[6]}${boardState[4]}${boardState[2]}`;

  const winningScenarios = [
    topRow,
    middleRow,
    bottomRow,
    firstCol,
    secondCol,
    thirdCol,
    diagonalOne,
    diagonalTwo,
  ];

  if (winningScenarios.includes("XXX")) {
    console.log("Crosses has won!🎉🎊🥳");
    //fanfare.play();
    announcement.innerText = "CROSSES WINS!";
  } else if (winningScenarios.includes("OOO")) {
    console.log("Noughts has won!🎉🎊🥳");
    announcement.innerText = "NOUGHTS WINS!";
  } else if (moveCounter === 9) {
    console.log("It's a draw!")
  } else {
    return;
  }
}
