import React from "react";
import ReactIcon from "../images/logo512.png"

export default function Navbar() {
  return (
    <nav className="navbar">
      <img className="nav--logo" src={ReactIcon} />
      <h3 className="nav--logo_text">ReactFacts</h3>
      <h4 className="nav--title">React Course - Project 1</h4>
    </nav>
  )
}