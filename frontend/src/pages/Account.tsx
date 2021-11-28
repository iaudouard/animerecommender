import React, { ReactElement, useState, useEffect, useContext } from "react";
import "../styles/Login.css";
import { ThemeContext } from "../App";
import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";
import { signin, signup, signout } from "../utils/firebase.utils";
import Button from "../components/Button";
import { store } from "react-notifications-component";
import { error } from "../utils/notifications";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { auth } from "../config/firebase.config";
import FormField from "../components/FormField";
import SignoutButton from "../components/SignoutButton";

interface Props {}

export default function Account({}: Props): ReactElement {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  });

  const history = useHistory();

  const handleRoute = () => {
    history.push("/");
  };

  const handleSignIn = () => {
    signin(signInEmail, signInPassword, handleRoute, setIsLoading);
  };

  const handleSignUp = () => {
    if (signUpPassword === signUpPasswordConfirm) {
      signup(signUpEmail, signUpPassword, handleRoute, setIsLoading);
    } else {
      store.addNotification(error("passwords are not the same..."));
    }
  };

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
            <div className="Login">
              {isLoading ? (
                <Spinner size="2x" color={Theme["secondary"]} />
              ) : user ? (
                <SignoutButton
                  primary={Theme["primary"]}
                  secondary={Theme["secondary"]}
                  tercery={Theme["tercery"]}
                  clickHandler={() => signout(setIsLoading, handleRoute)}
                />
              ) : (
                <div className="form">
                  <div className="signUp">
                    <FormField
                      placeholder="username..."
                      Theme={Theme}
                      setInput={setSignUpUsername}
                    />
                    <FormField
                      placeholder="email..."
                      Theme={Theme}
                      setInput={setSignUpEmail}
                    />
                    <FormField
                      placeholder="password..."
                      Theme={Theme}
                      setInput={setSignUpPassword}
                    />
                    <FormField
                      placeholder="confirm password..."
                      Theme={Theme}
                      setInput={setSignUpPasswordConfirm}
                    />
                    <Button
                      handleClick={() => handleSignUp()}
                      type="submit"
                      primaryColor={Theme["primary"]}
                      secondaryColor={Theme["secondary"]}
                      terceryColor={Theme["tercery"]}
                      label="sign up"
                    />
                  </div>
                  <div className="signIn">
                    <FormField
                      placeholder="email..."
                      Theme={Theme}
                      setInput={setSignInEmail}
                    />
                    <FormField
                      placeholder="password..."
                      Theme={Theme}
                      setInput={setSignInPassword}
                    />
                    <Button
                      handleClick={() => handleSignIn()}
                      type="submit"
                      primaryColor={Theme["primary"]}
                      secondaryColor={Theme["secondary"]}
                      terceryColor={Theme["tercery"]}
                      label="sign in"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    </motion.div>
  );
}
