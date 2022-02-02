import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export async function fetchRec(animeTitle: string, numberOfAnime: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "http://127.0.0.1:5000/",
    params: { anime_title: animeTitle, number_of_anime: numberOfAnime },
  };

  const data = await axios.request(options).then((response: AxiosResponse) => {
    return response.data;
  });
  return data;
}

export async function fetchAutocomplete(text: string) {
  const url = `http://127.0.0.1:5000/auto_complete?search=${text}&amnt=5`;

  const data = await axios.get(url).then((response: AxiosResponse) => {
    return response.data;
  });

  return data;
}

export async function fetchInfo(animeTitle: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://ivanadrd.pythonanywhere.com/get_anime_info",
    params: { anime_title: animeTitle },
    headers: {},
  };

  const data = await axios.request(options).then((response: AxiosResponse) => {
    return response.data;
  });
  return data;
}
