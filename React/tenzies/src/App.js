import React from "react";
import "./styles.css";
import Die from "./components/Die"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }
  
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    
    return newDice;
  }

  function refreshDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }));
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }));
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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
