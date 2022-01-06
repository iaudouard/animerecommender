import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";

import {
  readData,
  changeUserTheme,
} from "../firebase/firebase.utils.handledata";

import { themes } from "../constants/themes";

import Spinner from "../components/Spinner";

import {
  colorThemeInitCheck,
  handleLocalStorageThemeChange,
} from "../utils/localStorage";

import ThemeContextType from "../types/ThemeContext";
import Theme from "../types/Theme";

const ThemeDefault = {
  themeName: "",
  setThemeName: () => null,
  theme: themes[colorThemeInitCheck()],
};

export const ThemeContext = createContext<ThemeContextType>(ThemeDefault);

export default function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState<string>(colorThemeInitCheck());
  const [theme, setTheme] = useState<Theme>(themes[themeName]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      readData(user["uid"])
        .then((res) => {
          const tempTheme = res["theme"];
          setThemeName(tempTheme);
          handleLocalStorageThemeChange(tempTheme);
        })
        .then(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLocalStorageThemeChange(themeName);
    setTheme(themes[themeName]);
    if (user) {
      changeUserTheme(user["uid"], themeName);
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, theme }}>
      {!isLoading ? (
        children
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "cneter",
            alignItems: "center",
            backgroundColor: theme["bng"],
          }}
        >
          <Spinner size="2x" color={theme["secondary"]} />
        </div>
      )}
    </ThemeContext.Provider>
  );
}
