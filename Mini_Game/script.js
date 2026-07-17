
const initialMatrix = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const solutionMatrix = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

let currentMatrix = [];
let selectedRow = null;
let selectedCol = null;
let mistakes = 0;
const maxMistakes = 3;
let gameActive = true;

const boardElement = document.getElementById('cl-board');
const mistakesCountElement = document.getElementById('cl-mistakes-count');
const messageElement = document.getElementById('cl-message');
const resetBtn = document.getElementById('cl-reset-btn');
const numpadButtons = document.querySelectorAll('.cl-num-key');

function initGame() {
    currentMatrix = JSON.parse(JSON.stringify(initialMatrix));
    mistakes = 0;
    gameActive = true;
    selectedRow = null;
    selectedCol = null;

    mistakesCountElement.textContent = mistakes;
    messageElement.textContent = '';
    messageElement.className = 'cl-message';

    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cellVal = currentMatrix[r][c];
            const isInitial = initialMatrix[r][c] !== 0;

            const cellElement = document.createElement('div');
            cellElement.classList.add('cl-cell');
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;

            if (cellVal !== 0) {
                cellElement.textContent = cellVal;
            }

            if (isInitial) {
                cellElement.classList.add('cl-cell-initial');
            } else {
                cellElement.classList.add('cl-cell-user');
                if (cellVal !== 0 && cellVal !== solutionMatrix[r][c]) {
                    cellElement.classList.add('cl-cell-error');
                }
            }

            // 3x3 Block borders
            if (c === 2 || c === 5) {
                cellElement.classList.add('cl-border-right');
            }
            if (r === 2 || r === 5) {
                cellElement.classList.add('cl-border-bottom');
            }

            cellElement.addEventListener('click', () => {
                selectCell(r, c);
            });

            boardElement.appendChild(cellElement);
        }
    }
}

function selectCell(row, col) {
    if (!gameActive) return;

    selectedRow = row;
    selectedCol = col;

    const cellElements = boardElement.children;
    const selectedVal = currentMatrix[row][col];

    for (let i = 0; i < cellElements.length; i++) {
        const cell = cellElements[i];
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);

        cell.classList.remove('cl-selected', 'cl-highlighted', 'cl-same-number');

        if (r === row && c === col) {
            cell.classList.add('cl-selected');
        }
        else if (r === row || c === col || (Math.floor(r / 3) === Math.floor(row / 3) && Math.floor(c / 3) === Math.floor(col / 3))) {
            cell.classList.add('cl-highlighted');
        }

        if (selectedVal !== 0 && currentMatrix[r][c] === selectedVal && !(r === row && c === col)) {
            cell.classList.add('cl-same-number');
        }
    }
}

function inputNumber(num) {
    if (!gameActive || selectedRow === null || selectedCol === null) return;
    if (initialMatrix[selectedRow][selectedCol] !== 0) return;

    const correctVal = solutionMatrix[selectedRow][selectedCol];
    const cellElement = boardElement.querySelector(`[data-row="${selectedRow}"][data-col="${selectedCol}"]`);

    if (num === 'erase') {
        currentMatrix[selectedRow][selectedCol] = 0;
        cellElement.textContent = '';
        cellElement.classList.remove('cl-cell-error');
        selectCell(selectedRow, selectedCol);
        return;
    }

    const inputVal = parseInt(num);
    currentMatrix[selectedRow][selectedCol] = inputVal;
    cellElement.textContent = inputVal;

    if (inputVal === correctVal) {
        cellElement.classList.remove('cl-cell-error');
        checkWinCondition();
    } else {
        cellElement.classList.add('cl-cell-error');
        mistakes++;
        mistakesCountElement.textContent = mistakes;

        if (mistakes >= maxMistakes) {
            gameOver(false);
        }
    }

    selectCell(selectedRow, selectedCol);
}

function checkWinCondition() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (currentMatrix[r][c] !== solutionMatrix[r][c]) {
                return;
            }
        }
    }
    gameOver(true);
}

function gameOver(isWin) {
    gameActive = false;
    if (isWin) {
        messageElement.textContent = 'Chúc mừng! Bạn đã chiến thắng 🎉';
        messageElement.className = 'cl-message cl-win';
    } else {
        messageElement.textContent = 'Game Over! Bạn đã mắc quá 3 lỗi.';
        messageElement.className = 'cl-message cl-lose';
    }
}

numpadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const val = button.getAttribute('data-value');
        inputNumber(val);
    });
});

resetBtn.addEventListener('click', initGame);

document.addEventListener('keydown', (e) => {
    if (!gameActive) return;

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (selectedRow === null || selectedCol === null) {
            selectCell(0, 0);
            return;
        }

        let newRow = selectedRow;
        let newCol = selectedCol;

        switch (e.key) {
            case 'ArrowUp': newRow = Math.max(0, selectedRow - 1); break;
            case 'ArrowDown': newRow = Math.min(8, selectedRow + 1); break;
            case 'ArrowLeft': newCol = Math.max(0, selectedCol - 1); break;
            case 'ArrowRight': newCol = Math.min(8, selectedCol + 1); break;
        }

        selectCell(newRow, newCol);
    }

    if (e.key >= '1' && e.key <= '9') {
        inputNumber(e.key);
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
        inputNumber('erase');
    }
});

window.onload = initGame;