import React, { ReactElement } from "react";
import "../styles/Login.css";

interface Props {
  Theme: Object;
  setInput: (text) => void;
  placeholder: string;
}

const handleFormInputChange = (
  ev: React.ChangeEvent<HTMLInputElement>,
  setValue: (text) => void
) => {
  setValue(ev.target.value);
};

export default function FormField({
  Theme,
  setInput,
  placeholder,
}: Props): ReactElement {
  return (
    <input
      className="formField"
      placeholder={placeholder}
      style={{
        backgroundColor: Theme["primary"],
        color: Theme["secondary"],
      }}
      onChange={(ev) => handleFormInputChange(ev, setInput)}
    ></input>
  );
}
