import { React, useEffect } from "react";

export default function Timer(props) {

  return (
    <span className="time_count">
      {(Math.round(props.gameTime * 10) / 10).toFixed(1)}
    </span>
  )
}