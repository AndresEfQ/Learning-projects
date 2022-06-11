import React from "react";
import Header from "./components/Header";
import Entry from "./components/Entry";
import "./style.css";
import Data from "./data";

function App() {
  const entries = Data.map((item) => {
    return (
      <Entry key={item.id} {...item} />
    ) 
  })
  return (
    <div className="container">
      <Header />
      <main>
        {entries}
      </main>
    </div>
  );
}

export default App;
