import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill().map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function handleRoll() {
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
      <button className="roll-btn" onClick={handleRoll}>
        Roll
      </button>
    </main>
  );
}
