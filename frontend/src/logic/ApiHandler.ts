function parseAnimeTitleForApi(animeTitle: string) {
  return animeTitle.replaceAll(" ", "-");
}
export default async function fetchRecommendations(
  animeTitle: string,
  numberOfRecommendations: number
) {
  const url: string = `https://ivanadrd.pythonanywhere.com/api/${parseAnimeTitleForApi(
    animeTitle
  )}+${numberOfRecommendations}`;
  // const url: string = `http://127.0.0.1:5000/api/${parseAnimeTitleForApi(
  //   animeTitle
  // )}+${numberOfRecommendations}`;

  const data: any = await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json.data);
    });
}
