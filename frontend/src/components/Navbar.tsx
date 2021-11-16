import React, { ReactElement, useState } from "react";
import ThemeButton from "./ThemeButton";
import { ThemeContext } from "../App";
import "../styles/Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  clickHandler: () => void;
}

export default function Navbar({ clickHandler }: Props): ReactElement {
  const [homeHover, setHomeHover] = useState(false);
  const [userHover, setUserHover] = useState(false);

  return (
    <ThemeContext.Consumer>
      {(colorThemeContext) => {
        return (
          <div
            className="navbarContainer"
            style={{ backgroundColor: colorThemeContext["bng"] }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <AiFillHome
                color={homeHover ? "white" : colorThemeContext["secondary"]}
                className="icon"
                size={"1.2vw"}
                onMouseEnter={() => setHomeHover(true)}
                onMouseLeave={() => setHomeHover(false)}
              />
            </Link>
            <FaUserAlt
              color={userHover ? "white" : colorThemeContext["secondary"]}
              className="icon"
              size={"1vw"}
              onMouseEnter={() => setUserHover(true)}
              onMouseLeave={() => setUserHover(false)}
            />
            <ThemeButton
              Icon={colorThemeContext["Icon"]}
              Color={colorThemeContext["primary"]}
              clickHandler={() => clickHandler()}
            />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}
