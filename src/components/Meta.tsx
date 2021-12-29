import React, { ReactElement } from "react";
import { meta } from "../constants/meta";
import MetaTags from "react-meta-tags";

interface Props {
  themeColor: string;
}

export default function Meta({ themeColor }: Props): ReactElement {
  return (
    <div>
      <MetaTags>
        <title>{meta["title"]}</title>
        <meta name="description" content={meta["description"]} />
        <meta property="og:title" content={meta["title"]} />
        <meta name="viewport" content={meta["viewport"]} />
        <meta name="theme-color" content={themeColor} />
      </MetaTags>
    </div>
  );
}
