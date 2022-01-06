import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export async function fetchRec(animeTitle: string, numberOfAnime: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://anime-recommender.p.rapidapi.com/",
    params: { anime_title: animeTitle, number_of_anime: numberOfAnime },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST!,
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY!,
    },
  };

  const data = await axios.request(options).then((response: AxiosResponse) => {
    return response.data;
  });
  return data;
}

export async function fetchAutocomplete(text: string) {
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${text}`;

  const data = await axios.get(url).then((response: AxiosResponse) => {
    return response.data;
  });

  return data;
}

export async function fetchInfo(animeTitle: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://anime-recommender.p.rapidapi.com/get_anime_info",
    params: { anime_title: animeTitle },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST!,
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY!,
    },
  };

  const data = await axios.request(options).then((response: AxiosResponse) => {
    return response.data;
  });
  return data;
}
