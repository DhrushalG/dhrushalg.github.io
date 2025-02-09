import { useState } from "react";
import "../wordle/wordle.css";

const Wordle = () => {
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [correctWord, setCorrectWord] = useState("REACT"); // Example word
    const [keyboardState, setKeyboardState] = useState({});
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [attempts, setAttempts] = useState(0); // Track attempts

    const handleGuessChange = (e) => {
        if (e.target.value.length <= 5 && !gameOver) { // Only allow input if game is not over
            setGuess(e.target.value.toUpperCase());
        }
    };

    const handleSubmitGuess = () => {
        if (guess.length === 5 && !gameOver) {
            const newGuesses = [...guesses, guess];
            setGuesses(newGuesses);
            updateKeyboardState(guess);
            setGuess("");
            setAttempts(attempts + 1);

            if (guess === correctWord) {
                setGameOver(true);
                setMessage("Congratulations, you've guessed the word!");
            } else if (attempts === 5) { // After 6 attempts
                setGameOver(true);
                setMessage("Sorry, you've run out of attempts. Try again!");
            }
        }
    };

    const handleKeyPress = (letter) => {
        if (guess.length < 5 && !gameOver) {
            setGuess(guess + letter);
        }
    };

    const handleBackspace = () => {
        setGuess(guess.slice(0, -1));
    };

    const updateKeyboardState = (guess) => {
        const newKeyboardState = { ...keyboardState };
        const guessArray = guess.split("");
        const correctArray = correctWord.split("");
        const matchedLetters = new Set();
        
        // First pass: Mark green and orange letters
        for (let i = 0; i < guessArray.length; i++) {
            const letter = guessArray[i];
            if (correctArray[i] === letter) {
                newKeyboardState[letter] = "green";
                matchedLetters.add(i);
            }
            if (correctArray[i] !== letter && correctArray.includes(letter) && !matchedLetters.has(i)) {
                newKeyboardState[letter] = "orange";
                matchedLetters.add(i); // Prevent multiple orange marking for same position
            }
            if (newKeyboardState[letter] !== "green" && newKeyboardState[letter] !== "orange") {
                newKeyboardState[letter] = "red";
            }
        }
        setKeyboardState(newKeyboardState);
    };

    const renderKeyboard = () => {
        const qwertyLayout = [
            "QWERTYUIOP",
            "ASDFGHJKL",
            "ZXCVBNM",];
        return (
            <div className="keyboard">
                {qwertyLayout.map((row, index) => (
                    <div key={index} className="keyboard-row">
                        {row.split("").map((letter) => (
                            <button
                                key={letter}
                                className={`key ${keyboardState[letter] || ""}`}
                                style={{
                                    opacity: keyboardState[letter] ? 0.7 : 1,
                                }}
                                onClick={() => handleKeyPress(letter)} // Handle keyboard click
                                disabled={gameOver}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const resetGame = () => {
        setGuesses([]);
        setGuess("");
        setAttempts(0);
        setGameOver(false);
        setMessage("");
        setKeyboardState({});
    };

    const closeModal = () => {
        setGameOver(false);
        setMessage(""); // Clear message
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('game-modal')) {
            closeModal();
        }
    };

    return (
        <div className="wordle">
            <div className="game-header">
                <h1 className="text-4xl">WORDLE</h1>
                <button className="reset-btn" onClick={resetGame}>Reset Board</button>
            </div>
            
            <div className="guess-area">
                {guesses.map((guess, index) => (
                    <div key={index} className="guess-row">
                        {guess.split("").map((letter, idx) => (
                            <span
                                key={idx}
                                className={`guess-letter ${correctWord[idx] === letter ? "green" : correctWord.includes(letter) ? "orange" : "red"}`}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div>
            <input type="text" value={guess} onChange={handleGuessChange} maxLength={5} className="guess-input" placeholder="Enter your guess" disabled={gameOver}/>
                <button className="key" onClick={handleBackspace} disabled={gameOver}>←</button>
                <button onClick={handleSubmitGuess} className="submit-btn" disabled={gameOver}>Submit</button>
            </div>
            {renderKeyboard()}

            {/* End game modal */}
            {gameOver && (
                <div className="game-modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <h2>{message}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wordle;
