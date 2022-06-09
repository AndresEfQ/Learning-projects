import React from "react";
import Logo from "../images/logo.png";

export default function Header() {
  return (
    <header>
      <img src={Logo} alt="logo" />
      <span>my travel journal.</span>
    </header>
  )
}