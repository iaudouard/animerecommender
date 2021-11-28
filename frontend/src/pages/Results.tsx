import { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import "../styles/Results.css";
import fetchRecommendations from "../utils/api";
import Card from "../components/Card";
import { ThemeContext } from "../App";
import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";
import { error } from "../utils/notifications";
import { store } from "react-notifications-component";
import Spinner from "../components/Spinner";

interface Props {}

export default function Results({}: Props) {
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recommendations, setRecommendations] = useState<Array<Object>>([]);

  useEffect(() => {
    async function fetcher() {
      const url = `https://ivanadrd.pythonanywhere.com/?anime_title=${state.animeTitle}&number_of_anime=${state.numberOfRecommendations}`;
      const data = await fetchRecommendations(url);

      await setRecommendations(data);
    }
    if (state === undefined) {
      store.addNotification(error("Failed to load request, please try again"));
    } else {
      fetcher();
    }
  }, []);

  useEffect(() => {
    if (recommendations["data"]) {
      if (recommendations["data"].length > 0) {
        setIsLoading(false);
      }
    } else if (recommendations["data"] === false) {
      store.addNotification(error("anime not found, please try again"));
      setIsLoading(false);
    }
  }, [recommendations]);

  if (state === undefined) {
    return <Redirect to="/" />;
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
            <div className="Results">
              {isLoading ? (
                <Spinner size="2x" color={Theme["secondary"]} />
              ) : recommendations["data"] === false ? (
                <Redirect to="/" />
              ) : (
                <div className="resultsContainer">
                  {recommendations["data"].map((item: any, index: number) => {
                    return (
                      <Card
                        title={item["attributes"]["canonicalTitle"]}
                        poster={item["attributes"]["posterImage"]}
                        synopsis={item["attributes"]["synopsis"]}
                        color={Theme["primary"]}
                        key={index}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    </motion.div>
  );
}
