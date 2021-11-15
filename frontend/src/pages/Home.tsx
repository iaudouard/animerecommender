import React, { useState } from "react";
import "../styles/Home.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

interface Props {}

const App = () => {
  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);
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

  const handleSubmit = (): void => {};

  return (
    <ThemeContext.Consumer>
      {(colorThemeContext) => {
        return (
          <div
            className="Home"
            style={{ backgroundColor: colorThemeContext["bng"] }}
          >
            <div className="formContainer">
              <input
                className="animeSearchInput"
                onChange={(ev) => updateAnimeSearchInput(ev)}
                placeholder="enter an anime..."
                style={{
                  borderBottom: `0.4vh solid ${
                    searchInputFocus ? "white" : colorThemeContext["secondary"]
                  }`,
                  color: colorThemeContext["secondary"],
                }}
                onFocus={() => setSearchInputFocus(true)}
                onBlur={() => setSearchInputFocus(false)}
              ></input>
              <div
                className="incrementContainer"
                style={{ color: colorThemeContext["secondary"] }}
              >
                <Button
                  primaryColor={colorThemeContext["primary"]}
                  secondaryColor={colorThemeContext["secondary"]}
                  terceryColor={colorThemeContext["tercery"]}
                  handleClick={() => handleIncrementDown()}
                  label="-"
                  type="increment"
                />
                {numberOfRecommendations}
                <Button
                  primaryColor={colorThemeContext["primary"]}
                  secondaryColor={colorThemeContext["secondary"]}
                  terceryColor={colorThemeContext["tercery"]}
                  handleClick={() => handleIncrementUp()}
                  label="+"
                  type="increment"
                />
              </div>
            </div>
            <Link
              to={{
                pathname: "/results",
                state: {
                  animeTitle: animeSearchInput,
                  numberOfRecommendations: numberOfRecommendations,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <Button
                type="submit"
                primaryColor={colorThemeContext["primary"]}
                secondaryColor={colorThemeContext["secondary"]}
                terceryColor={colorThemeContext["tercery"]}
                handleClick={() => handleSubmit()}
                label="submit"
              />
            </Link>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default App;
