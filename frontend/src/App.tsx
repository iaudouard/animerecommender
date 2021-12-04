import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Account from "./pages/Account";
import { themes, themeNames } from "./constants/themes";
import { AnimatePresence } from "framer-motion";
import {
  handleLocalStorageColorThemeChange,
  colorThemeInitCheck,
} from "./utils/localStorage";
import Navbar from "./components/Navbar";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Meta from "./components/Meta";
import "./styles/pages/App.css";

export const ThemeContext = createContext(colorThemeInitCheck());

interface Props {}

export default function App({}: Props) {
  const [colorTheme, setColorTheme] = useState<any>(
    themes[colorThemeInitCheck()]
  );

  useEffect(() => {
    document.body.style.backgroundColor = colorTheme["bng"];
  }, [colorTheme]);

  async function handleThemeSwitch() {
    let tempIndex = Object.keys(themes).indexOf(colorThemeInitCheck());
    let newIndex =
      tempIndex < Object.keys(themes).length - 1 ? tempIndex + 1 : 0;
    let newThemeName = themeNames[newIndex];
    setColorTheme(themes[newThemeName]);
    handleLocalStorageColorThemeChange(newThemeName);
  }

  return (
    <ThemeContext.Provider value={colorTheme}>
      <div
        className="App"
        style={{ height: "100%", backgroundColor: colorTheme["bng"] }}
      >
        <Meta themeColor={colorTheme["bng"]} />
        <ReactNotification />
        <Router>
          <AnimatePresence>
            <Navbar clickHandler={() => handleThemeSwitch()} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/results" exact component={Results} />
              <Route path="/account" exact component={Account} />
            </Switch>
          </AnimatePresence>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}
