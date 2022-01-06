import { ReactElement, useState } from "react";
import "../../styles/components/buttons/IncrementButton.css";

interface Props {
  handleClick: () => void;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  terceryColor: string;
}

export default function Button({
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
      className="Increment"
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
