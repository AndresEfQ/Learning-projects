import React from "react"
import ReactIcon from "../images/logo512.png"

export default function Main() {
  return (
    <main className="main">
      <h1 className="main--title">Fun facts about React</h1>
      <ul className="main--facts">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100K stars on GitHub</li>
        <li>Is Maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
      <img src={ReactIcon} className="background-img" alt=""/>
    </main>
  )
}