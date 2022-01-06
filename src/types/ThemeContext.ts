import { Dispatch, SetStateAction } from "react";
import Theme from "./Theme";

export default interface ThemeContextType {
  themeName: string;
  setThemeName: Dispatch<SetStateAction<any>>;
  theme: Theme;
}
