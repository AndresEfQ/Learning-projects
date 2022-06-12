import React, { useState } from "react";
import "./meme.css";
import Data from "../memesData";

function Meme() {
  const [memeImage, setMemeImage] = useState("");
  const [upperText, setUpperText] = useState("");
  const [lowerText, setLowerText] = useState("");

  let image;
  if (memeImage) {
    image = <img src={memeImage} alt="Meme" />
  } else {
    image = null;
  }

  function getMemeImage() {
    const memesArray = Data.data.memes
    const randomNumb = Math.floor(Math.random() * memesArray.length);
    const {url} = memesArray[randomNumb];
    setMemeImage(url)
  }

  function insertUpperText(e) {
    setUpperText(() => e.target.value.toUpperCase());
    console.log(e.target.value)
  }

  function insertLoweText(e) {
    setLowerText(() => e.target.value.toUpperCase());
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
        {image}
        <div className="upper-text">{upperText}</div>
        <div className="lower-text">{lowerText}</div>
      </div>
    </main>
  )
}

export default Meme;