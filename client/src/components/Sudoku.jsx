import { useState, useEffect } from "react";
import '../assets/css/projects.css';

const Sudoku = ({ darkMode }) => {
    const emptyGrid = () => Array(9).fill(null).map(() => Array(9).fill(0));
    const [grid, setGrid] = useState(emptyGrid());
    const [originalGrid, setOriginalGrid] = useState(emptyGrid());
    const [solvedGrid, setSolvedGrid] = useState(null);
    const [difficulty, setDifficulty] = useState("easy");
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [errors, setErrors] = useState([]);
    const [checkAttempts, setCheckAttempts] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [highlightedCells, setHighlightedCells] = useState(new Set());
    const [correctCells, setCorrectCells] = useState(new Set());

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const deepCopyGrid = (grid) => JSON.parse(JSON.stringify(grid));

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
                                board[row][col] = 0; // backtrack
                            }
                        }
                        return false;
                    }
                }
            }
            return true; // solved
        };
        solveWithBacktracking(grid);
        return grid;
    };
    
    const generatePuzzle = (level) => {
        let filledGrid = generateSolvedGrid();
        let puzzle = deepCopyGrid(filledGrid);
        let clues = level === "easy" ? 30 : level === "medium" ? 20 : 10;
        let removedClues = 0;
        while (removedClues < 81 - clues) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                removedClues++;
            }
        }
        setGrid(puzzle);
        setOriginalGrid(deepCopyGrid(puzzle));
        setSolvedGrid(filledGrid);
        setErrors([]);
        setCheckAttempts(3);
        setHighlightedCells(new Set());
        setTimer(0);
        setIsRunning(true);
        setGameOver(false);
        setCorrectCells(new Set());
    };

    const handleReset = () => {
        setGrid(emptyGrid());
        setOriginalGrid(emptyGrid());
        setSolvedGrid(null);
        setIsRunning(false);
        setTimer(0);
        setCheckAttempts(3);
        setErrors([]);
        setGameOver(false);
        setHighlightedCells(new Set());
        setCorrectCells(new Set());
        // generatePuzzle(difficulty);
    }

    const updateHighlights = (newGrid) => {
        let newHighlights = new Set();
        for (let row = 0; row < 9; row++) {
            let rowNums = new Map();
            let colNums = new Map();
            for (let col = 0; col < 9; col++) {
                let numRow = newGrid[row][col];
                let numCol = newGrid[col][row];
                if (numRow !== 0) {
                    if (rowNums.has(numRow)) {
                        newHighlights.add(`${row}-${col}`);
                        newHighlights.add(`${row}-${rowNums.get(numRow)}`);
                    } else {
                        rowNums.set(numRow, col);
                    }
                }
                if (numCol !== 0) {
                    if (colNums.has(numCol)) {
                        newHighlights.add(`${col}-${row}`);
                        newHighlights.add(`${colNums.get(numCol)}-${row}`);
                    } else {
                        colNums.set(numCol, col);
                    }
                }
            }
        }
        setHighlightedCells(newHighlights);
    };

    const handleChange = (row, col, value) => {
        if (originalGrid[row][col] !== 0) return;
        const num = value === "" ? 0 : parseInt(value, 10);
        if (num >= 0 && num <= 9) {
            const newGrid = deepCopyGrid(grid);
            newGrid[row][col] = num;
            setGrid(newGrid);
            updateHighlights(newGrid);
        }
    };

    const handleCheck = () => {
        let newErrors = [];
        let newCorrectCells = new Set();
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] !== solvedGrid[row][col]) {
                    newErrors.push(`${row}-${col}`);
                } else {
                    newCorrectCells.add(`${row}-${col}`);
                }
            }
        }
        setErrors(newErrors);
        setCorrectCells(newCorrectCells);
        setCheckAttempts(prev => prev - 1);
        if (newErrors.length === 0) {
            alert("Congratulations, you solved the puzzle!");
            return;
        }
        if (checkAttempts <= 1) {
            setGameOver(true);
            alert("Sorry, Try Again!");
            setIsRunning(false);
            setGrid(deepCopyGrid(solvedGrid));
        }
    };
    return (
        <div className="sudoku">
            <h1 className="text-4xl">SUDOKU</h1>
            <div className="mb-4">
                <label className="mr-2 font-semibold">Difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={`p-1 rounded ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={() => generatePuzzle(difficulty)} 
                    className="ml-4 bg-blue-700 text-white px-4 py-2 rounded">
                    Start
                </button>
                <p className="m-4 text-lg font-bold inline-block">Time: {timer} sec</p>
            </div>
            <div className="grid grid-cols-9">
                {grid.map((row, rIdx) =>
                    row.map((num, cIdx) => (
                        <div className="" key={`${rIdx}-${cIdx}`}>
                            <input key={`${rIdx}-${cIdx}`} type="text" maxLength="1" value={num || ""} disabled={originalGrid[rIdx][cIdx] !== 0} onChange={(e) => handleChange(rIdx, cIdx, e.target.value)} 
                                className={`w-10 h-10 text-center border
                                ${errors.includes(`${rIdx}-${cIdx}`) ? "bg-red-400" : ""}
                                ${highlightedCells.has(`${rIdx}-${cIdx}`) ? "bg-red-500" : ""}
                                ${originalGrid[rIdx][cIdx] !== 0 ? "" : "bg-gray-400 text-black"}
                                ${correctCells.has(`${rIdx}-${cIdx}`) ? "bg-green-400" : ""}
                                ${rIdx % 3 === 2 && rIdx !== 8 ? "mb-4" : ""}
                                ${cIdx % 3 === 0 && cIdx !== 1 ? "ml-2" : ""}
                                ${rIdx % 3 === 0 && rIdx !== 0 ? "" : ""}
                                ${cIdx % 3 === 1 && cIdx !== 0 ? "ml-1" : ""}`}
                                style={{ background: originalGrid[rIdx][cIdx] !== 0 ? "none" : "" }}/>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4 space-x-2">
                <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">
                    Reset
                </button>
                <button onClick={handleCheck} disabled={checkAttempts <= 0 || gameOver} className={`px-4 py-2 rounded ${checkAttempts <= 0 || gameOver ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"} text-white`}>
                    Check ({checkAttempts} left)
                </button>
            </div>
        </div>
    );
};

export default Sudoku;

