import React, { ReactElement, useEffect, useState } from "react";
import "../styles/components/Card.css";
import rgbDictionaryToString from "../utils/rgbConverter";

interface Props {
  title?: string;
  color: string;
  poster: string;
  synopsis?: string;
  height?: number;
}

export default function Card({
  title,
  color,
  poster,
  synopsis,
  height,
}: Props): ReactElement {
  return (
    <div
      className="cardContainer"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        height: height ? height + "rem" : "26rem",
        minWidth: height ? height * (3 / 4) + "rem" : 26 * (3 / 4) + "rem",
      }}
    >
      {title ? (
        <div className="cardContent">
          <p className="cardSynopsis">{synopsis}</p>
          <div
            className="titleBng"
            style={{ backgroundColor: rgbDictionaryToString(color, 0.8) }}
          >
            <p className="cardTitle">{title}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
