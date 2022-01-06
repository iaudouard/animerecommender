import { useState, useEffect, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import "../styles/pages/Results.css";
import fetch from "../utils/api";
import Card from "../components/Card";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";
import { error } from "../utils/notifications";
import { store } from "react-notifications-component";
import Spinner from "../components/Spinner";
import { addLikedAnime } from "../firebase/firebase.utils.handledata";
import { themes } from "../constants/themes";

interface Props {}

export default function Results({}: Props) {
  const { themeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  const { user } = useContext(UserContext);
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recommendations, setRecommendations] = useState<Array<Object>>([]);

  async function addAnimeToFirebase() {
    const infoUrl = `https://ivanadrd.pythonanywhere.com/get_anime_info?anime_title=${state.animeTitle}`;
    await fetch(infoUrl)
      .then((res) => {
        const data = res["data"];
        const info = {
          title: state.animeTitle,
          image: data["attributes"]["posterImage"],
        };
        return addLikedAnime(user!["uid"], info);
      })
      .catch((err) =>
        store.addNotification(error("error adding anime to the database"))
      );
  }

  useEffect(() => {
    async function getRecs() {
      const url = `https://ivanadrd.pythonanywhere.com/?anime_title=${state.animeTitle}&number_of_anime=${state.numberOfRecommendations}`;

      await fetch(url)
        .then((res) => {
          setRecommendations(res);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          store.addNotification(error("anime not found, please try again"));
          setIsLoading(false);
        });
      if (user) {
        addAnimeToFirebase();
      }
    }
    if (state === undefined) {
      store.addNotification(error("Failed to load request, please try again"));
    } else {
      getRecs();
    }
  }, []);

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
      <div className="Results">
        {isLoading ? (
          <Spinner size="2x" color={theme["secondary"]} />
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
                  color={theme["primary"]}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
