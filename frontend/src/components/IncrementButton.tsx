import React, { ReactElement, useState } from "react";
import "../styles/IncrementButton.css";

interface Props {
  sign: string;
  incrementFunction: Function;
  primaryColor: string;
  secondaryColor: string;
  terceryColor: string;
}

export default function IncrementButton({
  sign,
  incrementFunction,
  primaryColor,
  secondaryColor,
  terceryColor,
}: Props): ReactElement {
  const [isActive, setIsActive] = useState(false);

  const handleActive = (): void => {
    setIsActive(true);
  };

  const handleNotActive = (): void => {
    setIsActive(false);
  };

  return (
    <div
      className="incrementButton"
      onClick={() => incrementFunction()}
      onMouseDown={() => handleActive()}
      onMouseUp={() => handleNotActive()}
      onMouseLeave={() => handleNotActive()}
      style={{
        backgroundColor: isActive ? terceryColor : primaryColor,
        color: secondaryColor,
      }}
    >
      {sign}
    </div>
  );
}
