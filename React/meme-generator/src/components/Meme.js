import React from "react";
import "./meme.css";
import Data from "../memesData";

function Meme() {
  function getMemeImage() {
    const memesArray = Data.data.memes
    const randomNumb = Math.floor(Math.random() * memesArray.length);
    const {url} = memesArray[randomNumb];
    console.log(url);
  }

  return (
    <main>
      <form>
        <div className="inputs">
          <input type="text" name="upper" id="upper" placeholder="Top text" />
          <input type="text" name="lower" id="lower" placeholder="Bottom text" />
        </div>
        <input type="button" value="Get a new meme image 🖼" onClick={getMemeImage} />
      </form>
    </main>
  )
}

export default Meme;