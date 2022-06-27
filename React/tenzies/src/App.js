import React from "react";
import "./styles.css";
import Die from "./components/Die"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());
  
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    
    return newDice;
  }

  function refreshDice() {
    setDice(allNewDice());
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map(die => <Die value={die} />)}
      </div>
      <button className="roll-dice" onClick={refreshDice}>Roll</button>
    </main>
  );
}
