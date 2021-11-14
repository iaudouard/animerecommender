import React, { ReactElement } from "react";

interface Props {
  title: string;
  secondary: string;
}

export default function Card({ title, secondary }: Props): ReactElement {
  return <div style={{ color: secondary }}>{title}</div>;
}
