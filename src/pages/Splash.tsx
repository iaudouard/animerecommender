import { useContext } from "react";

import Spinner from "../components/Spinner";
import { ThemeContext } from "../context/ThemeContext";

import "../styles/pages/Splash.css";

export default function Splash({}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="splash-container" style={{ backgroundColor: theme.bng }}>
      <Spinner color={theme.secondary} size="2x" />
    </div>
  );
}
