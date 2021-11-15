import React, { ReactElement } from "react";
import "../styles/Card.css";

interface Props {
  title: string;
  color: Object;
  poster: string;
  synopsis: string;
}

export default function Card({
  title,
  color,
  poster,
  synopsis,
}: Props): ReactElement {
  function rgbDictionaryToString(dictionary) {
    const rgba = `rgba(${dictionary["r"]}, ${dictionary["g"]}, ${dictionary["b"]}, 0.8)`;
    return rgba;
  }
  return (
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
          style={{ backgroundColor: rgbDictionaryToString(color) }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
