import React, { ReactElement, useState } from "react";
import ThemeButton from "./ThemeButton";
import { ThemeContext } from "../App";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  clickHandler: () => void;
}

export default function Navbar({ clickHandler }: Props): ReactElement {
  const [homeIconHover, setHomeIconHover] = useState(false);
  const [userIconHover, setUserIconHover] = useState(false);

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
                <FontAwesomeIcon
                  color={
                    homeIconHover ? "white" : colorThemeContext["secondary"]
                  }
                  className="icon"
                  icon={faHome}
                  size="lg"
                  onMouseEnter={() => setHomeIconHover(true)}
                  onMouseLeave={() => setHomeIconHover(false)}
                  onClick={() => {}}
                />
              </Link>
              {/* <Link
                to="/login"
                style={{ textDecoration: "none", display: "block" }}
              >
                <FontAwesomeIcon
                  color={
                    userIconHover ? "white" : colorThemeContext["secondary"]
                  }
                  className="icon"
                  icon={faUser}
                  size="lg"
                  onMouseEnter={() => setUserIconHover(true)}
                  onMouseLeave={() => setUserIconHover(false)}
                  onClick={() => {}}
                />
              </Link> */}

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
