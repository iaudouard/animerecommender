import axios, { AxiosResponse } from "axios";

export default async function fetch(url) {
  const data = await axios.get(url).then((response: AxiosResponse) => {
    return response.data;
  });
  return data;
}
