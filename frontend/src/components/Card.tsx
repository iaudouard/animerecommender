import React, { ReactElement } from "react";
import "../styles/Card.css";

interface Props {
  title: string;
  secondary: string;
  poster: string;
}

export default function Card({
  title,
  secondary,
  poster,
}: Props): ReactElement {
  return (
    <div
      className="cardContainer"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
      }}
    >
      <p className="cardTitle">{title}</p>
    </div>
  );
}
