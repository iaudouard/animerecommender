import { useEffect, useState, createContext } from "react";

import Spinner from "../components/Spinner";

import { auth, analytics } from "../firebase/firebase.config";
import { setUserId } from "firebase/analytics";

import { colorThemeInitCheck } from "../utils/localStorage";
import { themes } from "../constants/themes";
import { User } from "firebase/auth";

import UserContextType from "../types/UserContext";

const UserDefault = { user: null, setUser: () => null };

export const UserContext = createContext<UserContextType>(UserDefault);

export default function UserProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initTheme = colorThemeInitCheck();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
      if (user) {
        setUserId(analytics, user.uid);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!isLoading ? (
        children
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "cneter",
            alignItems: "center",
            backgroundColor: themes[initTheme]["bng"],
          }}
        >
          <Spinner size="2x" color={themes[initTheme]["secondary"]} />
        </div>
      )}
    </UserContext.Provider>
  );
}
