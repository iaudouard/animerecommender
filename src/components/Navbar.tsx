import React, { ReactElement, useContext, useState } from "react";
import ThemeButton from "./buttons/ThemeButton";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import "../styles/components/Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { themes, themeNames } from "../constants/themes";
import { handleLocalStorageThemeChange } from "../utils/localStorage";
import { changeUserTheme } from "../firebase/firebase.utils.handledata";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  const { user } = useContext(UserContext);

  const [homeIconHover, setHomeIconHover] = useState(false);
  const [userIconHover, setUserIconHover] = useState(false);

  function cycleTheme() {
    const currIndex = themeNames.indexOf(themeName);
    const newTheme =
      themeNames[currIndex < themeNames.length - 1 ? currIndex + 1 : 0];
    setThemeName(newTheme);
  }

  return (
    <motion.div initial="out" exit="out" animate="in">
      <div
        className="navbarContainer"
        style={{ backgroundColor: theme["bng"] }}
      >
        <Link to="/" style={{ textDecoration: "none", display: "block" }}>
          <AiFillHome
            color={homeIconHover ? "white" : theme["secondary"]}
            className="icon"
            size={24}
            onMouseEnter={() => setHomeIconHover(true)}
            onMouseLeave={() => setHomeIconHover(false)}
          />
        </Link>
        <Link
          to="/account"
          style={{ textDecoration: "none", display: "block" }}
        >
          <FaUserAlt
            color={userIconHover ? "white" : theme["secondary"]}
            className="icon"
            size={21}
            onMouseEnter={() => setUserIconHover(true)}
            onMouseLeave={() => setUserIconHover(false)}
          />
        </Link>

        <ThemeButton
          Icon={theme["Icon"]}
          Color={theme["primary"]}
          clickHandler={() => cycleTheme()}
        />
      </div>
    </motion.div>
  );
}
