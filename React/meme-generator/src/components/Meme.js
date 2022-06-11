import React from "react";
import "./meme.css";

function Meme() {
  return (
    <form>
      <div className="inputs">
        <input type="text" name="upper" id="upper" value="Shut up" />
        <input type="text" name="lower" id="lower" value="and take my money" />
      </div>
      <input type="button" value="Get a new meme image 🖼" />
    </form>
  )
}

export default Meme;