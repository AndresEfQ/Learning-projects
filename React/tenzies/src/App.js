import React from "react";
import "./styles.css";
import Die from "./components/Die"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());
  
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      });
    }
    
    return newDice;
  }

  function refreshDice() {
    setDice(allNewDice());
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      if (die.id === id) {
        return {...die, isHeld: !die.isHeld};
      }

      return die;
    }));
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map(die => <Die 
          key={die.id}
          value={die.value} 
          isHeld={die.isHeld}
          handleClick={() => holdDice(die.id)}
        />)}
      </div>
      <button className="roll-dice" onClick={refreshDice}>Roll</button>
    </main>
  );
}
