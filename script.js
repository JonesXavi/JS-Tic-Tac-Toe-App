const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cellEls = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsgEl = document.getElementById('winning-message');
const winningMsgTextEl = document.querySelector('[data-winning-message-text]');
let circleTurn = null;

//Init Call
startGame();

function startGame() {
    circleTurn = false;
    winningMsgEl.classList.remove('show');
    cellEls.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

//Handle Cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    captureCell(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

//Capturing cell
function captureCell(cell, currentClass) {
    cell.classList.add(currentClass);
}

//Switching Turns
function swapTurns() {
    circleTurn = !circleTurn;
}

//Setting the class for the board ID
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
}

//Checking for the winner
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(idx => {
            return cellEls[idx].classList.contains(currentClass);
        });
    });
}

//Calls once a winner is selected
function endGame(draw) {
    if(draw) {
        winningMsgTextEl.innerText = 'Draw';
    } else {
        winningMsgTextEl.innerText = `${circleTurn ? "O" : "X"} is the winner!!!`;
    }
    winningMsgEl.classList.add('show');
}

//Calls to check whether the game is draw
function isDraw() {
    return [...cellEls].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function switchTheme() {
    document.documentElement.classList.toggle('dark-mode');
}