import React, { ReactElement, useState } from "react";
import "../styles/components/Card.css";
import rgbDictionaryToString from "../utils/rgbConverter";
import { GoTrashcan } from "react-icons/go";

interface Props {
  title?: string;
  color: string;
  poster: string;
  synopsis?: string;
  height?: number;
  deleteable?: true;
  onClick?: () => void;
}

export default function Card({
  title,
  color,
  poster,
  synopsis,
  height,
  deleteable,
  onClick,
}: Props): ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cardContainer"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        height: height ? height + "rem" : "26rem",
        minWidth: height ? height * (3 / 4) + "rem" : 26 * (3 / 4) + "rem",
      }}
      onClick={onClick}
    >
      {deleteable && (
        <div
          style={
            isHovered
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: "1.3rem",
                  height: "100%",
                  width: "100%",
                  transition: "0.4s",
                }
              : { display: "none", transition: "0.4s" }
          }
        >
          <GoTrashcan size={28} />
        </div>
      )}
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
