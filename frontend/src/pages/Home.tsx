import React, { useState } from "react";
import "../styles/pages/Home.css";
import IncrementButton from "../components/buttons/IncrementButton";
import SubmitButton from "../components/buttons/SubmitButton";
import Autocomplete from "../components/autocomplete/Autocomplete";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";
import { store } from "react-notifications-component";
import { error } from "../utils/notifications";
import fetch from "../utils/api";
import "animate.css/animate.min.css";

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
      : store.addNotification(
          error("recommendations cannot be a negative number")
        );
  };

  const handleIncrementUp = (): void => {
    setNumberOfRecommendations((currNum) => currNum + 1);
  };

  async function handleAutocomplete(title) {
    await setAnimeSearchInput(title);
    setAutocompleteVisible(false);
  }

  async function handleSubmit() {
    if (animeSearchInput === "" && numberOfRecommendations === 0) {
      store.addNotification(error("please enter an anime"));
      store.addNotification(
        error("please enter the number of recommendations you want")
      );
    } else if (animeSearchInput === "") {
      store.addNotification(error("please enter an anime"));
    } else if (numberOfRecommendations === 0) {
      store.addNotification(
        error("please enter the number of recommendations you want")
      );
    }
  }

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      <ThemeContext.Consumer>
        {(Theme) => {
          return (
            <div className="Home">
              <div className="formContainer">
                <div className="inputContainer">
                  <input
                    className="animeSearchInput"
                    onChange={(ev) => updateAnimeSearchInput(ev)}
                    placeholder="enter an anime..."
                    style={{
                      borderBottom: `0.4vh solid ${
                        searchInputFocus ? "white" : Theme["secondary"]
                      }`,
                      color: Theme["secondary"],
                    }}
                    value={animeSearchInput}
                    onFocus={() => setSearchInputFocus(true)}
                    onBlur={() => setSearchInputFocus(false)}
                  ></input>

                  <Autocomplete
                    animeSearchInputValue={animeSearchInput}
                    color={Theme["secondary"]}
                    clickHandler={(title) => handleAutocomplete(title)}
                    visible={autocompleteVisible}
                  />
                </div>

                <div
                  className="incrementContainer"
                  style={{ color: Theme["secondary"] }}
                >
                  <IncrementButton
                    primaryColor={Theme["primary"]}
                    secondaryColor={Theme["secondary"]}
                    terceryColor={Theme["tercery"]}
                    handleClick={() => handleIncrementDown()}
                    label="-"
                  />
                  {numberOfRecommendations}
                  <IncrementButton
                    primaryColor={Theme["primary"]}
                    secondaryColor={Theme["secondary"]}
                    terceryColor={Theme["tercery"]}
                    handleClick={() => handleIncrementUp()}
                    label="+"
                  />
                </div>

                <Link
                  to={
                    animeSearchInput !== "" && numberOfRecommendations !== 0
                      ? {
                          pathname: "/results",
                          state: {
                            animeTitle: animeSearchInput,
                            numberOfRecommendations: numberOfRecommendations,
                          },
                        }
                      : { pathname: "/" }
                  }
                  style={{ textDecoration: "none" }}
                >
                  <SubmitButton
                    primaryColor={Theme["primary"]}
                    secondaryColor={Theme["secondary"]}
                    terceryColor={Theme["tercery"]}
                    handleClick={() => handleSubmit()}
                    label="submit"
                  />
                </Link>
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    </motion.div>
  );
};

export default App;
