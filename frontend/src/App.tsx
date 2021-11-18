import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { themes } from "./constants/themes";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Meta from "./components/Meta";
import "./styles/App.css";

export const ThemeContext = createContext(themes[0]);

interface Props {}

export default function App({}: Props) {
  const [colorTheme, setColorTheme] = useState<any>(themes[0]);

  useEffect(() => {
    document.body.style.backgroundColor = colorTheme["bng"];
  }, [colorTheme]);

  const handleThemeSwitch = () => {
    let tempIndex = themes.indexOf(colorTheme);
    let newIndex = tempIndex < themes.length - 1 ? tempIndex + 1 : 0;
    setColorTheme(themes[newIndex]);
  };
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
            </Switch>
          </AnimatePresence>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}
