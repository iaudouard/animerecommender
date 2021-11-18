import React, { ReactElement, useState } from "react";
import ThemeButton from "./ThemeButton";
import { ThemeContext } from "../App";
import "../styles/Navbar.css";

import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  clickHandler: () => void;
}

export default function Navbar({ clickHandler }: Props): ReactElement {
  const [homeHover, setHomeHover] = useState(false);

  return (
    <motion.div initial="out" exit="out" animate="in">
      <ThemeContext.Consumer>
        {(colorThemeContext) => {
          return (
            <div
              className="navbarContainer"
              style={{ backgroundColor: colorThemeContext["bng"] }}
            >
              <Link to="/" style={{ textDecoration: "none", display: "block" }}>
                <AiFillHome
                  color={homeHover ? "white" : colorThemeContext["secondary"]}
                  className="icon"
                  size={"1.6rem"}
                  onMouseEnter={() => setHomeHover(true)}
                  onMouseLeave={() => setHomeHover(false)}
                  onClick={() => {}}
                />
              </Link>

              <ThemeButton
                Icon={colorThemeContext["Icon"]}
                Color={colorThemeContext["primary"]}
                clickHandler={() => clickHandler()}
              />
            </div>
          );
        }}
      </ThemeContext.Consumer>
    </motion.div>
  );
}
