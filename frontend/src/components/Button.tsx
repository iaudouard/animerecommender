import React, { Children, ReactElement, useState } from "react";
import "../styles/Button.css";

interface Props {
  type: string;
  handleClick: () => void;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  terceryColor: string;
}

export default function Button({
  type,
  handleClick,
  label,
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
      className={`button ${type}`}
      onClick={() => handleClick()}
      style={{
        backgroundColor: isActive ? terceryColor : primaryColor,
        color: secondaryColor,
      }}
      onMouseDown={() => handleActive()}
      onMouseUp={() => handleNotActive()}
      onMouseLeave={() => handleNotActive()}
    >
      {label}
    </div>
  );
}
