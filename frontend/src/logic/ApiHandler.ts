function parseAnimeTitleForApi(animeTitle: string) {
  return animeTitle.replaceAll(" ", "-");
}
export default async function fetchRecommendations(
  animeTitle: string,
  numberOfRecommendations: number
) {
  const url: string = `https://ivanadrd.pythonanywhere.com/?anime_title=${animeTitle}&number_of_anime=${numberOfRecommendations}`;

  const data: any = await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json.data);
    });

  return data;
}
