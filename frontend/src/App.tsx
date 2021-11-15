import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { themes } from "./constants/themes";
import ThemeButton from "./components/ThemeButton";

export const ThemeContext = createContext(themes[0]);

interface Props {}

export default function App({}: Props) {
  const [colorTheme, setColorTheme] = useState<any>(themes[0]);

  const handleThemeSwitch = () => {
    let tempIndex = themes.indexOf(colorTheme);
    let newIndex = tempIndex < themes.length - 1 ? tempIndex + 1 : 0;
    setColorTheme(themes[newIndex]);
  };
  return (
    <ThemeContext.Provider value={colorTheme}>
      <ThemeButton
        Icon={colorTheme["Icon"]}
        Color={colorTheme["primary"]}
        clickHandler={() => handleThemeSwitch()}
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/results" exact component={Results} />
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
}
