import { useState, useEffect } from "react";
import '../sudoku/sudoku.css';
import {emptyGrid, deepCopyGrid, generatePuzzle, updateHighlights} from './sudokuUtils';

const Sudoku = ({ darkMode }) => {
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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [numberCounts, setNumberCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
    const [selectedCell, setSelectedCell] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(null);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const generatePuzzleGrid = (level) => {
        const { puzzle, solvedGrid } = generatePuzzle(level);
        setGrid(puzzle);
        setOriginalGrid(deepCopyGrid(puzzle));
        setSolvedGrid(solvedGrid);
        setErrors([]);
        setCheckAttempts(3);
        setHighlightedCells(new Set());
        setTimer(0);
        setIsRunning(true);
        setGameOver(false);
        setCorrectCells(new Set());
        updateNumberCounts(puzzle);
    };

    const isPuzzleSolved = (currentGrid, solvedGrid) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (currentGrid[row][col] !== solvedGrid[row][col]) {
                    return false; // If any cell doesn't match, the puzzle isn't solved
                }
            }
        }
        // If all cells match, trigger success
        setModalMessage("Congratulations, you solved the puzzle!");
        setGameOver(true);
        setIsRunning(false);
        setModalOpen(true);
        return true; // Puzzle is solved
    };

    const getCellClassName = (num, rIdx, cIdx) => {
        let className = `text-center border sudoku-grid`;
        if (selectedNumber !== null && num === selectedNumber) {
            className += " text-blue-600 font-bold";
        }
        if (originalGrid[rIdx][cIdx] !== 0) { //check
            className += " bg-gray-500";
        }
        return className;
    };
    
    const updateNumberCounts = (newGrid) => {
        let newCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        newGrid.forEach(row => {
            row.forEach(num => {
                if (num > 0) {
                    newCounts[num]++;
                }
            });
        });
        setNumberCounts(newCounts);
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
        setNumberCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
    }

    const handleChange = (row, col, value) => {
        const num = value === "" ? 0 : parseInt(value, 10);
        if (num >= 0 && num <= 9) {
            const newGrid = deepCopyGrid(grid);
            newGrid[row][col] = num;
            setGrid(newGrid);
            setHighlightedCells(updateHighlights(newGrid));
            updateNumberCounts(newGrid);
            isPuzzleSolved(newGrid, solvedGrid);
        }
        
    };

    const updateGridCell = (row, col, num) => {
        const newGrid = deepCopyGrid(grid);
        newGrid[row][col] = num;
        setGrid(newGrid);
        setHighlightedCells(updateHighlights(newGrid));
        updateNumberCounts(newGrid);
    };
    
    const handleCellClick = (rIdx, cIdx) => {
        if (selectedNumber !== null && originalGrid[rIdx][cIdx] === 0) {
            updateGridCell(rIdx, cIdx, selectedNumber);
        }
    };
    
    const handleNumPadClick = (num) => {
        setSelectedNumber((prev) => (prev === num ? null : num));
        if (selectedCell) {
            const { row, col } = selectedCell;
            if (originalGrid[row][col] === 0) {
                updateGridCell(row, col, num);
            }
            setSelectedCell(null);
        }
    };

    const handleCheck = () => {
        if (!isRunning) return;
    
        let newErrors = [];
        let newCorrectCells = new Set();
        let isSolved = true;
    
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let number = grid[row][col];
                if (number !== 0) {
                    if (number !== solvedGrid[row][col]) {
                        newErrors.push(`${row}-${col}`);
                        isSolved = false;
                    } else {
                        newCorrectCells.add(`${row}-${col}`);
                    }
                } else {
                    isSolved = false;
                }
            }
        }
        setErrors(newErrors);
        setCorrectCells(newCorrectCells);
        setCheckAttempts((prev) => prev - 1);
    
        if (isSolved) {
            setModalMessage("Congratulations, you solved the puzzle!");
            setGameOver(true);
            setIsRunning(false);
            setModalOpen(true);
        } else if (checkAttempts <= 1) {
            setModalMessage("Sorry, Try Again!");
            setGameOver(true);
            setIsRunning(false);
            setGrid(deepCopyGrid(solvedGrid));
            updateNumberCounts(solvedGrid);
            setModalOpen(true);
        }
    };
    

    return (
        <div className="sudoku">
            <h1 className="text-4xl">SUDOKU</h1>
            <div className="p-3">
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} 
                className={`p-1 rounded bg-gray-500 `}>
                    <option value="" selected disabled >Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <p className="ml-2 text-lg inline-block">Time: {timeFormatted}</p>
            </div>

            <div className="m-2 flex justify-center space-x-10">
                <button onClick={() => isRunning ? handleReset() : generatePuzzleGrid(difficulty)} 
                    className={` text-white px-4 py-2 rounded ${isRunning ? "bg-red-500" : "bg-blue-700"}`}>
                    {isRunning ? "Reset" : "Start"}
                </button>
                <button onClick={handleCheck} disabled={checkAttempts <= 0 || gameOver} 
                    className={`px-4 py-2 rounded ${checkAttempts <= 0 || gameOver || !isRunning ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"} text-white`}>
                    Check ({checkAttempts} left)
                </button>
            </div>
            <div className="grid grid-cols-9">
                {grid.map((row, rIdx) =>
                    row.map((num, cIdx) => (
                        <div key={`${rIdx}-${cIdx}`} className={` flex items-center justify-center
                            
                            ${rIdx % 3 === 2 && rIdx !== 8 ? "mb-1" : ""} 
                            ${cIdx % 3 === 2 && cIdx !== 8 ? "mr-1" : ""} 
                            ${rIdx % 3 === 0 && rIdx !== 0 ? "border-t-2 border-black" : ""} 
                            ${cIdx % 3 === 0 && cIdx !== 0 ? "border-l-2 border-black" : ""}`}>
                            <div>
                            <input
                                type="text"
                                maxLength="1"
                                value={num || ""}
                                disabled={originalGrid[rIdx][cIdx] !== 0}
                                onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                                onClick={() => handleCellClick(rIdx, cIdx)}
                                className={`sudoku-grid text-center border
                                    ${getCellClassName(num, rIdx, cIdx)} 
                                    ${errors.includes(`${rIdx}-${cIdx}`) ? "bg-red-300" : ""}
                                    ${highlightedCells.has(`${rIdx}-${cIdx}`) ? "bg-red-600" : ""}
                                    ${originalGrid[rIdx][cIdx] !== 0 ? "" : "bg-gray-400 text-black"}
                                    ${correctCells.has(`${rIdx}-${cIdx}`) ? "bg-green-400" : ""}`}
                                style={{ background: originalGrid[rIdx][cIdx] !== 0 ? "none" : "" }}
                            />
                        </div>
                        </div>
                        
                    ))
                )}
            </div>

            <div className="number-pad mt-2 flex flex-wrap gap-2">
                {[...Array(9).keys()].map((num) => (
                    <div key={num + 1} className={`number-bubble ${
                        selectedNumber === num + 1 ? "bg-blue-600 text-white" : ""}`}
                        onClick={() => handleNumPadClick(num + 1)}>
                        <span className="text-lg font-bold">
                            {num + 1}
                            {numberCounts[num + 1] > 0 && (
                        <sup className="text-xs opacity-50 ml-1">{numberCounts[num + 1]}</sup>
                        )}
                        </span>
                    </div>
                ))}
            </div>


            {/* Modal */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sudoku;

