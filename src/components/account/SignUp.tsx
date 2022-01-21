import {
  ReactElement,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import "../../styles/components/account/SignUp.css";

import { ThemeContext } from "../../context/ThemeContext";

import SubmitButton from "../buttons/SubmitButton";
import FormField from "../FormField";

import { signup } from "../../firebase/firebase.utils.auth";

import { store } from "react-notifications-component";
import { error } from "../../utils/notifications";

interface Props {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function SignUp({ setIsLoading }: Props): ReactElement {
  const { theme } = useContext(ThemeContext);

  const [signUpUsername, setSignUpUsername] = useState<string>("");
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] =
    useState<string>("");

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

  return (
    <div className="signup-container">
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
  );
}
