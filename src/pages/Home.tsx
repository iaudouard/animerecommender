import React, { ReactElement, useContext, useState } from "react";

import "../styles/pages/Home.css";
import "animate.css/animate.min.css";

import IncrementButton from "../components/buttons/IncrementButton";
import SubmitButton from "../components/buttons/SubmitButton";
import Autocomplete from "../components/autocomplete/Autocomplete";

import { Link } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";

import { store } from "react-notifications-component";
import { error } from "../utils/notifications";

export default function App(): ReactElement {
  const { theme } = useContext(ThemeContext);

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
      className="home-page-container"
      style={{ backgroundColor: theme.bng }}
    >
      <form className="form-container">
        <div className="search-bar-container">
          <input
            className="search-bar"
            onChange={(ev) => updateAnimeSearchInput(ev)}
            placeholder="enter an anime..."
            style={{
              borderBottom: `0.4vh solid ${
                searchInputFocus ? "white" : theme.secondary
              }`,
              color: theme.secondary,
            }}
            value={animeSearchInput}
            onFocus={() => setSearchInputFocus(true)}
            onBlur={() => setSearchInputFocus(false)}
          ></input>

          <Autocomplete
            animeSearchInputValue={animeSearchInput}
            color={theme.secondary}
            clickHandler={(title) => handleAutocomplete(title)}
            visible={autocompleteVisible}
          />
        </div>

        <div className="incrementContainer" style={{ color: theme.secondary }}>
          <IncrementButton
            primaryColor={theme.primary}
            secondaryColor={theme.secondary}
            terceryColor={theme.tercery}
            handleClick={() => handleIncrementDown()}
            label="-"
          />
          {numberOfRecommendations}
          <IncrementButton
            primaryColor={theme.primary}
            secondaryColor={theme.secondary}
            terceryColor={theme.tercery}
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
            primaryColor={theme.primary}
            secondaryColor={theme.secondary}
            terceryColor={theme.tercery}
            handleClick={() => handleSubmit()}
            label="submit"
          />
        </Link>
      </form>
    </motion.div>
  );
}
