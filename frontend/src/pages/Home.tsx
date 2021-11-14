import React, { useState } from "react";
import "../styles/Home.css";
import fetchRecommendations from "../logic/api";
import Button from "../components/Button";
import ThemeButton from "../components/ThemeButton";
import { Link } from "react-router-dom";
import { darling, poop, hana } from "../constants/themes";

interface Props {}

const App = () => {
  const themes = [poop, hana, darling];
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState(themes[themeIndex]);
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

  const handleThemeSwitch = () => {
    let tempIndex = themeIndex;
    let newIndex = tempIndex < themes.length - 1 ? tempIndex + 1 : 0;
    setThemeIndex(newIndex);
    setColorTheme(themes[newIndex]);
  };

  return (
    <div className="App" style={{ backgroundColor: colorTheme["bng"] }}>
      <ThemeButton
        Icon={colorTheme["Icon"]}
        Color={colorTheme["primary"]}
        clickHandler={() => handleThemeSwitch()}
      />
      <div className="formContainer">
        <input
          className="animeSearchInput"
          onChange={(ev) => updateAnimeSearchInput(ev)}
          placeholder="enter an anime..."
          style={{
            borderBottom: `0.4vh solid ${
              searchInputFocus ? "white" : colorTheme["secondary"]
            }`,
          }}
          onFocus={() => setSearchInputFocus(true)}
          onBlur={() => setSearchInputFocus(false)}
        ></input>
        <div
          className="incrementContainer"
          style={{ color: colorTheme["secondary"] }}
        >
          <Button
            primaryColor={colorTheme["primary"]}
            secondaryColor={colorTheme["secondary"]}
            terceryColor={colorTheme["tercery"]}
            handleClick={() => handleIncrementDown()}
            label="-"
            type="increment"
          />
          {numberOfRecommendations}
          <Button
            primaryColor={colorTheme["primary"]}
            secondaryColor={colorTheme["secondary"]}
            terceryColor={colorTheme["tercery"]}
            handleClick={() => handleIncrementUp()}
            label="+"
            type="increment"
          />
        </div>
      </div>
      <Link to="/results" style={{ textDecoration: "none" }}>
        <Button
          type="submit"
          primaryColor={colorTheme["primary"]}
          secondaryColor={colorTheme["secondary"]}
          terceryColor={colorTheme["tercery"]}
          handleClick={() => handleSubmit()}
          label="submit"
        />
      </Link>
    </div>
  );
};

export default App;
