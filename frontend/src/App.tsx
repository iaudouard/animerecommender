import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

interface Props {}

export default function App({}: Props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/results" exact component={Results} />
      </Switch>
    </Router>
  );
}
