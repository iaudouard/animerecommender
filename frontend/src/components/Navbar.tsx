import React, { ReactElement, useState } from "react";
import ThemeButton from "./buttons/ThemeButton";
import { ThemeContext } from "../App";
import "../styles/components/Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
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
                <AiFillHome
                  color={
                    homeIconHover ? "white" : colorThemeContext["secondary"]
                  }
                  className="icon"
                  size={24}
                  // icon={faHome}
                  // size="lg"
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
                  color={
                    userIconHover ? "white" : colorThemeContext["secondary"]
                  }
                  className="icon"
                  size={21}
                  // icon={faUser}
                  // size="lg"
                  onMouseEnter={() => setUserIconHover(true)}
                  onMouseLeave={() => setUserIconHover(false)}
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
