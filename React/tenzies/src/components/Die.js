import React from "react";

export default function Die(props) {

  return (
    <div 
      className={"die-face"} 
      
    >
      <img 
        src={props.isHeld ?
          `./images/${props.value}-dark.svg` : 
          `./images/${props.value}.svg`}
        onClick={props.handleClick}
        alt={props.value} 
      />
    </div>
  );
}