import React, { useState } from "react";
import "./meme.css";
import memesData from "../memesData";

function Meme() {

  const [meme, setMeme] = useState({
    memeImage: "",
    upperText: "",
    lowerText: ""
  });
  const [allMemeImages, setAllMemeImages] = useState(memesData)

  function getMemeImage() {
    const memesArray = allMemeImages.data.memes
    const randomNumb = Math.floor(Math.random() * memesArray.length);
    const {url} = memesArray[randomNumb];
    setMeme({...meme, memeImage: url})
  }

  function insertUpperText(e) {
    setMeme({...meme, upperText: e.target.value.toUpperCase()});
  }

  function insertLoweText(e) {
    setMeme({...meme, lowerText: e.target.value.toUpperCase()});
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
        { meme.memeImage ? 
          <img src={meme.memeImage} alt="Meme" /> :
          null
        }
        <div className="upper-text">{meme.upperText}</div>
        <div className="lower-text">{meme.lowerText}</div>
      </div>
    </main>
  )
}

export default Meme;