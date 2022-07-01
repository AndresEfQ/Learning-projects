import { React, useState, useEffect, useRef } from "react";
import "./styles.css";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

export default function App() {

  const valueArray = ["one", "two", "three", "four", "five", "six"]
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [score, setScore] = useState({rolls: 0, time: 0});
  const gameRunning = useRef(false);
  const localScore = localStorage.getItem('bestScore')

  useEffect (() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSameValue) {
      setTenzies(true);
      clearInterval(score.timer);
      console.log("you won");
    }
  }, [dice, score])

  useEffect(() => {
    let bestScore = JSON.parse(localStorage.getItem('bestScore')) || {rolls: Infinity, time: 0};

    if (tenzies) {

      if (score.rolls < bestScore.rolls || 
          score.time < bestScore.time) {
        bestScore = score
        localStorage.setItem('bestScore', JSON.stringify(score))
      }

      if (score.time < bestScore.time) {

      }
    }
  }, [tenzies, score])

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
      gameRunning.current = false;
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

    if (!gameRunning.current) {
      setScore (prevScore => ({...prevScore, timer: setInterval(recordTime, 100)}));
      gameRunning.current = true;
      console.log("timer setted")
    }
  }

  function recordTime() {
    setScore(prevScore => (
      {...prevScore, time: prevScore.time + 0.1}
    ))
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
            Your Score: <span className="roll_value">{score.rolls}</span>
          </div>
          <div>
            Best Score: <span className="roll_value">
              {localScore ?
              JSON.parse(localScore).rolls :
              "N/A"}
            </span>
          </div>
        </div>
        <div className="time">
          <div>
            Your Time: 
            <span className="time_value">
              {(Math.floor(score.time * 10) / 10).toFixed(1)}
            </span>
            <span>Sec</span>
          </div>
          <div>
            Best Time: 
            <span className="time_value">
              {localScore ?
              (Math.round(JSON.parse(localScore).time * 10) / 10).toFixed(1) :
              "N/A"}
            </span>
            <span>Sec</span>
          </div>
        </div>
      </section>
    </main>
  );
}
