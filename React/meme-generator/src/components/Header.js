import React from "react";
import "./header.css";
import Logo from "../images/Logo.png";

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" />
      <h4>React Course - Porject 3</h4>
    </header>
  )
}

export default Header;