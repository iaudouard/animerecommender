import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./UserContext";
import { readData } from "../firebase/firebase.utils.handledata";
import { themes } from "../constants/themes";
import Spinner from "../components/Spinner";
import {
  colorThemeInitCheck,
  handleLocalStorageThemeChange,
} from "../utils/localStorage";
import { changeUserTheme } from "../firebase/firebase.utils.handledata";

export const ThemeContext = createContext([]);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes[colorThemeInitCheck()]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext)["user"];

  useEffect(() => {
    if (user) {
      readData(user["uid"])
        .then((res) => {
          const tempTheme = res["theme"];
          setTheme(themes[tempTheme]);
          handleLocalStorageThemeChange(tempTheme);
        })
        .then(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const cycleTheme = (t) => {
    const keys = Object.keys(themes);
    const values = Object.values(themes);
    const currIndex = values.indexOf(theme);
    const newThemeName = keys[currIndex < keys.length - 1 ? currIndex + 1 : 0];
    const newTheme = themes[newThemeName];
    setTheme(newTheme);
    handleLocalStorageThemeChange(newThemeName);

    if (user) {
      changeUserTheme(user["uid"], newThemeName);
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme]);
    handleLocalStorageThemeChange(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: theme, cycleTheme: cycleTheme, changeTheme: changeTheme }}
    >
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
