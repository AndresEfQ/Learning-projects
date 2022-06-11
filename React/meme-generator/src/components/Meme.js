import React from "react";
import "./meme.css";

function Meme() {
  return (
    <main>
      <form>
        <div className="inputs">
          <input type="text" name="upper" id="upper" placeholder="Top text" />
          <input type="text" name="lower" id="lower" placeholder="Bottom text" />
        </div>
        <input type="button" value="Get a new meme image 🖼" />
      </form>
    </main>
  )
}

export default Meme;