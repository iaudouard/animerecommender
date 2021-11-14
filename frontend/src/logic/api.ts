import axios, { AxiosResponse } from "axios";

async function fetchHelper(url) {
  return await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json.data;
    });
}

export default async function fetchRecommendations(
  animeTitle: string,
  numberOfRecommendations: number
) {
  const url: string = `https://ivanadrd.pythonanywhere.com/?anime_title=${animeTitle}&number_of_anime=${numberOfRecommendations}`;

  const data: any = await axios.get(url).then((response: AxiosResponse) => {
    return response.data;
  });

  return data;
}
