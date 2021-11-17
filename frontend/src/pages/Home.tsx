import React, { useState } from "react";
import "../styles/Home.css";
import Button from "../components/Button";
import Autocomplete from "../components/Autocomplete";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import { motion } from "framer-motion";

interface Props {}

const App = () => {
  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);
  const [animeSearchInput, setAnimeSearchInput] = useState<string>("");
  const [numberOfRecommendations, setNumberOfRecommendations] =
    useState<number>(0);
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const updateAnimeSearchInput = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAutocompleteVisible(true);
    setAnimeSearchInput(ev.target.value);
  };

  const handleIncrementDown = (): void => {
    numberOfRecommendations > 0
      ? setNumberOfRecommendations((currNum) => currNum - 1)
      : console.log("");
  };

  const handleIncrementUp = (): void => {
    setNumberOfRecommendations((currNum) => currNum + 1);
  };

  async function handleAutocomplete(title) {
    const set = await setAnimeSearchInput(title);
    setAutocompleteVisible(false);
  }

  return (
    <ThemeContext.Consumer>
      {(colorThemeContext) => {
        return (
          <div
            className="Home"
            style={{ backgroundColor: colorThemeContext["bng"] }}
          >
            <div className="formContainer">
              <div>
                <input
                  className="animeSearchInput"
                  onChange={(ev) => updateAnimeSearchInput(ev)}
                  placeholder="enter an anime..."
                  style={{
                    borderBottom: `0.4vh solid ${
                      searchInputFocus
                        ? "white"
                        : colorThemeContext["secondary"]
                    }`,
                    color: colorThemeContext["secondary"],
                  }}
                  value={animeSearchInput}
                  onFocus={() => setSearchInputFocus(true)}
                  onBlur={() => setSearchInputFocus(false)}
                ></input>

                <Autocomplete
                  animeSearchInputValue={animeSearchInput}
                  color={colorThemeContext["secondary"]}
                  clickHandler={(title) => handleAutocomplete(title)}
                  visible={autocompleteVisible}
                />
              </div>

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
                  handleClick={() => {}}
                  label="submit"
                />
              </Link>
            </div>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default App;
