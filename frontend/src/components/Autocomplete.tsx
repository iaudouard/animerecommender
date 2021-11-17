import React, { ReactElement, useEffect, useState } from "react";
import fetchAutocomplete from "../utils/api";
import "../styles/Autocomplete.css";
import AutocompleteLiElement from "./AutocompleteLiElement";

interface Props {
  animeSearchInputValue: string;
  color: string;
  clickHandler: (title) => void;
  visible: boolean;
}

export default function Autocomplete({
  animeSearchInputValue,
  color,
  clickHandler,
  visible,
}: Props): ReactElement {
  const [autocompleteValues, setAutocompleteValues] = useState([]);

  useEffect(() => {
    async function fetcher() {
      const url: string = `https://kitsu.io/api/edge/anime?filter[text]=${animeSearchInputValue}`;
      const data = await fetchAutocomplete(url);
      setAutocompleteValues(data["data"]);
    }
    fetcher();
  }, [animeSearchInputValue]);
  return (
    <div
      className="Autocomplete"
      style={{ display: visible ? "flex" : "none" }}
    >
      {autocompleteValues.map((item, index) => {
        return (
          <AutocompleteLiElement
            key={index}
            color={color}
            title={item["attributes"]["canonicalTitle"]}
            posterPath={item["attributes"]["canonicalTitle"]}
            clickHandler={(title) => clickHandler(title)}
          />
        );
      })}
    </div>
  );
}
