import React, { ReactElement, useState, useEffect, useContext } from "react";
import "../styles/pages/Account.css";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";
import { signin, signup, signout } from "../firebase/firebase.utils.auth";
import SubmitButton from "../components/buttons/SubmitButton";
import { store } from "react-notifications-component";
import { error } from "../utils/notifications";
import Spinner from "../components/Spinner";
import { auth } from "../firebase/firebase.config";
import FormField from "../components/FormField";
import SignoutButton from "../components/buttons/SignoutButton";
import { readData } from "../firebase/firebase.utils.handledata";

interface Props {}

export default function Account({}: Props): ReactElement {
  const Theme = useContext(ThemeContext)["theme"];
  const [signUpUsername, setSignUpUsername] = useState<string>("");
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState<string>(
    ""
  );
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<boolean>(false);
  const [userData, setUserData] = useState<Array<Object>>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
        readData(user.uid)
          .then((res) => {
            setUserData(res);
          })
          .then(() => {
            console.log(userData);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const handleSignin = () => {
    setIsLoading(true);
    signin(signInEmail, signInPassword, setIsLoading);
  };

  const handleSignup = () => {
    if (signUpPassword === signUpPasswordConfirm) {
      signup(signUpEmail, signUpPassword, signUpUsername, setIsLoading);
    } else {
      store.addNotification(error("passwords are not the same..."));
    }
  };

  const handleSignout = () => {
    signout(setIsLoading, window);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      <div className="Login">
        {isLoading ? (
          <Spinner size="2x" color={Theme["secondary"]} />
        ) : user ? (
          <SignoutButton
            primary={Theme["primary"]}
            secondary={Theme["secondary"]}
            tercery={Theme["tercery"]}
            clickHandler={() => handleSignout()}
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
                password={true}
              />
              <FormField
                placeholder="confirm password..."
                Theme={Theme}
                setInput={setSignUpPasswordConfirm}
                password={true}
              />
              <SubmitButton
                handleClick={() => handleSignup()}
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
                password={true}
              />
              <SubmitButton
                handleClick={() => handleSignin()}
                primaryColor={Theme["primary"]}
                secondaryColor={Theme["secondary"]}
                terceryColor={Theme["tercery"]}
                label="sign in"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
