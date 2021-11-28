import React, { ReactElement, useState } from "react";
import "../styles/SignoutButton.css";

interface Props {
  primary: string;
  secondary: string;
  tercery: string;
  clickHandler: () => void;
}

export default function LogoutButton({
  primary,
  secondary,
  tercery,
  clickHandler,
}: Props): ReactElement {
  const [active, setActive] = useState(false);

  return (
    <div
      className="SignoutButton"
      style={{ backgroundColor: active ? tercery : primary, color: secondary }}
      onClick={() => clickHandler()}
      onMouseDown={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseUp={() => setActive(false)}
    >
      sign out
    </div>
  );
}
