import React, { ReactElement, useState, useEffect, useContext } from "react";
import "../styles/pages/Account.css";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";
import {
  signin,
  signup,
  signout,
  signInWithSocial,
} from "../firebase/firebase.utils.auth";
import SubmitButton from "../components/buttons/SubmitButton";
import { store } from "react-notifications-component";
import { error, success } from "../utils/notifications";
import Spinner from "../components/Spinner";
import FormField from "../components/FormField";
import {
  deleteLikedAnime,
  readData,
} from "../firebase/firebase.utils.handledata";
import { UserContext } from "../context/UserContext";
import Card from "../components/Card";
import { githubProvider, googleProvider } from "../firebase/firebase.config";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
interface Props {}

export default function Account({}: Props): ReactElement {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const changeTheme = useContext(ThemeContext)["changeTheme"];

  const [signUpUsername, setSignUpUsername] = useState<string>("");
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] =
    useState<string>("");
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(user ? true : false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const uid = user["uid"];
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
      .then((res) => {
        const uid = res["user"]["uid"];
        readData(uid)
          .then((res) => {
            setUserData(res);
            changeTheme(res["theme"]);
          })
          .then(() => {
            setIsLoading(false);
            store.addNotification(success("signed in!"));
          });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleGithubSignin = () => {
    setIsLoading(true);
    signInWithSocial(githubProvider)
      .then((res) => {
        const uid = res["uid"];
        readData(uid)
          .then((res) => {
            setUserData(res);
            changeTheme(res["theme"]);
          })
          .then(() => {
            setIsLoading(false);
            store.addNotification(success("signed in!"));
          });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleSignin = () => {
    setIsLoading(true);
    signInWithSocial(googleProvider)
      .then((res) => {
        const uid = res["uid"];
        readData(uid)
          .then((res) => {
            setUserData(res);
            changeTheme(res["theme"]);
          })
          .then(() => {
            setIsLoading(false);
            store.addNotification(success("signed in!"));
          });
      })
      .catch(() => {
        setIsLoading(false);
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
          <Spinner size="2x" color={theme["secondary"]} />
        ) : user ? (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
            className="Account"
          >
            <p style={{ color: theme["secondary"] }}>
              Hi, {userData["username"]}
            </p>
            <div
              className="likedAnimeContainer"
              style={{ backgroundColor: theme["primary"] }}
            >
              <p style={{ color: theme["secondary"] }}>liked anime:</p>
              <div className="cardsContainer">
                {userData["likedAnime"].map((anime) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Card
                        poster={anime["image"]}
                        color={theme["secondary"]}
                        height={20}
                        deleteable
                        onClick={() =>
                          deleteLikedAnime(user.uid, anime["title"]).then(
                            (res) => {
                              const newLiked = { likedAnime: res };
                              setUserData({ ...userData, ...newLiked });
                            }
                          )
                        }
                      />
                      <p style={{ color: theme["secondary"] }}>
                        {anime["title"]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <SubmitButton
              primaryColor={theme["primary"]}
              secondaryColor={theme["secondary"]}
              terceryColor={theme["tercery"]}
              handleClick={() => handleSignout()}
              label="sign out"
            />
          </motion.div>
        ) : (
          <div className="form">
            <div className="signUp">
              <FormField
                placeholder="username..."
                Theme={theme}
                setInput={setSignUpUsername}
              />
              <FormField
                placeholder="email..."
                Theme={theme}
                setInput={setSignUpEmail}
              />
              <FormField
                placeholder="password..."
                Theme={theme}
                setInput={setSignUpPassword}
                password={true}
              />
              <FormField
                placeholder="confirm password..."
                Theme={theme}
                setInput={setSignUpPasswordConfirm}
                password={true}
              />
              <SubmitButton
                handleClick={() => handleSignup()}
                primaryColor={theme["primary"]}
                secondaryColor={theme["secondary"]}
                terceryColor={theme["tercery"]}
                label="sign up"
              />
            </div>
            <div className="signIn">
              <FormField
                placeholder="email..."
                Theme={theme}
                setInput={setSignInEmail}
              />
              <FormField
                placeholder="password..."
                Theme={theme}
                setInput={setSignInPassword}
                password={true}
              />
              <div className="signInButtons">
                <SubmitButton
                  handleClick={() => handleSignin()}
                  primaryColor={theme["primary"]}
                  secondaryColor={theme["secondary"]}
                  terceryColor={theme["tercery"]}
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
