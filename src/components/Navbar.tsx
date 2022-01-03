import React, { ReactElement, useContext, useState } from "react";
import ThemeButton from "./buttons/ThemeButton";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import "../styles/components/Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { themes } from "../constants/themes";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  const { theme, setTheme } = useContext(ThemeContext);

  const { user } = useContext(UserContext);

  const [homeIconHover, setHomeIconHover] = useState(false);
  const [userIconHover, setUserIconHover] = useState(false);

  const handleCycleTheme = () => {
    for (var i = 0; i < themes.length; i++) {
      if (themes[i].key === ) {
        return themes[i + 1] && themes[i + 1].value;
      }
    }
  };
  // const keys = Object.keys(themes);
  //     const values = Object.values(themes);
  //     const currIndex = values.indexOf(theme);
  //     const newThemeName = keys[currIndex < keys.length - 1 ? currIndex + 1 : 0];
  //     const newTheme = themes[newThemeName];
  //     setTheme(newTheme);
  //     handleLocalStorageThemeChange(newThemeName);

  //     if (user) {
  //       changeUserTheme(user["uid"], newThemeName);
  //     }};

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
          clickHandler={() => handleCycleTheme()}
        />
      </div>
    </motion.div>
  );
}
