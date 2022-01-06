import { ReactElement } from "react";

export default interface Theme {
  Icon: () => ReactElement;
  bng: string;
  primary: string;
  secondary: string;
  tercery: string;
}
