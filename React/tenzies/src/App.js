import { React, useState } from "react";
import "./styles.css";
import Toggler from "./components/Toggler";
import Game from "./components/Game";

export default function App() {

  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode);
    console.log("dark mode: " + darkMode);
  }

  return (
    <div className={`app${darkMode ? ' dark' : ''}`}>
      <Toggler toggleDarkMode={toggleDarkMode}/>
      <Game darkMode={darkMode} />
    </div>
  );
}
