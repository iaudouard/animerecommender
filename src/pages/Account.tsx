import { ReactElement, useState, useEffect, useContext } from "react";
import "../styles/pages/Account.css";

import { UserContext } from "../context/UserContext";

import { motion } from "framer-motion";
import { variants, transition } from "../constants/transitions";

import { readData } from "../firebase/firebase.utils.handledata";

import UserData from "../types/UserData";

import Splash from "./Splash";
import SignIn from "../components/account/SignIn";
import SignUp from "../components/account/SignUp";
import AccountInfo from "../components/account/AccountInfo";

export default function Account({}): ReactElement {
  const { user } = useContext(UserContext);

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

  if (isLoading) {
    return <Splash />;
  }
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="account-page-container"
    >
      {user ? (
        <AccountInfo
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          userData={userData}
        />
      ) : (
        <div className="forms-container">
          <SignUp setIsLoading={setIsLoading} />
          <SignIn setUserData={setUserData} setIsLoading={setIsLoading} />
        </div>
      )}
    </motion.div>
  );
}
