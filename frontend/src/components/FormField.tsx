import React, { ReactElement } from "react";
import "../styles/components/FormField.css";

interface Props {
  Theme: Object;
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
  Theme,
  setInput,
  placeholder,
  password,
}: Props): ReactElement {
  return (
    <input
      className="formField"
      placeholder={placeholder}
      type={password ? "password" : ""}
      style={{
        backgroundColor: Theme["primary"],
        color: Theme["secondary"],
      }}
      onChange={(ev) => handleFormInputChange(ev, setInput)}
    ></input>
  );
}
