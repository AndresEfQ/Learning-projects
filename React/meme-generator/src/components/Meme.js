import React, { useState } from "react";
import "./meme.css";
import Data from "../memesData";

function Meme() {
  const [state, setState] = React.useState({
    memeImage: "",
    upperText: "",
    lowerText: ""
  })

  function getMemeImage() {
    const memesArray = Data.data.memes
    const randomNumb = Math.floor(Math.random() * memesArray.length);
    const {url} = memesArray[randomNumb];
    setState({...state, memeImage: url})
  }

  function insertUpperText(e) {
    setState({...state, upperText: e.target.value.toUpperCase()});
  }

  function insertLoweText(e) {
    setState({...state, lowerText: e.target.value.toUpperCase()});
  }

  return (
    <main>
      <form>
        <div className="inputs">
          <input type="area" name="upper" id="upper" placeholder="Top text" onChange={insertUpperText}/>
          <input type="text" name="lower" id="lower" placeholder="Bottom text" onChange={insertLoweText} />
        </div>
        <input type="button" value="Get a new meme image 🖼" onClick={getMemeImage} />
      </form>
      <div className="image">
        { state.memeImage ? 
          <img src={state.memeImage} alt="Meme" /> :
          null
        }
        <div className="upper-text">{state.upperText}</div>
        <div className="lower-text">{state.lowerText}</div>
      </div>
    </main>
  )
}

export default Meme;