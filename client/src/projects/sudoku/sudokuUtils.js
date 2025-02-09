// sudokuUtils.js
export const emptyGrid = () => Array(9).fill(null).map(() => Array(9).fill(0));

export const deepCopyGrid = (grid) => JSON.parse(JSON.stringify(grid));

const isValidPlacement = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) return false;
        }
    }
    return true;
};

const generateSolvedGrid = () => {
    const grid = emptyGrid();
    const solveWithBacktracking = (board) => {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let i = 0; i < nums.length; i++) {
                        if (isValidPlacement(board, row, col, nums[i])) {
                            board[row][col] = nums[i];
                            if (solveWithBacktracking(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    solveWithBacktracking(grid);
    return grid;
};

export const generatePuzzle = (level) => {
    let solvedGrid = generateSolvedGrid();
    let puzzle = deepCopyGrid(solvedGrid);
    let clues = level === "easy" ? 40 : level === "medium" ? 30 : 20;
    let removedClues = 0;
    while (removedClues < 81 - clues) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            removedClues++;
        }
    }
    return { puzzle, solvedGrid};
};

export const updateHighlights = (newGrid) => {
    let newHighlights = new Set();
    // Check for duplicates in rows, columns, and subgrids
    for (let i = 0; i < 9; i++) {
        let rowNums = new Map();
        let colNums = new Map();
        let subGridNums = new Map();
        let boxRow = Math.floor(i / 3) * 3;
        let boxCol = (i % 3) * 3;

        for (let j = 0; j < 9; j++) {
            // Row check
            let numRow = newGrid[i][j];
            if (numRow !== 0) {
                if (rowNums.has(numRow)) {
                    newHighlights.add(`${i}-${j}`);
                    newHighlights.add(`${i}-${rowNums.get(numRow)}`);
                } else {
                    rowNums.set(numRow, j);
                }
            }
            // Column check
            let numCol = newGrid[j][i];
            if (numCol !== 0) {
                if (colNums.has(numCol)) {
                    newHighlights.add(`${j}-${i}`);
                    newHighlights.add(`${colNums.get(numCol)}-${i}`);
                } else {
                    colNums.set(numCol, j);
                }
            }
            // Subgrid check
            let subRow = boxRow + Math.floor(j / 3);
            let subCol = boxCol + (j % 3);
            let numSubGrid = newGrid[subRow][subCol];

            if (numSubGrid !== 0) {
                let subGridKey = `${subRow}-${subCol}`;
                if (subGridNums.has(numSubGrid)) {
                    newHighlights.add(subGridKey);
                    newHighlights.add(`${subGridNums.get(numSubGrid).row}-${subGridNums.get(numSubGrid).col}`);
                } else {
                    subGridNums.set(numSubGrid, { row: subRow, col: subCol });
                }
            }
        }
    }
    return newHighlights;
};

