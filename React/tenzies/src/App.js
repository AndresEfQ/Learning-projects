import { React, useState, useEffect } from "react";
import "./styles.css";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

export default function App() {

  const valueArray = ["one", "two", "three", "four", "five", "six"]

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [score, setScore] = useState({rolls: 0, time: 0});
  const [gameTime, setGameTime] = useState(0);
  /* const [gameTime, setGameTime] = useState({start: 0, enlapsedTime: 0}); */

  useEffect (() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSameValue) {
      setTenzies(true);
      /* setScore(prevScore => ({
        ...prevScore, 
        time: enlapsedTime
      })) */
      /* setGameTime(prevGameTime => ({...prevGameTime, enlapsedTime: new Date() - prevGameTime.start})); */
    }
    /* console.log(gameTime); */
/*     console.log(enlapsedTime); */
  }, [dice])

  useEffect(() => {
    let bestScore = JSON.parse(localStorage.getItem('bestScore')) || {rolls: Infinity, time: 0};

    setInterval(() => {
      setGameTime(prevGameTime => prevGameTime + 0.1)
    }, 100)

    /* setGameTime({start: new Date(), enlapsedTime: 0}); */

    if (tenzies) {
      if (score.rolls < bestScore.rolls) {
        bestScore = score
        localStorage.setItem('bestScore', JSON.stringify(score))
      }
    }
    console.log("best score " + bestScore.rolls);
    console.log(gameTime);
  }, [tenzies, score, gameTime])

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
      setScore({rolls: 0, time: 0});

    } else {
      setScore(prevScore => ({...prevScore, rolls: prevScore.rolls + 1}))
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
      <section>
        <div>
          <div>
            Your Score: {score.rolls}
          </div>
          <div>
            Best Score: {JSON.parse(localStorage.getItem('bestScore')).rolls}
          </div>
        </div>
        <div className="time">
          <div>
            Your Time: {Math.round(gameTime / 100) / 10}
            <span>Sec</span>
          </div>
          <div>
            Best Time: {JSON.parse(localStorage.getItem('bestScore')).time}
          </div>
        </div>
      </section>
    </main>
  );
}
