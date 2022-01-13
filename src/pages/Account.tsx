import { ReactElement, useState, useEffect, useContext } from "react";

import "../styles/pages/Account.css";

import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";

import {
  signin,
  signup,
  signout,
  signInWithSocial,
} from "../firebase/firebase.utils.auth";
import {
  deleteLikedAnime,
  readData,
} from "../firebase/firebase.utils.handledata";
import { githubProvider, googleProvider } from "../firebase/firebase.config";

import SubmitButton from "../components/buttons/SubmitButton";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";
import Card from "../components/Card";

import { store } from "react-notifications-component";
import { error, success } from "../utils/notifications";

import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";

import { themes } from "../constants/themes";

import Anime from "../types/Anime";
import UserData from "../types/UserData";

export default function Account({}): ReactElement {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  const { user } = useContext(UserContext);

  const [signUpUsername, setSignUpUsername] = useState<string>("");
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] =
    useState<string>("");
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(user ? true : false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const uid = user.uid;
        await readData(uid)
          .then((res) => {
            setUserData(res);
          })
          .then(() => setIsLoading(false));
      }
    }
    fetchData();
  }, []);

  const handleSignin = () => {
    setIsLoading(true);
    signin(signInEmail, signInPassword)
      .then((user) => {
        const uid = user!.uid;
        readData(uid)
          .then((res) => {
            setUserData(res);
            setThemeName(res.theme);
          })
          .then(() => {
            setIsLoading(false);
            store.addNotification(success("signed in!"));
          });
      })
      .catch((err) => {
        setIsLoading(false);
        store.addNotification(error(err.message));
      });
  };

  const handleGithubSignin = () => {
    setIsLoading(true);
    signInWithSocial(githubProvider)
      .then((user) => {
        const uid = user!.uid;
        readData(uid)
          .then((res) => {
            setUserData(res);
            setThemeName(res.theme);
          })
          .then(() => {
            setIsLoading(false);
            store.addNotification(success("signed in!"));
          });
      })
      .catch((err) => {
        setIsLoading(false);
        store.addNotification(error(err.message));
      });
  };

  const handleGoogleSignin = () => {
    setIsLoading(true);
    signInWithSocial(googleProvider)
      .then((user) => {
        const uid = user!.uid;
        readData(uid)
          .then((res) => {
            setUserData(res);
            setThemeName(res.theme);
          })
          .then(() => {
            setIsLoading(false);
            store.addNotification(success("signed in!"));
          });
      })
      .catch((err) => {
        setIsLoading(false);
        store.addNotification(error(err.message));
      });
  };

  const handleSignup = () => {
    if (signUpPassword === signUpPasswordConfirm) {
      setIsLoading(true);
      signup(signUpEmail, signUpPassword, signUpUsername)
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      store.addNotification(error("passwords are not the same..."));
    }
  };

  const handleSignout = () => {
    setIsLoading(true);
    signout(window);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      <div className="Account">
        {isLoading ? (
          <Spinner size="2x" color={theme.secondary} />
        ) : user ? (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
            className="Account"
          >
            <p style={{ color: theme.secondary }}>Hi, {userData!.username}</p>
            <div
              className="likedAnimeContainer"
              style={{ backgroundColor: theme.primary }}
            >
              <p style={{ color: theme.secondary }}>liked anime:</p>
              <div className="cardsContainer">
                {userData!.likedAnime.map((anime: Anime) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Card
                        poster={anime.image}
                        color={theme.secondary}
                        height={20}
                        deleteable
                        onClick={() =>
                          deleteLikedAnime(user.uid, anime.title).then(
                            (res) => {
                              const newLiked = { likedAnime: res };
                              setUserData({ ...userData!, ...newLiked });
                            }
                          )
                        }
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
        ) : (
          <div className="form">
            <div className="signUp">
              <FormField
                placeholder="username..."
                theme={theme}
                setInput={setSignUpUsername}
              />
              <FormField
                placeholder="email..."
                theme={theme}
                setInput={setSignUpEmail}
              />
              <FormField
                placeholder="password..."
                theme={theme}
                setInput={setSignUpPassword}
                password={true}
              />
              <FormField
                placeholder="confirm password..."
                theme={theme}
                setInput={setSignUpPasswordConfirm}
                password={true}
              />
              <SubmitButton
                handleClick={() => handleSignup()}
                primaryColor={theme.primary}
                secondaryColor={theme.secondary}
                terceryColor={theme.tercery}
                label="sign up"
              />
            </div>
            <div className="signIn">
              <FormField
                placeholder="email..."
                theme={theme}
                setInput={setSignInEmail}
              />
              <FormField
                placeholder="password..."
                theme={theme}
                setInput={setSignInPassword}
                password={true}
              />
              <div className="signInButtons">
                <SubmitButton
                  handleClick={() => handleSignin()}
                  primaryColor={theme.primary}
                  secondaryColor={theme.secondary}
                  terceryColor={theme.tercery}
                  label="sign in"
                />
                <div className="socials">
                  <button
                    onClick={() => handleGithubSignin()}
                    className="socialButton"
                    style={{ backgroundColor: "#333" }}
                  >
                    <AiFillGithub color="white" size={26} />
                  </button>
                  <button
                    onClick={() => handleGoogleSignin()}
                    className="socialButton"
                    style={{ backgroundColor: "#DB4437" }}
                  >
                    <AiOutlineGoogle color="white" size={26} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}