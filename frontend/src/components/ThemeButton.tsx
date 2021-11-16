import React, { ReactElement } from "react";
import "../styles/ThemeButton.css";

interface Props {
  Icon: () => React.ReactElement;
  Color: string;
  clickHandler: () => void;
}

export default function ThemeButton({
  Icon,
  Color,
  clickHandler,
}: Props): ReactElement {
  return (
    <div
      className="themeButtonContainer"
      style={{ backgroundColor: Color }}
      onClick={() => clickHandler()}
    >
      <Icon />
    </div>
  );
}
