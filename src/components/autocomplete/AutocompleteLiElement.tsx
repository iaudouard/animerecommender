import React, { ReactElement } from "react";
import "../../styles/components/autocomplete/AutocompleteLiElement.css";

interface Props {
  title: string;
  color: string;
  clickHandler: (title) => void;
}

export default function AutocompleteLiElement({
  title,

  color,
  clickHandler,
}: Props): ReactElement {
  return (
    <div className="AutocompleteLiElement" onClick={() => clickHandler(title)}>
      <p style={{ color: color }}>{title}</p>
    </div>
  );
}
