import { useEffect, useState } from "react";
import "../wordle/wordle.css";

const Wordle = () => {
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [correctWord, setCorrectWord] = useState("");
    const [keyboardState, setKeyboardState] = useState({});
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const dictionary = ['ADOBE', 'BRICK', 'CHARM', 'DOUGH', 'EXULT', 'FIZZY', 
                        'GLYPH', 'HOVER', 'JUMPS', 'KVASS', 'LUMEN', 'QUARK', 
                        'SPEND', 'TIGER', 'VIXEN', 'WHALE', 'ZEBRA'];

    useEffect(() => {
        setCorrectWord(dictionary[Math.floor(Math.random() * dictionary.length)]);
    }, [])

    const handleGuessChange = (e) => {
        if (!gameOver && e.target.value.length <= 5) {
            setGuess(e.target.value.toUpperCase());
        }
    };

    const handleKeyPress = (letter) => {
        if (!gameOver && guess.length < 5) {
            setGuess((prev) => prev + letter);
        }
    };

    const evaluateGuess = (word) => {
        const correctArray = correctWord.split("");
        const guessArray = word.split("");
        const newKeyboardState = { ...keyboardState };
        let letterCount = {};

        correctArray.forEach((letter) => {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        });

        const colors = guessArray.map((letter, i) => {
            if (correctArray[i] === letter) {
                newKeyboardState[letter] = "green";
                letterCount[letter]--;
                return "green";
            }
            return "";
        });

        guessArray.forEach((letter, i) => {
            if (!colors[i]) {
                if (correctArray.includes(letter) && letterCount[letter] > 0) {
                    colors[i] = "orange";
                    newKeyboardState[letter] = newKeyboardState[letter] !== "green" ? "orange" : "green";
                    letterCount[letter]--;
                } else {
                    colors[i] = "gray";
                    newKeyboardState[letter] ||= "disabled";
                }
            }
        });

        setKeyboardState(newKeyboardState);
        return colors;
    };

    const handleSubmitGuess = () => {
        if (/\s/.test(guess)) {
            return;
        }
        setMessage('');
        if (guess.length === 5 && !gameOver) {
            const colors = evaluateGuess(guess);
            setGuesses([...guesses, { guess, colors }]);
            setGuess("");
            setAttempts((prev) => prev + 1);

            if (guess === correctWord) {
                setGameOver(true);
                setMessage("Congratulations!");
            } else if (attempts === 5) {
                setGameOver(true);
                setMessage(`The word was: ${correctWord}, try again!`);
            }
        }
    };

    const resetGame = () => {
        setGuess("");
        setGuesses([]);
        setKeyboardState({});
        setGameOver(false);
        setMessage("");
        setAttempts(0);
        setGameStarted(false);
        setCorrectWord(dictionary[Math.floor(Math.random() * dictionary.length)]);
    };

    const renderKeyboard = () => {
        const qwertyLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
        return (
            <div className="keyboard">
                {qwertyLayout.map((row, index) => (
                    <div key={index} className="keyboard-row">
                        {index === 2 && (
                            <button className="key bg-blue-600" onClick={() => setGuess(guess.slice(0, -1))} disabled={!gameStarted || gameOver}>←</button>
                        )}
                        {row.split("").map((letter) => (
                            <button key={letter} className={`key ${keyboardState[letter] || ""}`} onClick={() => handleKeyPress(letter)} disabled={!gameStarted || gameOver}>{letter}</button>
                        ))}
                        {index === 2 && (
                            <button onClick={handleSubmitGuess} className={`key submit-btn ${!gameStarted ? "bg-gray-500" : "bg-green-600"}`} disabled={!gameStarted || gameOver}>⏎</button>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="wordle">
            <div className="game-header">
                <h1 className="text-4xl">WORDLE</h1>
                <button className={`wordle-btn ${!gameStarted ? "bg-green-600" : "bg-red-600"}`} onClick={gameStarted ? resetGame : () => setGameStarted(true)}>
                    {gameStarted ? "Reset" : "Start"}
                </button>
            </div>

            <div className="guess-area">
                {guesses.map(({ guess, colors }, index) => (
                    <div key={index} className="guess-row">
                        {guess.split("").map((letter, idx) => (
                            <span key={idx} className={`guess-letter ${colors[idx]}`}>{letter}</span>
                        ))}
                    </div>
                ))}
            </div>

            <input type="text" value={guess} 
            onChange={handleGuessChange} 
            maxLength={5} 
            className="guess-input" 
            placeholder="Enter your guess" 
            disabled={!gameStarted || gameOver}
            onFocus={(e) => e.target.blur()}/>
            {renderKeyboard()}

            {gameOver && (
                <div className="game-modal" onClick={() => setGameOver(false)}>
                    <div className="modal-content">
                        <h2>{message}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wordle;
