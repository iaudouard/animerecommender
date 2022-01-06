import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Account from "./pages/Account";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./styles/pages/App.css";
import { ThemeContext } from "./context/ThemeContext";
import Meta from "./components/Meta";
import { themes } from "./constants/themes";

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
        <div>
          <ReactNotification />
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/results" exact component={Results} />
              <Route path="/account" exact component={Account} />
            </Switch>
          </Router>
        </div>
      </AnimatePresence>
    </div>
  );
}
