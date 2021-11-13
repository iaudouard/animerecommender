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
      <input onChange={(ev) => updateAnimeSearchInput(ev)}></input>
      <div className="incrementContainer">
        <IncrementButton
          primaryColor="#ffaeb6"
          secondaryColor="#a30000"
          incrementFunction={() => handleIncrementDown()}
          sign="-"
        />
        {numberOfRecommendations}
        <IncrementButton
          primaryColor="#ffaeb6"
          secondaryColor="#a30000"
          incrementFunction={() => handleIncrementUp()}
          sign="+"
        />
      </div>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default App;
