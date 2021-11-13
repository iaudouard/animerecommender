import React from "react";
import "./styles/App.css";
import fetchRecommendations from "./logic/ApiHandler";

function App() {
  fetchRecommendations("Naruto", 5);
  return (
    <div className="App">
      <input></input>
    </div>
  );
}

export default App;
