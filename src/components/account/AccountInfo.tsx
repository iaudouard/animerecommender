import { Dispatch, SetStateAction, useContext } from "react";
import "../../styles/components/account/AccountInfo.css";

import { motion } from "framer-motion";
import { variants, transition } from "../../constants/transitions";

import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "./../../context/UserContext";

import UserData from "../../types/UserData";
import Anime from "../../types/Anime";

import Card from "../Card";
import SubmitButton from "../buttons/SubmitButton";

import { signout } from "../../firebase/firebase.utils.auth";

import { deleteLikedAnime } from "../../firebase/firebase.utils.handledata";

type Props = {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function AccountInfo({
  userData,
  setUserData,
  setIsLoading,
}: Props) {
  const { theme } = useContext(ThemeContext);

  const { user } = useContext(UserContext);

  const handleSignout = () => {
    setIsLoading(true);
    signout(window);
  };

  function deleteCard(anime) {
    deleteLikedAnime(user!.uid, anime.title).then((res) => {
      const newLiked = { likedAnime: res };
      setUserData({ ...userData!, ...newLiked });
    });
  }

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="account-info-container"
    >
      <p style={{ color: theme.secondary }}>Hi, {userData!.username}</p>
      <div
        className="saved-anime-container"
        style={{ backgroundColor: theme.primary }}
      >
        <p style={{ color: theme.secondary }}>liked anime:</p>
        <div className="anime-cards-container">
          {userData!.likedAnime.map((anime: Anime) => {
            return (
              <div className="card-wrapper">
                <Card
                  poster={anime.image}
                  color={theme.secondary}
                  height={20}
                  deleteable
                  onClick={() => deleteCard(anime)}
                />
                <p style={{ color: theme.secondary }}>{anime.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <SubmitButton
        primaryColor={theme.primary}
        secondaryColor={theme.secondary}
        terceryColor={theme.tercery}
        handleClick={() => handleSignout()}
        label="sign out"
      />
    </motion.div>
  );
}
