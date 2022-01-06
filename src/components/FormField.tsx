import React, { ReactElement } from "react";
import "../styles/components/FormField.css";

import Theme from "../types/Theme";

interface Props {
  theme: Theme;
  setInput: (text) => void;
  placeholder: string;
  password?: boolean;
}

const handleFormInputChange = (
  ev: React.ChangeEvent<HTMLInputElement>,
  setValue: (text) => void
) => {
  setValue(ev.target.value);
};

export default function FormField({
  theme,
  setInput,
  placeholder,
  password,
}: Props): ReactElement {
  return (
    <input
      className="formField"
      placeholder={placeholder}
      type={password ? "password" : "text"}
      style={{
        backgroundColor: theme.primary,
        color: theme.secondary,
      }}
      onChange={(ev) => handleFormInputChange(ev, setInput)}
    ></input>
  );
}
