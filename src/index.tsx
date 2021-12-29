import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./context/ThemeContext";
import UserProvider from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
