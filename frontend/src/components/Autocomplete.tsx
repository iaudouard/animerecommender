import React, { ReactElement, useEffect, useState } from "react";
import fetchAutocomplete from "../utils/api";

interface Props {
  animeSearchInputValue: string;
}

export default function Autocomplete({
  animeSearchInputValue,
}: Props): ReactElement {
  const [autocompleteValues, setAutocompleteValues] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetcher() {
      const url: string = `https://kitsu.io/api/edge/anime?filter[text]=${animeSearchInputValue}`;
      const data = await fetchAutocomplete(url);
      setAutocompleteValues(data["data"]);
      console.log(autocompleteValues);
    }
    fetcher();
  }, []);
  return <div></div>;
}
