import React, { ReactElement, useEffect, useState, createContext } from "react";
import Spinner from "../components/Spinner";
import { auth } from "../firebase/firebase.config";
import { colorThemeInitCheck } from "../utils/localStorage";
import { themes } from "../constants/themes";

export const UserContext = createContext([]);

interface Props {
  children: React.ReactNode;
}

export default function UserProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initTheme = colorThemeInitCheck();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={user}>
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
