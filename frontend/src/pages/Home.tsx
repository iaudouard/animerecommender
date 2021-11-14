import React, { useState } from "react";
import "../styles/Home.css";
import fetchRecommendations from "../logic/api";
import Button from "../components/Button";
import { Link } from "react-router-dom";

interface Props {}

const App = () => {
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
      <div className="formContainer">
        <input
          className="animeSearchInput"
          onChange={(ev) => updateAnimeSearchInput(ev)}
          placeholder="enter an anime..."
        ></input>
        <div className="incrementContainer">
          <Button
            primaryColor="#ffaeb6"
            secondaryColor="#a30000"
            terceryColor="#f68a95"
            handleClick={() => handleIncrementDown()}
            label="-"
            type="increment"
          />
          {numberOfRecommendations}
          <Button
            primaryColor="#ffaeb6"
            secondaryColor="#a30000"
            terceryColor="#f68a95"
            handleClick={() => handleIncrementUp()}
            label="+"
            type="increment"
          />
        </div>
      </div>
      <Link to="/results">
        <Button
          type="submit"
          primaryColor="#ffaeb6"
          secondaryColor="#a30000"
          terceryColor="#f68a95"
          handleClick={() => handleSubmit()}
          label="submit"
        />
      </Link>
    </div>
  );
};

export default App;
