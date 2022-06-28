import React from "react";
import "./styles.css";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

export default function App() {

  const valueArray = ["one", "two", "three", "four", "five", "six"]
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect (() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
    console.log(dice);
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: valueArray[Math.floor(Math.random() * 6)],
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
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie();
      }));
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }));
  }

  return (
    <main>
      {tenzies && <Confetti />}
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
      <button className="roll-dice" onClick={refreshDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
