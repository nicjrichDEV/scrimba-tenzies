import Die from "./Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const newGameBtn = useRef(null);

  // Check Values
  const allIsHeld = dice.every((die) => die.isHeld);
  const allSameValue = dice.every((die) => die.value === dice[0].value);
  const gameWon = allIsHeld && allSameValue;

  useEffect(() => {
    newGameBtn.current.focus();
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill().map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function handleRoll() {
    if (gameWon) {
      setDice(generateAllNewDice());
      return;
    }

    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.isHeld
          ? dice
          : { ...dice, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function held(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite">
        {gameWon && <p className="sr-only">Congratulations you won! Press "</p>}
      </div>
      <div className="header-copy">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same number. Click each die to freeze it
          at its current value between rolls.
        </p>
      </div>
      <div className="die-container">
        {dice.map((die) => {
          return (
            <Die
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              held={() => held(die.id)}
            />
          );
        })}
      </div>
      <button className="roll-btn" onClick={handleRoll} ref={newGameBtn}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
