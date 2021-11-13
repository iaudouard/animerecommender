import React, { ReactElement } from "react";
import "../styles/IncrementButton.css";

interface Props {
  sign: string;
  incrementFunction: Function;
  primaryColor: string;
  secondaryColor: string;
}

export default function IncrementButton({
  sign,
  incrementFunction,
  primaryColor,
  secondaryColor,
}: Props): ReactElement {
  return (
    <div
      className="incrementButton"
      onClick={() => incrementFunction()}
      style={{ backgroundColor: primaryColor, color: secondaryColor }}
    >
      {sign}
    </div>
  );
}
