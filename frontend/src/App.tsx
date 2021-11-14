import React, { useState } from "react";
import "./styles/App.css";
import IncrementButton from "./components/IncrementButton";
import fetchRecommendations from "./logic/ApiHandler";

function App() {
  const [animeSearchInput, setAnimeSearchInput] = useState<string>("");
  const [numberOfRecommendations, setNumberOfRecommendations] =
    useState<number>(0);

  const updateAnimeSearchInput = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAnimeSearchInput(ev.target.value);
  };

  const handleIncrementDown = (): void => {
    numberOfRecommendations > 0
      ? setNumberOfRecommendations(numberOfRecommendations - 1)
      : console.log("");
  };

  const handleIncrementUp = (): void => {
    setNumberOfRecommendations(numberOfRecommendations + 1);
  };

  const handleSubmit = (): void => {
    console.log(
      fetchRecommendations(animeSearchInput, numberOfRecommendations)
    );
  };

  return (
    <div className="App">
      <div className="contentContainer">
        <p>enter an anime:</p>
        <input
          className="animeSearchInput"
          onChange={(ev) => updateAnimeSearchInput(ev)}
          placeholder="naruto..."
        ></input>
        <div className="incrementContainer">
          <IncrementButton
            primaryColor="#ffaeb6"
            secondaryColor="#a30000"
            terceryColor="#f68a95"
            incrementFunction={() => handleIncrementDown()}
            sign="-"
          />
          {numberOfRecommendations}
          <IncrementButton
            primaryColor="#ffaeb6"
            secondaryColor="#a30000"
            terceryColor="#f68a95"
            incrementFunction={() => handleIncrementUp()}
            sign="+"
          />
        </div>
        <button className="submitButton" onClick={() => handleSubmit()}>
          submit
        </button>
      </div>
    </div>
  );
}

export default App;
