import { useContext } from "react";

import "react-notifications-component/dist/theme.css";
import "./styles/pages/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Results from "./pages/Results";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Meta from "./components/Meta";

import { AnimatePresence } from "framer-motion";

import ReactNotification from "react-notifications-component";

import { ThemeContext } from "./context/ThemeContext";

interface Props {}

export default function App({}: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme.bng,
      }}
    >
      <Meta themeColor={theme.bng} />
      <AnimatePresence>
        <ReactNotification />
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/results" exact component={Results} />
            <Route path="/account" exact component={Account} />
          </Switch>
        </Router>
      </AnimatePresence>
    </div>
  );
}
