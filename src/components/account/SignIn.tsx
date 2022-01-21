import { Dispatch, SetStateAction, useContext, useState } from "react";
import "../../styles/components/account/SignIn.css";

import { ThemeContext } from "../../context/ThemeContext";

import { signin, signInWithSocial } from "../../firebase/firebase.utils.auth";
import { githubProvider, googleProvider } from "../../firebase/firebase.config";

import { readData } from "../..//firebase/firebase.utils.handledata";

import { store } from "react-notifications-component";
import { error, success } from "../../utils/notifications";

import FormField from "../FormField";

import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";

import SubmitButton from "../buttons/SubmitButton";

import UserData from "../../types/UserData";

type Props = {
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function SignIn({ setUserData, setIsLoading }: Props) {
  const { theme, setThemeName } = useContext(ThemeContext);

  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");

  const handleSignInWithEmailAndPassword = () => {
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

  const handleSignInWithSocial = (provider) => {
    setIsLoading(true);
    signInWithSocial(provider)
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

  return (
    <form className="signin-container">
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
      <div className="signin-buttons-container">
        <SubmitButton
          handleClick={() => handleSignInWithEmailAndPassword()}
          primaryColor={theme.primary}
          secondaryColor={theme.secondary}
          terceryColor={theme.tercery}
          label="sign in"
        />
        <div className="socials-signin-container">
          <button
            onClick={() => handleSignInWithSocial(githubProvider)}
            className="social-signin-button"
            style={{ backgroundColor: "#333" }}
          >
            <AiFillGithub color="white" size={26} />
          </button>
          <button
            onClick={() => handleSignInWithSocial(googleProvider)}
            className="social-signin-button"
            style={{ backgroundColor: "#DB4437" }}
          >
            <AiOutlineGoogle color="white" size={26} />
          </button>
        </div>
      </div>
    </form>
  );
}
