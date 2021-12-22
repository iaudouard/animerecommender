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
  const Theme = useContext(ThemeContext)["theme"];
  const changeTheme = useContext(ThemeContext)["changeTheme"];

  const [homeIconHover, setHomeIconHover] = useState(false);
  const [userIconHover, setUserIconHover] = useState(false);

  return (
    <motion.div initial="out" exit="out" animate="in">
      <div
        className="navbarContainer"
        style={{ backgroundColor: Theme["bng"] }}
      >
        <Link to="/" style={{ textDecoration: "none", display: "block" }}>
          <AiFillHome
            color={homeIconHover ? "white" : Theme["secondary"]}
            className="icon"
            size={24}
            onMouseEnter={() => setHomeIconHover(true)}
            onMouseLeave={() => setHomeIconHover(false)}
            onClick={() => {}}
          />
        </Link>
        <Link
          to="/account"
          style={{ textDecoration: "none", display: "block" }}
        >
          <FaUserAlt
            color={userIconHover ? "white" : Theme["secondary"]}
            className="icon"
            size={21}
            onMouseEnter={() => setUserIconHover(true)}
            onMouseLeave={() => setUserIconHover(false)}
            onClick={() => {}}
          />
        </Link>

        <ThemeButton
          Icon={Theme["Icon"]}
          Color={Theme["primary"]}
          clickHandler={() => changeTheme()}
        />
      </div>
    </motion.div>
  );
}
