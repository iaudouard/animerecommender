import { Icon } from "@fortawesome/fontawesome-svg-core";
import React, { ReactElement } from "react";
import "../../styles/components/buttons/ThemeButton.css";

interface Props {
  Icon: () => ReactElement;
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
