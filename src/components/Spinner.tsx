import { ReactElement } from "react";

import "../styles/components/Spinner.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  color: string;
  size: SizeProp;
}

export default function Spinner({ color, size }: Props): ReactElement {
  return (
    <div className="Spinner">
      <FontAwesomeIcon icon={faCircleNotch} spin color={color} size={size} />
    </div>
  );
}
