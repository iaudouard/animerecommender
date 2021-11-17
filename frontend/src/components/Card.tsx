import React, { ReactElement } from "react";
import "../styles/Card.css";
import rgbDictionaryToString from "../utils/rgbConverter";

interface Props {
  title: string;
  color: string;
  poster: string;
  synopsis: string;
}

export default function Card({
  title,
  color,
  poster,
  synopsis,
}: Props): ReactElement {
  return (
    <a
      href={"https://myanimelist.net/"}
      style={{
        textDecoration: "none",
        color: "white",
        display: "block",
      }}
    >
      <div
        className="cardContainer"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
        }}
      >
        <div className="cardContent">
          <p className="cardSynopsis">{synopsis}</p>
          <p
            className="cardTitle"
            style={{ backgroundColor: rgbDictionaryToString(color, 0.8) }}
          >
            {title}
          </p>
        </div>
      </div>
    </a>
  );
}
